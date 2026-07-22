import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | Diamond Edge Cutting",
  description:
    "The terms and conditions governing your use of the Diamond Edge Cutting website and services.",
};

const sections = [
  {
    heading: "1. Acceptance of Terms",
    body: [
      "By accessing or using the Diamond Edge Cutting LLC website, you agree to be bound by these Terms of Use. If you do not agree, please do not use the website.",
    ],
  },
  {
    heading: "2. Use of the Website",
    body: [
      "You may use this website for lawful purposes only. You agree not to misuse the site, interfere with its operation, or attempt to access it using any method other than the interface we provide.",
    ],
  },
  {
    heading: "3. Services & Quotes",
    body: [
      "Information on this website about our demolition services and equipment rental is provided for general guidance. Quotes, availability, and specifications are confirmed in writing and are subject to a separate agreement before any work commences.",
    ],
  },
  {
    heading: "4. Intellectual Property",
    body: [
      "All content on this website, including text, logos, images, and design, is the property of Diamond Edge Cutting LLC or its licensors and is protected by applicable laws. You may not reproduce or distribute it without our prior written consent.",
    ],
  },
  {
    heading: "5. Limitation of Liability",
    body: [
      "The website is provided on an \"as is\" basis. To the fullest extent permitted by law, we are not liable for any loss or damage arising from your use of, or reliance on, the website or its content.",
    ],
  },
  {
    heading: "6. Third-Party Links",
    body: [
      "Our website may contain links to third-party sites. We are not responsible for the content or practices of those sites and provide such links for convenience only.",
    ],
  },
  {
    heading: "7. Governing Law",
    body: [
      "These Terms are governed by the laws of the United Arab Emirates. Any disputes are subject to the exclusive jurisdiction of the courts of Dubai.",
    ],
  },
  {
    heading: "8. Contact Us",
    body: [
      "For any questions about these Terms, contact us at info@diamondedgecutting.com or +971 4 370 6434.",
    ],
  },
];

export default function TermsPage() {
  return (
    <section className="relative pt-36 md:pt-44 pb-20 md:pb-28 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <div className="flex flex-col gap-4 mb-12">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brand-red">
            Legal
          </span>
          <h1 className="font-display font-extrabold uppercase text-brand-gray-900 text-[40px] md:text-[60px] leading-[0.95] tracking-tight">
            Terms of Use
          </h1>
          <p className="font-['Inter_Display',sans-serif] text-[15px] text-brand-gray-500">
            Last updated: June 2026
          </p>
        </div>

        <div className="flex flex-col gap-10">
          {sections.map((s) => (
            <div key={s.heading} className="flex flex-col gap-3">
              <h2 className="font-display font-bold text-brand-gray-900 text-[22px] md:text-[26px] tracking-tight">
                {s.heading}
              </h2>
              {s.body.map((p, i) => (
                <p
                  key={i}
                  className="font-['Inter_Display',sans-serif] text-[16px] md:text-[18px] leading-[1.65] text-brand-gray-700"
                >
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
