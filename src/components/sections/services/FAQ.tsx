"use client";

import React, { useState } from "react";
import Link from "next/link";
import { faqs } from "@/data/services";
import { ArrowDown, ArrowUp, ArrowRight } from "lucide-react";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-32 bg-brand-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left, heading + CTA card */}
          <div className="lg:col-span-5 flex flex-col gap-12 lg:sticky lg:top-24">
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2.5">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-brand-red"
                  aria-hidden
                />
                <span className="font-['Inter_Display',sans-serif] text-[13px] uppercase tracking-[0.12em] text-[#707070]">
                  Common Questions
                </span>
              </div>
              <h2 className="font-sans font-medium text-brand-gray-900 text-[40px] md:text-[52px] leading-[1.05] tracking-tight">
                Everything contractors ask before we start.
              </h2>
              <p className="font-['Inter_Display',sans-serif] font-normal text-[16px] leading-[1.55] text-[#707070] max-w-md">
                Quick answers to the questions that come up on most enquiries.
                Anything else? Reach out.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <span className="font-['Inter_Display',sans-serif] text-[14px] text-[#707070]">
                Need a method statement?
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
                    <span className="font-['Inter_Display',sans-serif] text-[14px] text-[#707070] mt-1">
                      Reach out anytime.
                    </span>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 rounded-full bg-black text-white pl-5 pr-2 py-2 self-start hover:bg-brand-gray-700 transition-colors"
                >
                  <span className="font-sans font-medium text-[15px]">
                    Talk to us
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
                <div key={i} className="bg-white rounded-[20px]">
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
                          ? "bg-[#F5F5F5] text-black"
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
                      <p className="px-6 pb-6 font-['Inter_Display',sans-serif] font-normal text-[18px] leading-[1.55] text-[#707070] max-w-[60ch]">
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
