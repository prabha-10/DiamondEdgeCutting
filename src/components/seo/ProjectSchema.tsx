import React from "react";
import Script from "next/script";

type ProjectShape = {
  title: string;
  slug: string;
  scope?: string;
  scopeSummary?: string;
};

export function ProjectSchema({ projects }: { projects: ProjectShape[] }) {
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
          "description": project.scopeSummary ?? project.scope,
          "url": `https://diamondedgecutting.com/projects/${project.slug}`,
          "creator": {
            "@id": "https://diamondedgecutting.com/#organization"
          }
        }
      }))
    }
  };

  return (
    <Script
      id="project-schema"
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
