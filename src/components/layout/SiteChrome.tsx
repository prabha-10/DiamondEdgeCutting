"use client";

import React from "react";
import { usePathname } from "next/navigation";

/**
 * Renders the marketing-site chrome (header / footer / inquiry widgets) around
 * children for normal routes, and renders ONLY the children on `/studio` routes
 * so Sanity Studio gets its own clean layout.
 *
 * The chrome elements are passed in as props (from the root server layout) so
 * Footer can stay a server component — Next.js allows server components to be
 * passed through client components via props.
 */
export function SiteChrome({
  header,
  footer,
  inquiryChrome,
  children,
}: {
  header: React.ReactNode;
  footer: React.ReactNode;
  inquiryChrome: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <>
      {header}
      <main className="flex-1 flex flex-col">{children}</main>
      {footer}
      {inquiryChrome}
    </>
  );
}
