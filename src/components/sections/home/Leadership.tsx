import React from "react";
import { EditorialSectionHead } from "./editorial/EditorialSectionHead";

// Block 4 from the client's homepage spec. Static 5-up grid, NOT a marquee.
// Client note in the doc: "Our Team, fixed list not moving".

type TeamMember = {
  name: string;
  role: string;
  image?: string;
};

const team: TeamMember[] = [
  { name: "Anthony Keever", role: "Chief Executive Officer" },
  { name: "Robert Aylward", role: "Managing Director" },
  { name: "Conor Wade", role: "Operations Manager" },
  { name: "Carl Riley", role: "Commercial Manager" },
  { name: "Laxmikant Prajapat", role: "Finance Manager" },
];

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);
}

export function Leadership() {
  return (
    <section className="py-20 md:py-32 bg-brand-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        <EditorialSectionHead
          number="04"
          eyebrow="Our Team"
          title={
            <>
              Meet the
              <br />
              <em>team.</em>
            </>
          }
          lede="Decades of operational, commercial and project leadership experience, focused, hands-on, and accountable from inception to handover."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 md:gap-6 mt-14 md:mt-20">
          {team.map((member, i) => (
            <article key={member.name} className="flex flex-col gap-4">
              <div className="relative aspect-[4/5] rounded-[20px] overflow-hidden bg-white border border-brand-gray-300">
                {member.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={member.image}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display font-extrabold uppercase text-brand-gray-300 text-[64px] md:text-[72px] tracking-tight leading-none">
                      {initialsOf(member.name)}
                    </span>
                  </div>
                )}
                {/* Member index pill */}
                <span className="absolute top-3 left-3 font-mono text-[10.5px] uppercase tracking-[0.16em] bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full border border-brand-gray-300 text-brand-gray-700">
                  {String(i + 1).padStart(2, "0")} / {team.length.toString().padStart(2, "0")}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <h3 className="font-display font-bold uppercase text-brand-gray-900 text-[20px] md:text-[22px] tracking-tight leading-[1.05]">
                  {member.name}
                </h3>
                <p className="font-['Inter_Display',sans-serif] text-[13px] md:text-[14px] text-brand-gray-500">
                  {member.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
