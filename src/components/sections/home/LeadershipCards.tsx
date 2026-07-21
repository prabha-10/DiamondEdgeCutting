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

function Card({ member, ariaHidden }: { member: TeamMember; ariaHidden?: boolean }) {
  return (
    <article
      aria-hidden={ariaHidden}
      className="w-[240px] md:w-[260px] shrink-0 bg-brand-gray-100 border-t-2 border-brand-red p-6 flex flex-col gap-4 group"
    >
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
    // Clipped to the page container (this lives inside `container … px-4 md:px-8`),
    // so the track never runs to the screen edge. Reduced-motion users get a
    // normal horizontal scroll instead of the animation.
    <div className="marquee-fade overflow-hidden motion-reduce:overflow-x-auto motion-reduce:[mask-image:none]">
      <ul className="flex w-max gap-4 md:gap-5 py-1 animate-marquee motion-reduce:animate-none">
        {/* Real cards */}
        {team.map((member) => (
          <li key={`a-${member.name}`}>
            <Card member={member} />
          </li>
        ))}
        {/* Seamless-loop duplicate — hidden from assistive tech and from
            reduced-motion users (who scroll the real set manually). */}
        {team.map((member) => (
          <li key={`b-${member.name}`} className="motion-reduce:hidden">
            <Card member={member} ariaHidden />
          </li>
        ))}
      </ul>
    </div>
  );
}
