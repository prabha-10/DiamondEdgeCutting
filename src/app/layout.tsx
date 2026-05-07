import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { OrganizationSchema } from "@/components/seo/Schema";
import { IntroProvider } from "@/context/IntroContext";
import { getAllCategories } from "../../sanity/lib/queries";
import { equipmentCategories } from "@/lib/equipment-data";

import { InquiryProvider } from "@/components/inquiry/InquiryProvider";
import { InquiryStickyBar } from "@/components/inquiry/InquiryStickyBar";
import { InquiryModal } from "@/components/inquiry/InquiryModal";

export const metadata: Metadata = {
  title: {
    template: "%s | Diamond Edge Cutting",
    default: "Specialist Demolition Contractor Dubai & UAE | Diamond Edge Cutting",
  },
  description: "GCC's largest robotic demolition fleet. Specialist controlled demolition, concrete cutting, equipment rental across Dubai, Abu Dhabi & UAE since 2008.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let rentalCategories = [];
  try {
    rentalCategories = await getAllCategories();
    if (!rentalCategories || rentalCategories.length === 0) {
      rentalCategories = equipmentCategories.map(c => ({ title: c.title, slug: c.slug }));
    }
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.warn(`[Sanity] categories fetch failed (${msg.slice(0, 120)}); using local fallback.`);
    rentalCategories = equipmentCategories.map(c => ({ title: c.title, slug: c.slug }));
  }
  return (
    <html
      lang="en"
      className="h-full antialiased scroll-smooth"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col font-sans selection:bg-brand-red selection:text-white"
        suppressHydrationWarning
      >
        <OrganizationSchema />
        <InquiryProvider>
          <IntroProvider>
            <SiteChrome
              header={<Header rentalCategories={rentalCategories} />}
              footer={<Footer />}
              inquiryChrome={
                <>
                  <InquiryStickyBar />
                  <InquiryModal />
                </>
              }
            >
              {children}
            </SiteChrome>
          </IntroProvider>
        </InquiryProvider>
      </body>
    </html>
  );
}
