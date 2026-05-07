"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";

type Props = {
  /** Sanity equipment _id, prefilled into the submission. */
  equipmentId: string;
  /** Display title for the form ("Request a quote for Brokk 500"). */
  equipmentTitle: string;
};

type Status = "idle" | "submitting" | "success" | "error";

export function InquiryForm({ equipmentId, equipmentTitle }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    // Honeypot: bots fill this; humans don't see it.
    if ((data.get("website") as string)?.length) {
      setStatus("success");
      return;
    }
    const payload = {
      equipmentId,
      name: (data.get("name") as string) ?? "",
      email: (data.get("email") as string) ?? "",
      phone: (data.get("phone") as string) ?? "",
      company: (data.get("company") as string) ?? "",
      projectLocation: (data.get("projectLocation") as string) ?? "",
      rentalDuration: (data.get("rentalDuration") as string) ?? "",
      message: (data.get("message") as string) ?? "",
    };
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || `Submit failed (${res.status})`);
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-brand-gray-100 rounded-[24px] p-8 flex flex-col gap-3">
        <h3 className="font-sans font-semibold text-brand-gray-900 text-[22px]">
          Inquiry sent.
        </h3>
        <p className="font-['Inter_Display',sans-serif] text-[15px] text-brand-gray-700 leading-[1.55]">
          The hire team will reply within 24 hours, often the same day for live tenders. A copy of
          your inquiry has been logged for {equipmentTitle}.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white border border-brand-gray-300 rounded-[24px] p-7 md:p-9 flex flex-col gap-6"
    >
      <div className="flex flex-col gap-2">
        <span className="font-['Inter_Display',sans-serif] text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-red">
          Request a quote
        </span>
        <h3 className="font-sans font-medium text-brand-gray-900 text-[28px] tracking-tight">
          Get a quote for {equipmentTitle}
        </h3>
      </div>

      {/* Honeypot, visually hidden. */}
      <div className="hidden" aria-hidden>
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Name" name="name" required />
        <Field label="Company" name="company" />
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone" name="phone" type="tel" />
        <Field label="Project location" name="projectLocation" placeholder="e.g. Dubai, Abu Dhabi" />
        <Field
          label="Rental duration"
          name="rentalDuration"
          placeholder="e.g. 2 weeks, 3 months, ongoing"
        />
      </div>

      <Field
        label="Message"
        name="message"
        as="textarea"
        rows={4}
        placeholder="Project scope, dates, attachment requirements, anything else."
      />

      {status === "error" && errorMessage && (
        <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-brand-red">
          {errorMessage}
        </p>
      )}

      <div className="flex items-center justify-between gap-4">
        <span className="font-['Inter_Display',sans-serif] text-[13px] text-brand-gray-500">
          We reply within 24 hours, Sun to Thu.
        </span>
        <Button type="submit" variant="brand" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending..." : "Send inquiry"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  as,
  rows,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  as?: "textarea";
  rows?: number;
}) {
  const baseInputClasses =
    "w-full bg-transparent border-0 border-b-2 border-brand-gray-300 py-2.5 text-[16px] font-medium text-brand-gray-900 focus:ring-0 focus:border-brand-gray-900 focus:outline-none transition-colors placeholder:text-brand-gray-300";
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand-gray-500">
        {label}
        {required ? " *" : ""}
      </span>
      {as === "textarea" ? (
        <textarea
          name={name}
          rows={rows ?? 4}
          required={required}
          placeholder={placeholder}
          className={baseInputClasses}
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          className={baseInputClasses}
        />
      )}
    </label>
  );
}
