"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface EmptyStateHelperProps {
  categoryName: string;
}

export function EmptyStateHelper({ categoryName }: EmptyStateHelperProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-brand-gray-300 rounded-xl bg-brand-gray-50/50">
      <h3 className="text-xl font-bold text-brand-gray-900 mb-4">
        More models coming soon
      </h3>
      <p className="text-brand-gray-700 max-w-sm mb-8 leading-relaxed font-medium">
        We have additional {categoryName} models available. Contact us for the full fleet list, technical specs, and availability.
      </p>
      <Link 
        href="/contact"
        className="inline-flex items-center gap-2 text-brand-red font-bold hover:gap-3 transition-all"
      >
        Contact our hire team
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
