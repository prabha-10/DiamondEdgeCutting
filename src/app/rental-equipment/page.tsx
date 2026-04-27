import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CheckCircle2 } from "lucide-react";
import { equipmentCategories } from "@/data/equipment";

export const metadata: Metadata = {
  title: "Demolition Equipment Rental Dubai | Brokk, Excavators, Skid Steers",
  description: "Rent specialist demolition equipment across Dubai and UAE. Brokk robotic machines, mini excavators, skid steers, wheel loaders, waste removal. Operators included.",
};

export default function RentalEquipmentPage() {
  return (
    <>
      <section className="relative pt-48 pb-32 bg-brand-gray-100 overflow-hidden border-b border-brand-gray-300">
        <div className="container relative z-20 mx-auto px-4 md:px-8">
          <div className="max-w-5xl">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-brand-gray-900 mb-12 leading-[0.9] tracking-tighter">
              Equipment Rental.
            </h1>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-t border-brand-gray-300 pt-12">
              <p className="text-2xl md:text-3xl text-brand-gray-700 max-w-2xl font-medium leading-relaxed">
                From the GCC's largest robotic demolition fleet to mini excavators and waste removal, hire operator-ready equipment for projects of any scale.
              </p>
              <Button asChild variant="brand" size="lg" className="shrink-0">
                <Link href="/contact">Request Equipment</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-white border-b border-brand-gray-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            <div className="lg:col-span-4">
              <h2 className="text-4xl md:text-5xl font-bold text-brand-gray-900 tracking-tight">Why Rent From DEC</h2>
            </div>
            
            <div className="lg:col-span-8 flex flex-col gap-12">
              <div className="flex flex-col md:flex-row gap-6 md:gap-12 border-b border-brand-gray-100 pb-12">
                <h3 className="text-3xl md:text-4xl font-bold text-brand-gray-900 tracking-tight w-full md:w-1/2">Trained operators included</h3>
                <p className="text-xl text-brand-gray-700 font-medium w-full md:w-1/2 mt-2 md:mt-0">All operators HSE-certified, ISO 45001-compliant.</p>
              </div>
              <div className="flex flex-col md:flex-row gap-6 md:gap-12 border-b border-brand-gray-100 pb-12">
                <h3 className="text-3xl md:text-4xl font-bold text-brand-gray-900 tracking-tight w-full md:w-1/2">Maintained to standard</h3>
                <p className="text-xl text-brand-gray-700 font-medium w-full md:w-1/2 mt-2 md:mt-0">Daily checks, monthly servicing, full asset register.</p>
              </div>
              <div className="flex flex-col md:flex-row gap-6 md:gap-12 border-b border-brand-gray-100 pb-12">
                <h3 className="text-3xl md:text-4xl font-bold text-brand-gray-900 tracking-tight w-full md:w-1/2">Project-flexible terms</h3>
                <p className="text-xl text-brand-gray-700 font-medium w-full md:w-1/2 mt-2 md:mt-0">Hourly, daily, weekly, monthly, or full-project hire.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {equipmentCategories.map((category) => (
              <Link 
                key={category.id} 
                href={`/rental-equipment/${category.id}`}
                className="group flex flex-col border-t border-brand-gray-300 pt-6"
              >
                <div className="aspect-[4/3] bg-brand-gray-100 overflow-hidden relative mb-6">
                  <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
                    <span className="text-brand-gray-500 font-mono text-sm tracking-widest uppercase">[Image: {category.name}]</span>
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-brand-gray-900 mb-4 group-hover:text-brand-red transition-colors tracking-tight">
                  {category.name}
                </h3>
                <p className="text-brand-gray-700 text-lg font-medium leading-relaxed">
                  {category.overview}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-brand-gray-900 text-white text-center">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight leading-none">
            Need Equipment Fast?
          </h2>
          <p className="text-xl md:text-2xl text-brand-gray-300 mb-12 font-medium leading-relaxed">
            Tell us your project scope, location, and dates. We'll come back with availability, pricing, and operator options within 24 hours.
          </p>
          <Button asChild variant="brand" size="lg">
            <Link href="/contact">Request Quote</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
