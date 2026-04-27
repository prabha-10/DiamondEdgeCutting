import React from "react";

const stats = [
  { value: "17+", label: "Years operating in the UAE" },
  { value: "300+", label: "Trained professionals" },
  { value: "18+", label: "Headline projects delivered" },
];

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
                <div className="font-sans font-medium text-[rgb(10,10,10)] text-[68px] leading-[68px] mb-4 tracking-tight">
                  {stat.value}
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
