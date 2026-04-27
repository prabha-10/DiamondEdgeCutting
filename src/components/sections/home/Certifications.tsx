import React from "react";

const certifications = [
  "ISO 9001",
  "ISO 14001",
  "ISO 45001",
  "ICV Certified",
  "DM G+12",
  "CICSPA"
];

export function Certifications() {
  return (
    <section className="py-24 bg-white border-t border-brand-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-gray-900 mb-6 tracking-tight">
              Backed by Certification
            </h2>
            <p className="text-xl text-brand-gray-700 font-medium">
              We operate to the highest international standards for quality, environment, and occupational health and safety.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-12 gap-y-6">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center">
                <span className="font-bold text-brand-gray-900 text-2xl tracking-tight">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
