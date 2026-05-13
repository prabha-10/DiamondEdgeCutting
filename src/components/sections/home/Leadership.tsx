import React from "react";
import { EditorialSectionHead } from "./editorial/EditorialSectionHead";

// Block 4 from the client's homepage spec. Light-theme variant of the
// reference HTML's "team" cards: square avatar tile with red initials and a
// small accent square, big display name, red mono role, bio paragraph, and
// a years-of-experience footer line.
//
// Client note in the doc: "Our Team, fixed list not moving."
// Bios + years are placeholder copy, client to refine.

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  years: string;
  /** Optional uploaded portrait, falls back to initials tile. */
  image?: string;
};

const team: TeamMember[] = [
  {
    name: "Anthony Keever",
    role: "Chief Executive Officer",
    bio: "Established Diamond Edge Cutting in Ireland in 1997 and relocated the company to the UAE in 2008. Under his leadership, DEC has grown year on year to become one of the leading and best-known names in GCC demolition, with an exceptional clients list, an enviable track record and a highly skilled workforce.",
    years: "30+ years · concrete cutting, drilling, demolition",
  },
  {
    name: "Robert Aylward",
    role: "Managing Director",
    bio: "Drives day-to-day leadership across operations, projects, and client relationships. Robert brings deep specialist demolition expertise across Ireland, Europe, and the GCC, with hands-on programme delivery on the region's most technically challenging jobs.",
    years: "25+ years · demolition & project delivery",
  },
  {
    name: "Conor Wade",
    role: "Operations Manager",
    bio: "Oversees DEC's operational delivery on every active site, from method statements and HSE plans to plant deployment and crew scheduling. Conor ensures every project runs on programme, on safety, and within the approved scope.",
    years: "20+ years · site operations & HSE",
  },
  {
    name: "Carl Riley",
    role: "Commercial Manager",
    bio: "Leads DEC's commercial function, contracts, cost control, and strategic pricing across tenders, variations, and final account. Carl combines value engineering with rigorous commercial discipline to protect margin and deliver outcomes that work for clients and DEC alike.",
    years: "18+ years · construction commercial",
  },
  {
    name: "Laxmikant Prajapat",
    role: "Finance Manager",
    bio: "Manages the company's financial operations, reporting, and statutory compliance across UAE entities. Laxmikant brings disciplined cash management, audit readiness, and finance partnering to project teams across the business.",
    years: "15+ years · finance & compliance",
  },
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
    <section className="py-20 md:py-32 bg-brand-gray-100 overflow-hidden">
      {/* Section head stays in the container; the marquee is full-bleed below. */}
      <div className="container mx-auto px-4 md:px-8 mb-14 md:mb-20">
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
      </div>

      {/* Auto-loop marquee, paused on hover so visitors can read a card.
          Edges fade out via a mask so cards enter and exit softly. */}
      <div className="[mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
        <div className="flex gap-5 md:gap-6 animate-marquee hover:[animation-play-state:paused]">
          {[...team, ...team].map((member, i) => (
            <article
              key={`${member.name}-${i}`}
              className="shrink-0 w-[300px] md:w-[380px] bg-white border border-brand-gray-300 rounded-[20px] p-7 md:p-9 flex flex-col gap-6"
            >
              {/* Avatar tile with small accent square */}
              <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-[8px] overflow-hidden bg-brand-gray-100 border border-brand-gray-300">
                {member.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={member.image}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display font-extrabold uppercase text-brand-red text-[34px] md:text-[40px] tracking-tight leading-none">
                      {initialsOf(member.name)}
                    </span>
                  </div>
                )}
                <span
                  aria-hidden
                  className="absolute bottom-1.5 right-1.5 w-3 h-3 bg-brand-red rounded-[2px]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <h3 className="font-display font-bold uppercase text-brand-gray-900 text-[24px] md:text-[26px] tracking-tight leading-[1.05]">
                  {member.name}
                </h3>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-red">
                  {member.role}
                </p>
              </div>

              <p className="font-['Inter_Display',sans-serif] text-[15px] md:text-[15.5px] leading-[1.6] text-brand-gray-700">
                {member.bio}
              </p>

              <div className="mt-auto pt-6 border-t border-brand-gray-300">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-brand-gray-500">
                  <span className="text-brand-gray-900 font-semibold">
                    {member.years.split(" · ")[0]}
                  </span>
                  {member.years.includes(" · ") && (
                    <span> · {member.years.split(" · ").slice(1).join(" · ")}</span>
                  )}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
