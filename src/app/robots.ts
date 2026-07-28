import type { MetadataRoute } from "next";

// Vercel only ever runs the staging copy of this site -- the live site is on
// Hostinger (see DEPLOYMENT.md). Vercel sets VERCEL=1 on all of its builds and
// Hostinger sets nothing, so this tells staging apart without needing an extra
// environment variable on the hosting account. Without it, Google can index
// the .vercel.app copy as a duplicate of diamondedgecutting.com.
const isStaging = process.env.VERCEL === "1";

export default function robots(): MetadataRoute.Robots {
  if (isStaging) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    // /studio is the Sanity editor -- a login screen, nothing to crawl.
    rules: { userAgent: "*", allow: "/", disallow: "/studio" },
  };
}
