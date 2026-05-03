import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
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
    console.error("Failed to fetch categories from Sanity, using fallback:", error);
    rentalCategories = equipmentCategories.map(c => ({ title: c.title, slug: c.slug }));
  }
  return (
    <html
      lang="en"
      className="h-full antialiased scroll-smooth"
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col font-sans selection:bg-brand-red selection:text-white"
        suppressHydrationWarning
      >
        <OrganizationSchema />
        <InquiryProvider>
          <IntroProvider>
            <Header rentalCategories={rentalCategories} />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
            <InquiryStickyBar />
            <InquiryModal />
          </IntroProvider>
        </InquiryProvider>
      </body>
    </html>
  );
}
