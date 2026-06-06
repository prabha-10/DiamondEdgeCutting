import React from "react";
import Script from "next/script";

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://diamondedgecutting.com/#organization",
        "name": "Diamond Edge Cutting",
        "url": "https://diamondedgecutting.com/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://diamondedgecutting.com/logo.png" // Update with actual path
        },
        "description": "Specialist demolition contractor delivering safe, precise, and efficient solutions across all sectors of the construction industry in the GCC.",
        "foundingDate": "2008",
        "sameAs": ["https://www.linkedin.com/company/diamond-edge-cutting-llc/"]
      },
      {
        "@type": "HomeAndConstructionBusiness",
        "@id": "https://diamondedgecutting.com/#localbusiness-dubai",
        "name": "Diamond Edge Cutting - Dubai HQ",
        "url": "https://diamondedgecutting.com/",
        "telephone": "+97143706434",
        "email": "info@diamondedgecutting.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Plot 597-604, Dubai Investment Park 2",
          "addressLocality": "Dubai",
          "addressRegion": "Dubai",
          "postalCode": "430971",
          "addressCountry": "AE"
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "08:00",
            "closes": "17:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Saturday"],
            "opens": "09:00",
            "closes": "14:00"
          }
        ]
      },
      {
        "@type": "HomeAndConstructionBusiness",
        "@id": "https://diamondedgecutting.com/#localbusiness-abudhabi",
        "name": "Diamond Edge Cutting - Abu Dhabi Office",
        "telephone": "+97143706434",
        "email": "info@diamondedgecutting.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "9th Floor, ADNIC Building, Khalifa Street",
          "addressLocality": "Abu Dhabi",
          "addressRegion": "Abu Dhabi",
          "postalCode": "45526",
          "addressCountry": "AE"
        }
      }
    ]
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
