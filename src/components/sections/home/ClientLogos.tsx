import React from "react";

// Client roster per the client revision. Each entry renders a real logo
// image from /public/clients. Drop a new file into that folder and add an
// entry here to extend the grid.

type Client = { name: string; file: string };

const clients: Client[] = [
  { name: "Emaar", file: "EMAAR.png" },
  { name: "ALEC", file: "ALEC.png" },
  { name: "Al Naboodah", file: "Al Naboodah.jpg" },
  { name: "Al Tayer", file: "Al Tayer.jpg" },
  { name: "Khansaheb", file: "Khansaheb.jpg" },
  { name: "McLaren", file: "McLaren.png" },
  { name: "Bond Interiors", file: "Bond Interiors.png" },
  { name: "Modon", file: "modon.png" },
  { name: "DMT", file: "dmt.png" },
  { name: "Dutco Construction", file: "Dutco.jpeg" },
  { name: "Dubai Holding", file: "dubai_holding.png" },
  { name: "Shamal", file: "Shamal.jpeg" },
];

function ClientLogo({ client }: { client: Client }) {
  return (
    <div className="bg-white rounded-[14px] h-20 md:h-24 px-5 flex items-center justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/clients/${encodeURIComponent(client.file)}`}
        alt={`${client.name} logo`}
        className="max-h-14 md:max-h-16 w-auto max-w-full object-contain"
      />
    </div>
  );
}

export function ClientLogos() {
  return (
    <section className="pt-0 pb-16 md:pb-24 bg-brand-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col gap-3 mb-10 md:mb-14">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brand-red">
            Our Clients
          </span>
          <h2 className="font-display font-extrabold uppercase text-brand-gray-900 text-[36px] md:text-[52px] leading-[0.95] tracking-tight">
            Trusted by the region&apos;s{" "}
            <em className="font-light italic text-brand-red normal-case">leading developers &amp; contractors.</em>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {clients.map((client) => (
            <ClientLogo key={client.file} client={client} />
          ))}
        </div>
      </div>
    </section>
  );
}
