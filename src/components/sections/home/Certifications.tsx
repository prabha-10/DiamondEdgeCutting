"use client";

import React from "react";
import {
  Award,
  Leaf,
  HardHat,
  Globe2,
  Building2,
  BadgeCheck,
} from "lucide-react";

type Certification = {
  code: string;
  name: string;
  icon: React.ElementType;
};

const certifications: Certification[] = [
  { code: "ISO 9001", name: "Quality Management", icon: Award },
  { code: "ISO 14001", name: "Environmental Management", icon: Leaf },
  { code: "ISO 45001", name: "Occupational Health & Safety", icon: HardHat },
  { code: "ICV Certified", name: "In-Country Value", icon: Globe2 },
  { code: "DM G+12", name: "Dubai Municipality Approval", icon: Building2 },
  { code: "CICSPA", name: "Specialist Permit Authority", icon: BadgeCheck },
];

export function Certifications() {
  return (
    <section className="py-28 bg-brand-gray-100 border-t border-brand-gray-300/60">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header, eyebrow left, two-tone title right */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
          <div className="flex items-center gap-2.5 shrink-0">
            <span
              className="w-1.5 h-1.5 rounded-full bg-brand-gray-500"
              aria-hidden
            />
            <span className="font-['Inter_Display',sans-serif] text-[14px] tracking-[0.02em] text-[#707070]">
              Certifications &amp; Approvals
            </span>
          </div>
          <h2 className="font-sans font-semibold text-brand-gray-900 text-[28px] md:text-[40px] leading-[1.15] tracking-tight">
            Backed by{" "}
            <span className="text-brand-gray-500">
              independent certification.
            </span>
          </h2>
        </div>

        {/* Cards, single row of 6 mini-cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {certifications.map((cert) => {
            const Icon = cert.icon;
            return (
              <div
                key={cert.code}
                className="bg-white rounded-[20px] p-5 flex flex-col gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-brand-red text-white flex items-center justify-center">
                  <Icon className="w-6 h-6" strokeWidth={1.6} />
                </div>
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="font-['Inter_Display',sans-serif] text-[12px] text-[#707070] leading-[1.3]">
                    {cert.name}
                  </span>
                  <h3 className="font-sans font-semibold text-brand-gray-900 text-[18px] leading-[1.2] tracking-tight">
                    {cert.code}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
