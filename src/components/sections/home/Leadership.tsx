import React from "react";
import { EditorialSectionHead } from "./editorial/EditorialSectionHead";
import { LeadershipCards } from "./LeadershipCards";
import { getAllTeamMembers } from "../../../../sanity/lib/queries";
import { safeUrlFor, type SanityImage } from "@/lib/sanity-image";

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  years: string;
  image?: string;
};

type SanityTeamMember = {
  _id: string;
  name: string;
  role: string;
  bio?: string;
  years?: string;
  image?: SanityImage;
};

// Fallback data — used when Sanity has no team members configured yet.
const fallbackTeam: TeamMember[] = [
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
    name: "Jithesh Vannadil",
    role: "Estimation Manager",
    bio: "Leads DEC's estimation function, translating tender documents and site conditions into accurate, competitive bids. Jithesh brings disciplined quantification and cost modelling across demolition and specialist cutting packages.",
    years: "15+ years · estimation & cost planning",
  },
  {
    name: "Laxmikant Prajapat",
    role: "Finance Manager",
    bio: "Manages the company's financial operations, reporting, and statutory compliance across UAE entities. Laxmikant brings disciplined cash management, audit readiness, and finance partnering to project teams across the business.",
    years: "15+ years · finance & compliance",
  },
];

export async function Leadership() {
  let team: TeamMember[] = fallbackTeam;

  try {
    const sanityTeam = (await getAllTeamMembers()) as SanityTeamMember[];
    if (sanityTeam && sanityTeam.length > 0) {
      team = sanityTeam.map((m) => ({
        name: m.name,
        role: m.role,
        bio: m.bio ?? "",
        years: m.years ?? "",
        image: safeUrlFor(m.image, 800) ?? undefined,
      }));
    }
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.warn(`[Sanity] team fetch failed (${msg.slice(0, 120)}); using local fallback.`);
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-10 md:mb-14">
          <EditorialSectionHead
            number="04"
            eyebrow="Our Team"
            title={
              <>
                Meet the <em>team.</em>
              </>
            }
            lede="Operational, commercial and project leadership — accountable from inception to handover."
          />
        </div>

        <LeadershipCards team={team} />

        {/* Wider workforce caption */}
        <div className="mt-8 flex items-center gap-3">
          <span aria-hidden className="w-8 h-0.5 bg-brand-red shrink-0" />
          <p className="font-['Inter_Display',sans-serif] text-[14px] md:text-[15px] text-brand-gray-700">
            Backed by <strong className="text-brand-gray-900 font-semibold">120+ specialists</strong>{" "}
            — project managers, site supervisors, safety officers and operators.
          </p>
        </div>
      </div>
    </section>
  );
}
