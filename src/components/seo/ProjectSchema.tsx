import React from "react";

export function ProjectSchema({ projects }: { projects: any[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": projects.map((project, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "CreativeWork",
          "name": project.title,
          "description": project.scope,
          "url": `https://diamondedgecutting.com/projects/${project.slug}`,
          "creator": {
            "@id": "https://diamondedgecutting.com/#organization"
          }
        }
      }))
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
