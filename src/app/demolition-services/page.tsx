import type { Metadata } from "next";
import { ServiceHero } from "@/components/sections/services/ServiceHero";
import { WhyDec } from "@/components/sections/services/WhyDec";
import { ServiceDetails } from "@/components/sections/services/ServiceDetails";
import { FAQ } from "@/components/sections/services/FAQ";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";

export const metadata: Metadata = {
  title: "Demolition Services Dubai & UAE | Robotic, Controlled, Strip-Out",
  description: "Specialist demolition services across Dubai and the UAE: robotic demolition, controlled demolition, wire sawing, core drilling, strip-out, refractory works.",
};

export default function DemolitionServicesPage() {
  return (
    <>
      <ServiceSchema />
      <FAQSchema />
      <ServiceHero />
      <WhyDec />
      <ServiceDetails />
      <FAQ />
    </>
  );
}
