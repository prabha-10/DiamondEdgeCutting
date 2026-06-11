import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Diamond Edge Cutting",
  description:
    "How Diamond Edge Cutting collects, uses, and protects your personal information across our demolition and equipment rental services.",
};

const sections = [
  {
    heading: "1. Introduction",
    body: [
      "Diamond Edge Cutting LLC (\"we\", \"us\", \"our\") respects your privacy and is committed to protecting the personal information you share with us. This policy explains what we collect, how we use it, and the choices you have.",
      "By using our website or contacting us, you agree to the practices described in this policy.",
    ],
  },
  {
    heading: "2. Information We Collect",
    body: [
      "We collect information you provide directly — such as your name, email address, phone number, company, and project details — when you submit an enquiry, request a quote, or contact us.",
      "We may also collect limited technical information automatically, including your IP address, browser type, and pages visited, to help us improve the website.",
    ],
  },
  {
    heading: "3. How We Use Your Information",
    body: [
      "We use your information to respond to enquiries, prepare quotes, deliver our services, and communicate with you about your project. We may also use it to improve our website and services.",
      "We do not sell your personal information to third parties.",
    ],
  },
  {
    heading: "4. Data Sharing",
    body: [
      "We may share your information with trusted service providers who help us operate our business (for example, hosting or email providers), strictly for the purposes described above, and with authorities where required by law.",
    ],
  },
  {
    heading: "5. Data Security & Retention",
    body: [
      "We apply reasonable technical and organisational measures to protect your information. We retain personal data only for as long as necessary to fulfil the purposes set out in this policy or to comply with legal obligations.",
    ],
  },
  {
    heading: "6. Your Rights",
    body: [
      "You may request access to, correction of, or deletion of your personal information at any time. To make a request, contact us using the details below.",
    ],
  },
  {
    heading: "7. Contact Us",
    body: [
      "If you have any questions about this Privacy Policy, contact us at info@diamondedgecutting.com or +971 4 370 6434.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <section className="relative pt-36 md:pt-44 pb-20 md:pb-28 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <div className="flex flex-col gap-4 mb-12">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brand-red">
            Legal
          </span>
          <h1 className="font-display font-extrabold uppercase text-brand-gray-900 text-[40px] md:text-[60px] leading-[0.95] tracking-tight">
            Privacy Policy
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
