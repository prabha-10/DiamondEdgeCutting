import React from "react";
import {
  ArrowUpRight, Hexagon, Triangle, Layers, Squircle, Sparkles,
  Building2, Compass, Diamond, Flame, Hammer, Anchor, Boxes,
} from "lucide-react";

const featured = [
  { name: "Emaar", Icon: ArrowUpRight },
  { name: "Damac", Icon: Layers },
  { name: "Omniyat", Icon: Hexagon },
  { name: "Expo", Icon: Triangle },
  { name: "Veolia", Icon: Sparkles },
  { name: "Khansaheb", Icon: Squircle },
  { name: "Shamal", Icon: Building2 },
  { name: "Mudon", Icon: Compass },
  { name: "Drydocks", Icon: Anchor },
  { name: "Alec", Icon: Boxes },
  { name: "Refcon", Icon: Hammer },
  { name: "Enoc", Icon: Flame },
  { name: "Vale", Icon: Diamond },
];

export function ClientLogos() {
  return (
    <section className="pt-12 pb-8 bg-brand-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-12">
          {/* Left: heading */}
          <div className="flex flex-col gap-4 shrink-0">
            <p className="font-['Inter_Display',sans-serif] font-medium text-black text-[18px] leading-[24px] tracking-normal">
              Trusted by property teams
            </p>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2 shrink-0">
                {[12, 32, 47].map((id) => (
                  <img
                    key={id}
                    src={`https://i.pravatar.cc/64?img=${id}`}
                    alt=""
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ))}
              </div>
              <span className="font-['Inter_Display',sans-serif] font-normal text-[14px] leading-[16px] text-brand-gray-500 max-w-[160px]">
                Used by 60+ developers &amp; builders
              </span>
            </div>
          </div>

          {/* Right: logo cards (static, balanced across 2 rows) */}
          <div className="flex-1">
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-2.5">
              {featured.map(({ name, Icon }) => (
                <div
                  key={name}
                  className="bg-white rounded-[10px] px-3 py-3 flex items-center justify-center gap-2 transition-all"
                >
                  <Icon className="w-4 h-4 text-brand-gray-900 shrink-0" strokeWidth={2.2} />
                  <span className="font-['Inter_Display',sans-serif] font-bold text-brand-gray-900 text-[14px] tracking-tight whitespace-nowrap">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
