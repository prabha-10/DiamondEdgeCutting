"use client";

import React, { useEffect, useRef } from "react";

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

export function LeadershipCards({ team }: { team: TeamMember[] }) {
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {team.map((member, i) => (
        <article
          key={member.name}
          ref={(el) => { refs.current[i] = el; }}
          style={{
            opacity: 0,
            transform: "translateY(32px)",
            transition: `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms`,
          }}
          className="bg-white border border-brand-gray-300 rounded-[20px] p-7 md:p-9 flex flex-col gap-6"
        >
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
            <span aria-hidden className="absolute bottom-1.5 right-1.5 w-3 h-3 bg-brand-red rounded-[2px]" />
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
  );
}
