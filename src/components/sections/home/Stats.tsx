import React from "react";

const stats = [
  { value: "17+", label: "Years operating in the UAE" },
  { value: "300+", label: "Trained professionals" },
  { value: "18+", label: "Headline projects delivered" },
];

export function Stats() {
  return (
    <section className="py-24 bg-white border-y border-brand-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col">
              <div className="text-6xl md:text-8xl font-bold text-brand-gray-900 mb-4 tracking-tighter">
                {stat.value}
              </div>
              <div className="text-lg font-medium text-brand-gray-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
