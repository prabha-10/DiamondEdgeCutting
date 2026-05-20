import React from "react";
import Script from "next/script";

export function ContactSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "Organization",
      "@id": "https://diamondedgecutting.com/#organization",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+971-4-370-6434",
          "contactType": "customer service",
          "email": "info@diamondedgecutting.com",
          "areaServed": "AE",
          "availableLanguage": "English"
        }
      ]
    }
  };

  return (
    <Script
      id="contact-schema"
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
