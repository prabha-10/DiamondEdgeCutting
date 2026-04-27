import React from "react";

export function Overview() {
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-5xl mx-auto text-center md:text-left">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-gray-900 mb-12 leading-[1.1] tracking-tight">
            We deliver specialist demolition projects focused on safety and precision.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left border-t border-brand-gray-100 pt-12">
            <p className="text-xl text-brand-gray-700 leading-relaxed font-medium">
              Diamond Edge Cutting is a leading specialist demolition contractor delivering safe, precise, and efficient solutions across all sectors of the construction industry.
            </p>
            <p className="text-xl text-brand-gray-700 leading-relaxed font-medium">
              Partnering with major developers across the Middle East, we execute complex demolition with speed, accuracy, and uncompromising safety standards using advanced robotic methodologies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
