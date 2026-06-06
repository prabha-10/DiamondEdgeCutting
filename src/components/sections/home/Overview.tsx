import React from "react";

// "Who we are" combined with Mission & Vision in a single block, per the
// client revision (image7): eyebrow + headline and intro on the left, two
// body paragraphs on the right, then Mission / Vision cards beneath.

export function Overview() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        {/* Top: headline + intro (left) / body paragraphs (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brand-red">
              Who We Are
            </span>
            <h2 className="font-display font-extrabold uppercase text-brand-gray-900 text-[40px] md:text-[58px] lg:text-[64px] leading-[0.95] tracking-tight">
              Specialists.{" "}
              <em className="font-light italic text-brand-red normal-case">
                Not generalists.
              </em>
            </h2>
            <p className="font-['Inter_Display',sans-serif] text-[18px] md:text-[20px] leading-[1.5] text-brand-gray-900">
              Diamond Edge Cutting is a leading specialist demolition contractor
              delivering safe, precise, and efficient solutions across all sectors
              of the construction industry.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col gap-5 lg:pt-12">
            <p className="font-['Inter_Display',sans-serif] text-[16px] md:text-[17px] leading-[1.7] text-brand-gray-700">
              DEC established operations in the United Arab Emirates in 2008,
              building on more than 15 years of prior experience across Ireland and
              Europe. DEC has successfully partnered with major developers, main
              contractors, and consultants across the region on complex and
              technically challenging projects.
            </p>
            <p className="font-['Inter_Display',sans-serif] text-[16px] md:text-[17px] leading-[1.7] text-brand-gray-700">
              Using advanced technology and modern methodologies, we execute both
              light and heavy demolition projects with speed, accuracy, and
              uncompromising safety standards. With a dedicated team of 300+ highly
              trained professionals, we deliver projects from concept to completion
              — on time, on budget, and to the highest standards of quality and
              safety.
            </p>
          </div>
        </div>

        {/* Mission / Vision cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 mt-12 md:mt-16">
          <article className="bg-brand-gray-100 border-t-2 border-brand-red p-8 md:p-10 flex flex-col gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-red">
              Our Mission
            </span>
            <p className="font-['Inter_Display',sans-serif] text-[16px] md:text-[17px] leading-[1.7] text-brand-gray-700">
              To deliver innovative, safe, and efficient demolition solutions that
              exceed client expectations while maintaining the highest standards of
              quality, professionalism, and environmental responsibility. We are
              committed to building long-term client relationships based on trust
              and performance.
            </p>
          </article>

          <article className="bg-brand-gray-100 border-t-2 border-brand-red p-8 md:p-10 flex flex-col gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-red">
              Our Vision
            </span>
            <p className="font-['Inter_Display',sans-serif] text-[16px] md:text-[17px] leading-[1.7] text-brand-gray-700">
              To be recognised as the leading specialist demolition contractor in
              the Middle East region, setting industry benchmarks for safety,
              innovation, and operational excellence.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
