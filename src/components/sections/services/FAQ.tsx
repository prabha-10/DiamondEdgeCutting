"use client";

import React, { useState } from "react";
import { faqs } from "@/data/services";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <h2 className="text-4xl md:text-6xl font-bold text-center text-brand-gray-900 mb-20 tracking-tight">
          Common Questions
        </h2>
        
        <div className="flex flex-col border-t border-brand-gray-300">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className="border-b border-brand-gray-300 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between py-8 text-left focus:outline-none group"
                >
                  <span className={cn(
                    "text-xl md:text-2xl font-bold pr-8 transition-colors group-hover:text-brand-red tracking-tight",
                    isOpen ? "text-brand-red" : "text-brand-gray-900"
                  )}>
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={cn(
                      "w-6 h-6 shrink-0 transition-transform duration-300",
                      isOpen ? "rotate-180 text-brand-red" : "text-brand-gray-500 group-hover:text-brand-gray-900"
                    )} 
                  />
                </button>
                
                <div 
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isOpen ? "max-h-[500px] opacity-100 pb-8" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="text-brand-gray-700 text-lg font-medium leading-relaxed max-w-3xl">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
