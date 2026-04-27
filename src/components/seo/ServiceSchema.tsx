import React from "react";
import Script from "next/script";
import { servicesDetails } from "@/data/services";

export function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": servicesDetails.map((service) => ({
      "@type": "Service",
      "@id": `https://diamondedgecutting.com/demolition-services#${service.id}`,
      "name": service.title,
      "provider": {
        "@id": "https://diamondedgecutting.com/#organization"
      },
      "description": service.lead,
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
