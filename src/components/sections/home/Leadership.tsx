import React from "react";

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
    <section className="py-32 bg-brand-gray-50 overflow-hidden">
      {/* Header — eyebrow left, big centered title, divider underneath */}
      <div className="container mx-auto px-4 md:px-8 mb-12">
        <div className="grid grid-cols-3 items-center mb-10 gap-4">
          <div className="flex items-center gap-2.5">
            <span
              className="w-1.5 h-1.5 rounded-full bg-brand-gray-500"
              aria-hidden
            />
            <span className="font-['Inter_Display',sans-serif] text-[14px] text-[#707070]">
              Our Team
            </span>
          </div>
          <h2 className="text-center font-sans font-medium text-black text-[40px] md:text-[60px] leading-[1.05] md:leading-[67px] tracking-tight">
            People
          </h2>
          {/* spacer — keeps the title visually centered */}
          <div aria-hidden />
        </div>
        <div className="h-px bg-brand-gray-300" />
      </div>

      {/* Horizontal carousel that bleeds off screen edges */}
      <div
        className="overflow-x-auto pb-2 hide-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="flex gap-6 px-4 md:px-8 lg:pl-[max(2rem,calc((100vw-1536px)/2+2rem))] lg:pr-[max(2rem,calc((100vw-1536px)/2+2rem))]">
          {team.map((member) => (
            <div
              key={member.name}
              className="shrink-0 w-[260px] sm:w-[300px] md:w-[320px] flex flex-col gap-5"
            >
              {/* Portrait — rectangular with rounded corners */}
              <div className="relative aspect-[4/5] rounded-[20px] overflow-hidden bg-brand-gray-100 border border-brand-gray-300">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-sans font-medium text-brand-gray-500 text-[56px] tracking-tight">
                      {initialsOf(member.name)}
                    </span>
                  </div>
                )}
              </div>

              {/* Name + role */}
              <div className="flex flex-col gap-1">
                <h3 className="font-sans font-semibold text-brand-gray-900 text-[22px] leading-[1.2] tracking-tight">
                  {member.name}
                </h3>
                <p className="font-['Inter_Display',sans-serif] text-[14px] text-[#707070]">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
