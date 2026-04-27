import React from "react";

const reasons = [
  {
    title: "Largest robotic fleet",
    description: "Brokk 500 to 160; Husqvarna DXR 300 to 145."
  },
  {
    title: "30+ years experience",
    description: "Roots in Europe, established in the UAE in 2008."
  },
  {
    title: "Authority compliant",
    description: "ISO 9001, 14001, 45001. DM G+12 approved."
  }
];

export function WhyDec() {
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-4">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-gray-900 tracking-tight">Why DEC</h2>
          </div>
          
          <div className="lg:col-span-8 flex flex-col gap-12">
            {reasons.map((reason, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-6 md:gap-12 border-b border-brand-gray-100 pb-12 last:border-0 last:pb-0">
                <h3 className="text-3xl md:text-4xl font-bold text-brand-gray-900 tracking-tight w-full md:w-1/2">{reason.title}</h3>
                <p className="text-xl text-brand-gray-700 font-medium w-full md:w-1/2 mt-2 md:mt-0">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
