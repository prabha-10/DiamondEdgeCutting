import React from "react";
import { EditorialSectionHead } from "./editorial/EditorialSectionHead";

// Block 1 from the client's homepage spec. Section head + two-column body
// (prose + core services list on the left, credential rows on the right).

const coreServices = [
  "Controlled and Structural Demolition",
  "Robotic Demolition",
  "Wire sawing",
  "Wall, track, and floor sawing",
  "Core drilling",
  "Tunnelling, refinery, kiln works",
  "Soft demolition and enabling works",
  "Specialist plant and equipment rental",
];

type Credential = { key: string; value: React.ReactNode };

const credentials: Credential[] = [
  { key: "Established", value: <>1997 <span className="text-brand-red">·</span> Ireland</> },
  { key: "UAE Operations", value: <>Since <em className="font-display italic text-brand-red not-italic">2008</em></> },
  { key: "Workforce", value: <>300<em className="font-display italic text-brand-red not-italic">+</em> Specialists</> },
  { key: "Approval", value: <>DM <em className="font-display italic text-brand-red not-italic">G+12</em></> },
  { key: "Certifications", value: <>ISO 9001 <span className="text-brand-red">·</span> 14001 <span className="text-brand-red">·</span> 45001</> },
  { key: "Coverage", value: "6 GCC Countries" },
];

export function Overview() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <EditorialSectionHead
          number="01"
          eyebrow="Company Overview"
          title={
            <>
              Specialists.
              <br />
              <em>Not generalists.</em>
            </>
          }
          lede="Diamond Edge Cutting is a leading specialist demolition contractor delivering safe, precise, and efficient solutions across all sectors of the construction industry."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mt-14 md:mt-20">
          {/* Prose + core services */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <p className="font-['Inter_Display',sans-serif] text-[17px] md:text-[18px] leading-[1.65] text-brand-gray-700">
              DEC established operations in the United Arab Emirates in 2008, building on more than
              15 years of prior experience across Ireland and Europe. We have successfully partnered
              with major developers, main contractors, and consultants across the region on complex
              and technically challenging projects.
            </p>
            <p className="font-['Inter_Display',sans-serif] text-[17px] md:text-[18px] leading-[1.65] text-brand-gray-700">
              Using advanced technology and modern methodologies, we execute both light and heavy
              demolition projects with speed, accuracy, and uncompromising safety standards. With a
              dedicated team of 300+ highly trained professionals, we deliver projects from concept
              to completion, on time, on budget, and to the highest standards of quality and safety.
            </p>

            <div className="mt-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-red">
                Core services
              </span>
              <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
                {coreServices.map((s) => (
                  <li
                    key={s}
                    className="flex items-baseline gap-3 font-sans text-[15.5px] text-brand-gray-900"
                  >
                    <span aria-hidden className="text-brand-red shrink-0 select-none text-[20px] leading-none">
                      •
                    </span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Credential rows */}
          <div className="lg:col-span-5 flex flex-col border-t border-brand-gray-300">
            {credentials.map(({ key, value }) => (
              <div
                key={key}
                className="flex flex-1 items-center justify-between gap-6 py-4 border-b border-brand-gray-300"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand-gray-500">
                  {key}
                </span>
                <span className="font-display font-bold text-brand-gray-900 text-[20px] md:text-[22px] uppercase tracking-tight text-right">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
