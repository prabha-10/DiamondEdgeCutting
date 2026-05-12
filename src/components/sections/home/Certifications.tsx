import React from "react";
import {
  Award,
  Leaf,
  HardHat,
  Globe2,
  Building2,
  MapPin,
  BadgeCheck,
  Trophy,
} from "lucide-react";
import { EditorialSectionHead } from "./editorial/EditorialSectionHead";

// Block 3 from the client's homepage spec. Eight certifications in the
// exact order listed in the doc.

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
  { code: "DM G+12", name: "Dubai Municipality Approved", icon: Building2 },
  { code: "ADM Approved", name: "Abu Dhabi Municipality", icon: MapPin },
  { code: "CICSPA", name: "Specialist Permit Authority", icon: BadgeCheck },
  { code: "Guinness", name: "World Record · Meena Plaza", icon: Trophy },
];

export function Certifications() {
  return (
    <section className="py-20 md:py-32 bg-white border-t border-brand-gray-300/60">
      <div className="container mx-auto px-4 md:px-8">
        <EditorialSectionHead
          number="03"
          eyebrow="Certifications & Accreditations"
          title={
            <>
              Fully <em>certified.</em>
              <br />
              Fully compliant.
            </>
          }
          lede="Independently audited and approved across the international quality, environmental, safety and specialist-permit frameworks the GCC's most demanding clients require."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-4 mt-14 md:mt-20">
          {certifications.map((cert) => {
            const Icon = cert.icon;
            return (
              <div
                key={cert.code}
                className="bg-brand-gray-100 rounded-[20px] p-5 flex flex-col gap-4 border border-brand-gray-300/60"
              >
                <div className="w-11 h-11 rounded-full bg-brand-red text-white flex items-center justify-center">
                  <Icon className="w-5 h-5" strokeWidth={1.6} />
                </div>
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-brand-gray-500 leading-[1.3]">
                    {cert.name}
                  </span>
                  <h3 className="font-display font-bold uppercase text-brand-gray-900 text-[17px] leading-[1.1] tracking-tight">
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
