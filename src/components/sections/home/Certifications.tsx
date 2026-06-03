import React from "react";
import { Award } from "lucide-react";

// Dark editorial certifications strip. Each card shows the cert code in
// the display font with the numeric/key portion in brand-red, and the
// description below in dim mono. Mirrors the reference HTML's .certs row.

type Certification = {
  /** Prefix shown in white, e.g. "ISO " or "DM " */
  prefix?: string;
  /** Highlighted key, shown in brand-red */
  key: string;
  /** Optional suffix in white (e.g. ":2015") */
  suffix?: string;
  /** Description shown below in small mono caps */
  description: string;
};

const certifications: Certification[] = [
  { prefix: "ISO ", key: "9001", suffix: ":2015", description: "Quality Management System" },
  { prefix: "ISO ", key: "14001", suffix: ":2015", description: "Environmental System" },
  { prefix: "ISO ", key: "45001", suffix: ":2018", description: "Occupational Health & Safety" },
  { prefix: "DM ", key: "G+12", description: "Dubai Municipality Approved" },
  { prefix: "ICV ", key: "Certified", description: "In-Country Value" },
  { prefix: "ADM ", key: "Approved", description: "Abu Dhabi Municipality" },
  { key: "CICSPA", description: "Specialist Permit Authority" },
  { key: "Guinness", description: "World Record, Meena Plaza" },
];

export function Certifications() {
  return (
    <section className="py-16 md:py-24 bg-brand-gray-100 text-brand-gray-900">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section head, light variant */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-7 flex flex-col gap-5">
            <h2 className="font-display font-extrabold uppercase text-brand-gray-900 text-[44px] md:text-[72px] lg:text-[88px] leading-[0.92] tracking-tight">
              Fully{" "}
              <em className="font-light italic text-brand-red normal-case">certified.</em>
              <br />
              Fully compliant.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="font-['Inter_Display',sans-serif] text-[16px] md:text-[18px] leading-[1.6] text-brand-gray-700">
              Independently audited and approved across the international quality, environmental,
              safety and specialist-permit frameworks the GCC&apos;s most demanding clients require.
            </p>
          </div>
        </div>

        {/* Cert cards, shadowed and gapped. 2 rows of 4 on lg+. */}
        <div className="mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {certifications.map((cert) => (
            <div
              key={`${cert.prefix ?? ""}${cert.key}`}
              className="relative flex flex-col items-center text-center gap-3 py-10 md:py-14 px-6 rounded-[20px] bg-gradient-to-br from-[#FCF3D6] via-[#FFFDF6] to-[#E6C977] border border-[#E3C778] shadow-[0_2px_16px_rgba(176,141,54,0.18)] hover:shadow-[0_8px_32px_rgba(176,141,54,0.32)] transition-shadow duration-300"
            >
              <span className="absolute top-4 right-4 inline-flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-[#F4DA8C] to-[#C49A3E] text-white shadow-[0_2px_8px_rgba(176,141,54,0.45)]">
                <Award className="w-5 h-5" strokeWidth={2} />
              </span>
              <h3 className="font-display font-bold uppercase text-brand-gray-900 text-[28px] md:text-[36px] tracking-tight leading-none">
                {cert.prefix}
                <span className="text-brand-red">{cert.key}</span>
                {cert.suffix}
              </h3>
              <p className="font-mono text-[10.5px] md:text-[11px] uppercase tracking-[0.18em] text-brand-gray-500">
                {cert.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
