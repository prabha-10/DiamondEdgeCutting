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
  { prefix: "ICV ", key: "Certified", description: "In-Country Value" },
  { prefix: "Dubai ", key: "Municipality", description: "Demolition Approved Contractor" },
  { prefix: "Abu Dhabi ", key: "Municipality", description: "Demolition Approved Contractor" },
  { key: "CICPA", suffix: " Approved", description: "Oil & Gas Authority" },
  { prefix: "World ", key: "Record", description: "Guinness World Record Holder" },
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
        </div>

        {/* Cert cards — clean white panels with a thin red top accent and a
            small red ribbon icon. 2 rows of 4 on lg+. */}
        <div className="mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 auto-rows-fr gap-4 md:gap-5">
          {certifications.map((cert) => (
            <div
              key={`${cert.prefix ?? ""}${cert.key}`}
              className="relative flex flex-col gap-2 pt-8 pb-7 px-6 bg-white border-t-2 border-brand-red shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.10)] transition-shadow duration-300"
            >
              <span className="absolute top-4 right-4 inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand-red/10 text-brand-red">
                <Award className="w-4 h-4" strokeWidth={2} />
              </span>
              <h3 className="font-display font-bold uppercase text-brand-gray-900 text-[26px] md:text-[34px] tracking-tight leading-none">
                {cert.prefix}
                <span className="text-brand-red">{cert.key}</span>
                {cert.suffix}
              </h3>
              <p className="font-display font-medium text-[10.5px] md:text-[11px] uppercase tracking-[0.18em] text-brand-gray-500">
                {cert.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
