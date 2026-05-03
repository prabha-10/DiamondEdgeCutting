import { NextResponse } from "next/server";
import { Resend } from "resend";
import { rentalFormSchema } from "@/lib/rental-form-schema";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate the payload
    const validatedData = rentalFormSchema.parse(body);

    // Honeypot check
    if (validatedData.website) {
      return NextResponse.json({ message: "Success" }, { status: 200 });
    }

    const {
      fullName,
      company,
      email,
      phone,
      projectLocation,
      rentalDuration,
      operatorRequired,
      projectStart,
      equipment,
      notes,
    } = validatedData;

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: "Diamond Edge Inquiries <onboarding@resend.dev>",
      to: ["info@diamondedgecutting.com"],
      replyTo: email,
      subject: `Rental Inquiry from ${fullName} (${company}) - ${equipment.length} items`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #c8102e; border-bottom: 2px solid #c8102e; padding-bottom: 10px;">New Rental Inquiry</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 30%;">Full Name</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Company</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${company}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Phone</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Project Location</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${projectLocation}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Rental Duration</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${rentalDuration}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Operator Req.</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${operatorRequired}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Project Start</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${projectStart}</td>
            </tr>
          </table>

          <h3 style="color: #c8102e; margin-top: 30px;">Requested Equipment</h3>
          <ul style="padding-left: 20px;">
            ${equipment.map((item) => `<li style="margin-bottom: 5px;"><strong>${item.title}</strong> (ID: ${item.id})</li>`).join("")}
          </ul>

          ${notes ? `
            <h3 style="color: #c8102e; margin-top: 30px;">Notes</h3>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #c8102e;">
              ${notes.replace(/\n/g, "<br>")}
            </div>
          ` : ""}
          
          <p style="font-size: 12px; color: #777; margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px;">
            This inquiry was sent from the Diamond Edge Cutting website.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ message: "Inquiry sent successfully", data });
  } catch (error: any) {
    console.error("Inquiry submission error:", error);
    if (error.name === "ZodError") {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
