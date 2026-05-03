"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUp, ArrowRight } from "lucide-react";

type FaqItem = {
  question: string;
  answer: string;
};

const faqs: FaqItem[] = [
  {
    question: "What types of demolition projects do you handle?",
    answer:
      "We deliver controlled, robotic, and selective demolition across residential, commercial, and infrastructure projects, from single-storey strip-outs to 26-metre long-reach high-rise demolition. Each scope is approached based on the structure, environment, and programme constraints.",
  },
  {
    question: "Do you supply operators with the equipment?",
    answer:
      "Yes. Robotic and long-reach machines are always operated by our trained, HSE-certified crew. Standard 14-50 ton excavators, skid steers, and mini excavators can be hired wet (with operator) or dry to approved clients.",
  },
  {
    question: "How do you handle site safety?",
    answer:
      "Every project ships with a site-specific risk assessment, method statement, and HSE plan aligned with ISO 45001. Our 300+ trained crew run zero-incident programmes as a baseline, with daily toolbox talks, full PPE compliance, and on-site supervision.",
  },
  {
    question: "Are you approved by Dubai Municipality?",
    answer:
      "Yes, we hold DM G+12 approval (cleared up to ground + 12 floors), ICV certification, and CICSPA Specialist Permit Authority for complex demolition works. All certificates are active and independently audited.",
  },
  {
    question: "How quickly can you mobilise?",
    answer:
      "For live tenders we issue same-day quotes. Mobilisation typically follows within 5-10 working days depending on permit lead times, equipment requirements, and the contractor's site readiness.",
  },
  {
    question: "Do you handle waste removal and recycling?",
    answer:
      "Yes, end-to-end demolition plus waste removal. 12 / 22 CBM skips, 3 to 18 CBM tipper lorries, and recycling-led disposal pathways. Municipality tipping fees, drivers, and waste manifests are all included.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-32 bg-brand-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left, heading + CTA card */}
          <div className="lg:col-span-5 flex flex-col gap-12 lg:sticky lg:top-24">
            <div className="flex flex-col gap-5">
              <h2 className="font-sans font-medium text-brand-gray-900 text-[40px] md:text-[52px] leading-[1.05] tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="font-['Inter_Display',sans-serif] font-normal text-[16px] leading-[1.55] text-brand-gray-500 max-w-md">
                Questions? We have answers. Here&apos;s what you need to know
                about working with us.
              </p>
            </div>

            {/* CTA card */}
            <div className="flex flex-col gap-4">
              <span className="font-['Inter_Display',sans-serif] text-[14px] text-brand-gray-500">
                Need to ask something else?
              </span>
              <div className="bg-white rounded-[20px] p-6 flex flex-col gap-8 max-w-md">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-[8px] bg-brand-gray-100 flex items-center justify-center shrink-0">
                    <span className="font-sans font-semibold text-brand-gray-700 text-[15px]">
                      RA
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-sans font-medium text-black text-[16px] leading-[1.3] tracking-tight">
                      Hi, I&apos;m Robert, MD of Diamond Edge
                    </span>
                    <span className="font-['Inter_Display',sans-serif] text-[14px] text-brand-gray-500 mt-1">
                      Reach out anytime.
                    </span>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 rounded-full bg-black text-white pl-5 pr-2 py-2 self-start hover:bg-brand-gray-700 transition-colors"
                >
                  <span className="font-sans font-medium text-[15px]">
                    Ask Questions
                  </span>
                  <span className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right, FAQ accordion */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={faq.question}
                  className="bg-white rounded-[20px]"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-6 text-left p-6"
                  >
                    <h3 className="font-sans font-medium text-black text-[20px] leading-[24px] tracking-tight">
                      {faq.question}
                    </h3>
                    <span
                      className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                        isOpen
                          ? "bg-brand-gray-100 text-black"
                          : "bg-black text-white"
                      }`}
                      aria-hidden
                    >
                      {isOpen ? (
                        <ArrowUp className="w-4 h-4" strokeWidth={2} />
                      ) : (
                        <ArrowDown className="w-4 h-4" strokeWidth={2} />
                      )}
                    </span>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 font-['Inter_Display',sans-serif] font-normal text-[18px] leading-[1.55] text-brand-gray-500 max-w-[60ch]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
