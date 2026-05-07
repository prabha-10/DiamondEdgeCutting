import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { Resend } from "resend";

// Server-only config. Never imported into client components.
const projectId =
  process.env.SANITY_PROJECT_ID ?? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset =
  process.env.SANITY_DATASET ?? process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token =
  process.env.SANITY_API_TOKEN ?? process.env.SANITY_WRITE_TOKEN ?? process.env.SANITY_TOKEN;

const sanity = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      token,
      useCdn: false,
    })
  : null;

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const FROM_ADDRESS =
  process.env.INQUIRY_FROM ?? "Diamond Edge Website <onboarding@resend.dev>";
const TO_ADDRESS = process.env.INQUIRY_TO ?? "info@diamondedgecutting.com";
// CC defaults to empty until diamondedgecutting.com is verified in Resend.
// While the from address is the Resend onboarding domain, Resend rejects any
// recipient (including CC) other than the account owner's verified email.
// After domain verification, set INQUIRY_CC=laxmikant@diamondedgecutting.com
// in Vercel and the CC will resume.
const CC_ADDRESSES = (process.env.INQUIRY_CC ?? "")
  .split(",")
  .map((a) => a.trim())
  .filter(Boolean);

type InquiryBody = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  // Either single equipmentId (model-detail form) or equipmentIds (cart).
  equipmentId?: string;
  equipmentIds?: string[];
  projectLocation?: string;
  rentalDuration?: string;
  message?: string;
};

function isString(v: unknown): v is string {
  return typeof v === "string" && v.length > 0;
}

function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: Request) {
  let body: InquiryBody;
  try {
    body = (await req.json()) as InquiryBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Required fields per the PRD inquiry schema validation.
  if (!isString(body.name)) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  if (!isString(body.email) || !isEmail(body.email)) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }

  // Coalesce equipmentId / equipmentIds into one array.
  const equipmentIds: string[] = [];
  if (Array.isArray(body.equipmentIds)) {
    for (const id of body.equipmentIds) if (isString(id)) equipmentIds.push(id);
  }
  if (isString(body.equipmentId) && !equipmentIds.includes(body.equipmentId)) {
    equipmentIds.push(body.equipmentId);
  }

  // 1. Persist the inquiry to Sanity. If Sanity isn't configured we still try
  //    to send the email, since the email is the operationally critical path.
  let inquiryId: string | null = null;
  if (sanity) {
    try {
      const doc = await sanity.create({
        _type: "inquiry",
        name: body.name,
        email: body.email,
        phone: body.phone,
        company: body.company,
        equipment: equipmentIds.map((id) => ({
          _type: "reference",
          _ref: id,
          _key: id,
        })),
        projectLocation: body.projectLocation,
        rentalDuration: body.rentalDuration,
        message: body.message,
        submittedAt: new Date().toISOString(),
        status: "new",
      });
      inquiryId = doc._id;
    } catch (err) {
      console.error("[inquiries] Sanity create failed:", err);
      // Continue: still try to send the email so the lead is not lost.
    }
  }

  // 2. Look up equipment titles for the email body, so the recipient sees
  //    which models the inquiry is about.
  let equipmentLines = "";
  if (sanity && equipmentIds.length > 0) {
    try {
      const titles: Array<{ _id: string; title: string; manufacturer?: string }> =
        await sanity.fetch(
          `*[_type == "equipment" && _id in $ids] { _id, title, manufacturer }`,
          { ids: equipmentIds }
        );
      const map = new Map(titles.map((t) => [t._id, t]));
      equipmentLines = equipmentIds
        .map((id) => {
          const t = map.get(id);
          if (!t) return `- ${id}`;
          return `- ${t.manufacturer ? `${t.manufacturer} ` : ""}${t.title}`;
        })
        .join("\n");
    } catch (err) {
      console.warn("[inquiries] equipment lookup failed:", err);
      equipmentLines = equipmentIds.map((id) => `- ${id}`).join("\n");
    }
  } else if (equipmentIds.length > 0) {
    equipmentLines = equipmentIds.map((id) => `- ${id}`).join("\n");
  }

  // 3. Send the email.
  if (resend) {
    try {
      const subject = `New rental inquiry, ${body.name}${
        body.company ? ` (${body.company})` : ""
      }`;
      const text = [
        `From: ${body.name} <${body.email}>`,
        body.phone ? `Phone: ${body.phone}` : null,
        body.company ? `Company: ${body.company}` : null,
        body.projectLocation ? `Project location: ${body.projectLocation}` : null,
        body.rentalDuration ? `Rental duration: ${body.rentalDuration}` : null,
        equipmentLines ? `\nEquipment requested:\n${equipmentLines}` : null,
        body.message ? `\nMessage:\n${body.message}` : null,
        inquiryId ? `\nSanity inquiry ID: ${inquiryId}` : null,
      ]
        .filter(Boolean)
        .join("\n");

      await resend.emails.send({
        from: FROM_ADDRESS,
        to: TO_ADDRESS,
        cc: CC_ADDRESSES,
        replyTo: body.email,
        subject,
        text,
      });
    } catch (err) {
      console.error("[inquiries] Resend send failed:", err);
      // Email failure is reported back to the client so the visitor knows
      // to follow up via phone, but the Sanity record still exists.
      return NextResponse.json(
        {
          ok: !!inquiryId,
          id: inquiryId,
          warning: "Email delivery failed, inquiry was logged. Phone the hire team to confirm.",
        },
        { status: 207 }
      );
    }
  } else {
    console.warn("[inquiries] RESEND_API_KEY missing; skipping email send.");
  }

  return NextResponse.json({ ok: true, id: inquiryId });
}
