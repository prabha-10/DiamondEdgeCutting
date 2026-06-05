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
    <article className="bg-brand-gray-100 border-t-2 border-brand-red p-6 flex flex-col gap-4 group">
      {/* Compact circular avatar — image or initials */}
      <div className="relative w-16 h-16 rounded-full overflow-hidden bg-brand-red/10 flex items-center justify-center shrink-0">
        {member.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.image}
            alt={member.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <span className="font-display font-bold uppercase text-brand-red text-[22px] tracking-tight leading-none">
            {initialsOf(member.name)}
          </span>
        )}
      </div>

      {/* Name + role */}
      <div className="flex flex-col gap-1">
        <h3 className="font-display font-bold uppercase text-brand-gray-900 text-[16px] md:text-[18px] tracking-tight leading-[1.05]">
          {member.name}
        </h3>
        <p className="font-mono text-[10px] md:text-[10.5px] uppercase tracking-[0.16em] text-brand-red">
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
