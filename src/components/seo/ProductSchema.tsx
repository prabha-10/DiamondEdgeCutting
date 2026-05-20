import React from "react";
import Script from "next/script";

export function ProductSchema({ products }: { products: any[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": products.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": product.name,
        "description": product.spec,
        "brand": {
          "@type": "Brand",
          "name": "Diamond Edge Cutting"
        }
      }
    }))
  };

  return (
    <Script
      id="product-schema"
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
