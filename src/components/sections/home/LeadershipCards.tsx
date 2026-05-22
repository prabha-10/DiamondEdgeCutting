import React from "react";

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  years: string;
  image?: string;
};

function initialsOf(name: string) {
  return name.split(" ").map((p) => p[0]).join("").slice(0, 2);
}

function Card({ member }: { member: TeamMember }) {
  return (
    <article className="bg-white border border-brand-gray-300 rounded-[20px] overflow-hidden flex flex-col group">
      {/* Image / initials block — top */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-brand-gray-100">
        {member.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.image}
            alt={member.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display font-extrabold uppercase text-brand-red text-[88px] md:text-[112px] tracking-tight leading-none">
              {initialsOf(member.name)}
            </span>
          </div>
        )}
        <span aria-hidden className="absolute top-3 right-3 w-2.5 h-2.5 bg-brand-red rounded-[2px]" />
      </div>

      {/* Name + role panel — below image */}
      <div className="p-4 md:p-5 flex flex-col gap-1">
        <h3 className="font-display font-bold uppercase text-brand-gray-900 text-[16px] md:text-[18px] tracking-tight leading-[1.05]">
          {member.name}
        </h3>
        <p className="font-mono text-[10px] md:text-[10.5px] uppercase tracking-[0.18em] text-brand-red">
          {member.role}
        </p>
      </div>
    </article>
  );
}

export function LeadershipCards({ team }: { team: TeamMember[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
      {team.map((member) => (
        <Card key={member.name} member={member} />
      ))}
    </div>
  );
}
