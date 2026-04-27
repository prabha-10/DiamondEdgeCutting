import React from "react";

const team = [
  { name: "Anthony Keever", role: "Chief Executive Officer" },
  { name: "Robert Aylward", role: "Managing Director" },
  { name: "Conor Wade", role: "Operations Manager" },
  { name: "Carl Riley", role: "Commercial Manager" },
  { name: "Laxmikant Prajapat", role: "Finance Manager" }
];

export function Leadership() {
  return (
    <section className="py-32 bg-brand-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20">
          <h2 className="text-5xl md:text-7xl font-bold text-brand-gray-900 leading-none tracking-tight">
            Leadership
          </h2>
          <p className="text-xl text-brand-gray-700 font-medium max-w-xl text-left md:text-right">
            Decades of specialist demolition and engineering experience driving every project forward.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {team.map((member, index) => (
            <div key={index} className="flex flex-col group border-t border-brand-gray-300 pt-6">
              <div className="aspect-[3/4] bg-brand-gray-100 mb-6 overflow-hidden relative">
                <div className="absolute inset-0 bg-brand-gray-300 flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
                  <span className="text-brand-gray-500 font-mono text-xs uppercase tracking-widest">[Photo]</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-brand-gray-900 mb-2">{member.name}</h3>
              <p className="text-brand-gray-500 font-medium">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
