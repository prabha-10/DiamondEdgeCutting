"use client";

import React, { useEffect, useRef, useState } from "react";

const stats = [
  { target: 17, suffix: "+", label: "Years operating in the UAE" },
  { target: 300, suffix: "+", label: "Trained professionals" },
  { target: 18, suffix: "+", label: "Headline projects delivered" },
];

function CountUp({ target, suffix, duration = 1600 }: { target: number; suffix: string; duration?: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!ref.current || startedRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
              setValue(Math.round(eased * target));
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

export function Overview() {
  return (
    <section className="pt-8 pb-32 bg-brand-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        {/* Top: eyebrow + headline split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 border-t border-brand-gray-200 pt-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gray-500" />
              <span className="font-['Inter_Display',sans-serif] font-normal text-[#707070] text-[20px] leading-[22px] tracking-normal">
                Built on experience and craft
              </span>
            </div>
          </div>
          <div className="lg:col-span-8">
            <h2 className="font-sans font-medium text-black text-[40px] leading-[45px] tracking-tight">
              We deliver specialist demolition projects focused on safety and precision.{" "}
              <span className="text-brand-gray-500">
                Partnering with major developers across the Middle East using advanced robotic methodologies.
              </span>
            </h2>
          </div>
        </div>

        {/* Bottom: numbered stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-10 flex flex-col gap-12 min-h-[260px]"
            >
              <span className="text-sm font-medium text-brand-gray-500">
                /{String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="font-sans font-medium text-[rgb(10,10,10)] text-[68px] leading-[68px] mb-4 tracking-tight tabular-nums">
                  <CountUp target={stat.target} suffix={stat.suffix} />
                </div>
                <div className="font-['Inter_Display',sans-serif] font-normal text-[#707070] text-[18px] leading-[normal]">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
