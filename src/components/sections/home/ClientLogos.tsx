import React from "react";

const clients = [
  "Emaar", "Shamal", "Damac", "Expo", "Omniyat", "DMT", "Mudon", "Veolia", 
  "Dutco", "Al Tayer Stocks", "Khansaheb", "Refcon", "Vale", "Drydocks", 
  "Engineering Office", "Alec", "Enoc", "Al Naboodah", "KPS"
];

export function ClientLogos() {
  return (
    <section className="py-24 bg-white border-t border-brand-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center text-center">
          <p className="text-brand-gray-500 font-medium tracking-wide uppercase text-sm mb-12">
            Trusted by Property Teams & Developers
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 max-w-5xl opacity-60">
            {clients.map((client, index) => (
              <div key={index} className="flex items-center justify-center hover:opacity-100 transition-opacity cursor-pointer">
                <span className="font-bold text-brand-gray-900 text-xl tracking-tight">{client}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
