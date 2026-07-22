import React from "react";
import { Award } from "lucide-react";

// Dark editorial certifications strip. Each card shows the cert code in
// the display font with the numeric/key portion in brand-red, and the
// description below in dim mono. Mirrors the reference HTML's .certs row.

type Certification = {
  /** First word/part of the title, e.g. "ISO" */
  first: string;
  /** Second word/part of the title, e.g. "9001:2015" */
  second: string;
  /** Description shown below in small caps */
  description: string;
};

const certifications: Certification[] = [
  { first: "ISO", second: "9001:2015", description: "Quality Management System" },
  { first: "ISO", second: "14001:2015", description: "Environmental System" },
  { first: "ISO", second: "45001:2018", description: "Occupational Health & Safety" },
  { first: "ICV", second: "Certified", description: "In-Country Value" },
  { first: "Dubai", second: "Municipality", description: "Demolition Approved Contractor" },
  { first: "Abu Dhabi", second: "Municipality", description: "Demolition Approved Contractor" },
  { first: "CICPA", second: "Approved", description: "Oil & Gas Authority" },
  { first: "World", second: "Record", description: "Guinness World Record Holder" },
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
          {certifications.map((cert, i) => {
            // Alternate the two-tone title: even cards → first word black,
            // second red; odd cards → first word red, second black.
            const firstRed = i % 2 === 1;
            return (
              <div
                key={`${cert.first}-${cert.second}`}
                className="relative flex flex-col gap-2 pt-8 pb-7 px-6 bg-white border-t-2 border-brand-red shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.10)] transition-shadow duration-300"
              >
                <span className="absolute top-4 right-4 inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand-red/10 text-brand-red">
                  <Award className="w-4 h-4" strokeWidth={2} />
                </span>
                <h3 className="font-display font-bold uppercase text-[26px] md:text-[34px] tracking-tight leading-none">
                  <span className={firstRed ? "text-brand-red" : "text-brand-gray-900"}>
                    {cert.first}
                  </span>{" "}
                  <span className={firstRed ? "text-brand-gray-900" : "text-brand-red"}>
                    {cert.second}
                  </span>
                </h3>
                <p className="font-display font-medium text-[10.5px] md:text-[11px] uppercase tracking-[0.18em] text-brand-gray-500">
                  {cert.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
