import React from "react";

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
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
