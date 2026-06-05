"use client";

import React, { useState } from "react";

// Client roster per the client revision. Each entry renders a real logo
// image from /public/clients/{slug}.png when present, and falls back to a
// clean wordmark if the file isn't supplied yet — so the section never
// shows a broken image. Drop logo files into public/clients to light them up.

type Client = { name: string; slug: string };

const clients: Client[] = [
  { name: "Dutco", slug: "dutco" },
  { name: "Al Tayer", slug: "al-tayer" },
  { name: "DMT", slug: "dmt" },
  { name: "Shamal", slug: "shamal" },
  { name: "Khansaheb", slug: "khansaheb" },
  { name: "Modon", slug: "modon" },
  { name: "Emaar", slug: "emaar" },
  { name: "Zublin", slug: "zublin" },
  { name: "Engineering Office", slug: "engineering-office" },
  { name: "Drydocks", slug: "drydocks" },
  { name: "Expo", slug: "expo" },
];

function ClientLogo({ client }: { client: Client }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="bg-white rounded-[14px] h-24 md:h-28 px-5 flex items-center justify-center">
      {failed ? (
        <span className="font-display font-extrabold uppercase text-brand-gray-900 text-[18px] md:text-[20px] tracking-tight text-center leading-tight">
          {client.name}
        </span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`/clients/${client.slug}.png`}
          alt={`${client.name} logo`}
          onError={() => setFailed(true)}
          className="max-h-14 md:max-h-16 w-auto max-w-full object-contain grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
        />
      )}
    </div>
  );
}

export function ClientLogos() {
  return (
    <section className="py-16 md:py-24 bg-brand-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col gap-3 mb-10 md:mb-14">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brand-red">
            Our Clients
          </span>
          <h2 className="font-display font-extrabold uppercase text-brand-gray-900 text-[36px] md:text-[52px] leading-[0.95] tracking-tight">
            Trusted by the region&apos;s{" "}
            <em className="font-light italic text-brand-red normal-case">leading developers.</em>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {clients.map((client) => (
            <ClientLogo key={client.slug} client={client} />
          ))}
        </div>
      </div>
    </section>
  );
}
