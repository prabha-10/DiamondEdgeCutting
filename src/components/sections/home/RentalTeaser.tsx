import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { 
  Bot, 
  Wrench, 
  Tractor, 
  Settings2, 
  Hammer, 
  Truck, 
  Loader, 
  Trash2 
} from "lucide-react";

const rentalCategories = [
  { icon: Bot, name: "Robotic Demolition Machines", href: "/rental-equipment/robotic-demolition-machines" },
  { icon: Wrench, name: "Brokk and DXR Attachments", href: "/rental-equipment/robotic-attachments" },
  { icon: Tractor, name: "Excavators", href: "/rental-equipment/excavators" },
  { icon: Settings2, name: "Excavator Attachments", href: "/rental-equipment/excavator-attachments" },
  { icon: Hammer, name: "Mini Excavators", href: "/rental-equipment/mini-excavators" },
  { icon: Loader, name: "Skid Steers", href: "/rental-equipment/skid-steers" },
  { icon: Truck, name: "Wheel Loaders", href: "/rental-equipment/wheel-loaders" },
  { icon: Trash2, name: "Waste Removal Skips and Lorries", href: "/rental-equipment/waste-removal" },
];

export function RentalTeaser() {
  return (
    <section className="py-32 bg-brand-gray-900 text-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-20 border-b border-white/10 pb-16">
          <div className="max-w-3xl">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-none">
              Equipment Rental
            </h2>
            <p className="text-xl text-brand-gray-300 font-medium leading-relaxed max-w-2xl">
              Hire from the GCC's largest specialist demolition fleet. From Brokk robotic demolition machines to 26-metre long-reach excavators, all operator-ready.
            </p>
          </div>
          <Button asChild variant="brand" size="lg" className="shrink-0">
            <Link href="/rental-equipment">Browse Fleet</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {rentalCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link 
                key={index} 
                href={category.href}
                className="group py-6 border-t border-white/10 hover:border-brand-red transition-colors flex flex-col gap-6"
              >
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white group-hover:bg-brand-red group-hover:scale-110 transition-all">
                  <Icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <span className="font-bold text-xl tracking-tight text-brand-gray-100 group-hover:text-white transition-colors">
                  {category.name}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  );
}
