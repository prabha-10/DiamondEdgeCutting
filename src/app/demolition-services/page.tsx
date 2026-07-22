import type { Metadata } from "next";
import { ServiceHero } from "@/components/sections/services/ServiceHero";
import { ServiceDetails } from "@/components/sections/services/ServiceDetails";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import { getServiceContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Demolition Services Dubai & UAE | Robotic, Controlled, Strip-Out",
  description: "Specialist demolition services across Dubai and the UAE: robotic demolition, controlled demolition, wire sawing, core drilling, strip-out, refractory works.",
};

// Re-fetch from Sanity at most once a minute so Studio edits show up quickly
// without hammering the API. Same policy as /projects.
export const revalidate = 60;

export default async function DemolitionServicesPage() {
  const services = await getServiceContent();

  return (
    <>
      <ServiceSchema services={services} />
      <ServiceHero />
      <ServiceDetails services={services} />
    </>
  );
}
