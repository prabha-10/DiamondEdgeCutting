import React from "react";

export function MissionVision() {
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-5xl">
          <h2 className="text-5xl md:text-7xl font-bold text-brand-gray-900 mb-20 tracking-tight leading-none">
            How We Work
          </h2>

          <div className="flex flex-col gap-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-4">
                <h3 className="text-2xl font-bold text-brand-gray-900">Our Mission</h3>
              </div>
              <div className="md:col-span-8">
                <p className="text-2xl text-brand-gray-700 font-medium leading-relaxed">
                  To deliver innovative, safe, and efficient demolition solutions that exceed client expectations while maintaining the highest standards of quality, professionalism, and environmental responsibility.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-brand-gray-100 pt-16">
              <div className="md:col-span-4">
                <h3 className="text-2xl font-bold text-brand-gray-900">Our Vision</h3>
              </div>
              <div className="md:col-span-8">
                <p className="text-2xl text-brand-gray-700 font-medium leading-relaxed">
                  To be recognised as the leading specialist demolition contractor in the Middle East region, setting industry benchmarks for safety, innovation, and operational excellence.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-brand-gray-100 pt-16">
              <div className="md:col-span-4">
                <h3 className="text-2xl font-bold text-brand-gray-900">Our Values</h3>
              </div>
              <div className="md:col-span-8">
                <ul className="flex flex-wrap gap-x-12 gap-y-6 text-xl text-brand-gray-700 font-medium">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-brand-red" />
                    Cost Efficiency
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-brand-red" />
                    On-Time Delivery
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-brand-red" />
                    Skilled Workforce
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-brand-red" />
                    Specialist Experience
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-brand-red" />
                    Latest Technology
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
