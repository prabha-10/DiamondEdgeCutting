import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { OrganizationSchema } from "@/components/seo/Schema";
import { IntroProvider } from "@/context/IntroContext";

export const metadata: Metadata = {
  title: {
    template: "%s | Diamond Edge Cutting",
    default: "Specialist Demolition Contractor Dubai & UAE | Diamond Edge Cutting",
  },
  description: "GCC's largest robotic demolition fleet. Specialist controlled demolition, concrete cutting, equipment rental across Dubai, Abu Dhabi & UAE since 2008.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        <IntroProvider>
          <Header />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </IntroProvider>
      </body>
    </html>
  );
}
