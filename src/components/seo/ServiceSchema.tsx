import React from "react";
import Script from "next/script";
import type { ServiceContent } from "@/lib/content";

export function ServiceSchema({ services }: { services: ServiceContent[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": services.map((service) => ({
      "@type": "Service",
      "@id": `https://diamondedgecutting.com/demolition-services#${service.id}`,
      "name": service.title,
      "provider": {
        "@id": "https://diamondedgecutting.com/#organization"
      },
      "description": service.description,
      "url": `https://diamondedgecutting.com/demolition-services#${service.id}`
    }))
  };

  return (
    <Script
      id="service-schema"
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
