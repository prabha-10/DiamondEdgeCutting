"use client";

import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, CheckCircle2, Loader2, Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useInquiry } from "./InquiryProvider";
import { rentalFormSchema, RentalFormData } from "@/lib/rental-form-schema";
import { equipmentItems } from "@/lib/equipment-data";
import { DemolitionButton } from "@/components/ui/DemolitionButton";
import { cn } from "@/lib/utils";

export function InquiryModal() {
  const { 
    isModalOpen, 
    closeModal, 
    modalMode, 
    modalSingleItem, 
    items, 
    clearItems 
  } = useInquiry();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RentalFormData>({
    resolver: zodResolver(rentalFormSchema),
    defaultValues: {
      equipment: [],
      operatorRequired: "all",
      rentalDuration: "Weekly",
      projectStart: "Within 1 month",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "equipment",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);

  // Filter equipment based on search
  const filteredEquipment = equipmentItems.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !watch("equipment").some(e => e.id === item.id)
  );

  // Sync modal items with inquiry basket if in multi mode
  useEffect(() => {
    if (isModalOpen) {
      if (modalMode === "multi") {
        setValue("equipment", items.map(i => ({ id: i.id, title: i.title })));
      } else if (modalMode === "single" && modalSingleItem) {
        setValue("equipment", [{ id: modalSingleItem.id, title: modalSingleItem.title }]);
      }
      setIsSuccess(false);
      setError(null);
    }
  }, [isModalOpen, modalMode, modalSingleItem, items, setValue]);

  const onSubmit = async (data: RentalFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/rental-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit inquiry");
      }

      setIsSuccess(true);
      if (modalMode === "multi") {
        clearItems();
      }
      
      // Auto close after 3 seconds
      setTimeout(() => {
        closeModal();
      }, 3000);
    } catch (err) {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeModal}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-6 border-b border-brand-gray-100 flex items-center justify-between bg-brand-gray-50/50">
          <div>
            <h2 className="text-2xl font-bold text-brand-gray-900">
              {isSuccess ? "Inquiry Sent" : "Send your inquiry"}
            </h2>
            <p className="text-sm text-brand-gray-500 font-medium">
              {isSuccess 
                ? "We'll be in touch within 24 hours." 
                : "Tell us about your project and equipment needs."}
            </p>
          </div>
          <button 
            onClick={closeModal}
            className="p-2 rounded-full hover:bg-brand-gray-200 transition-colors"
          >
            <X className="w-6 h-6 text-brand-gray-500" />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {isSuccess ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-brand-gray-900 mb-2">Thank you!</h3>
              <p className="text-brand-gray-600 max-w-sm">
                Your inquiry has been received. Our hire team will review your requirements and contact you with a detailed quote.
              </p>
              <DemolitionButton
                variant="secondary"
                onClick={closeModal}
                className="mt-8"
              >
                Close
              </DemolitionButton>
            </div>
          ) : (
            <form id="rental-inquiry-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {error && (
                <div className="p-4 bg-brand-red/5 border border-brand-red/20 rounded-lg text-brand-red text-sm font-medium">
                  {error}
                </div>
              )}

              {/* Honeypot */}
              <input type="hidden" {...register("website")} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-gray-900">Full Name *</label>
                  <input
                    {...register("fullName")}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-brand-red outline-none transition-all",
                      errors.fullName ? "border-brand-red" : "border-brand-gray-300"
                    )}
                    placeholder="John Doe"
                  />
                  {errors.fullName && (
                    <p className="text-xs text-brand-red font-medium">{errors.fullName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-gray-900">Company *</label>
                  <input
                    {...register("company")}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-brand-red outline-none transition-all",
                      errors.company ? "border-brand-red" : "border-brand-gray-300"
                    )}
                    placeholder="Company Ltd"
                  />
                  {errors.company && (
                    <p className="text-xs text-brand-red font-medium">{errors.company.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-gray-900">Email *</label>
                  <input
                    type="email"
                    {...register("email")}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-brand-red outline-none transition-all",
                      errors.email ? "border-brand-red" : "border-brand-gray-300"
                    )}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-xs text-brand-red font-medium">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-gray-900">Phone *</label>
                  <input
                    type="tel"
                    {...register("phone")}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-brand-red outline-none transition-all",
                      errors.phone ? "border-brand-red" : "border-brand-gray-300"
                    )}
                    placeholder="+971 50 000 0000"
                  />
                  {errors.phone && (
                    <p className="text-xs text-brand-red font-medium">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-gray-900">Project Location *</label>
                <input
                  {...register("projectLocation")}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-brand-red outline-none transition-all",
                    errors.projectLocation ? "border-brand-red" : "border-brand-gray-300"
                  )}
                  placeholder="e.g. Dubai Marina, UAE"
                />
                {errors.projectLocation && (
                  <p className="text-xs text-brand-red font-medium">{errors.projectLocation.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-gray-900">Rental Duration *</label>
                  <select
                    {...register("rentalDuration")}
                    className="w-full px-4 py-3 rounded-lg border border-brand-gray-300 focus:ring-2 focus:ring-brand-red outline-none bg-white font-medium"
                  >
                    <option value="Hourly">Hourly</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Full project">Full project</option>
                    <option value="Not sure">Not sure</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-gray-900">Project Start *</label>
                  <select
                    {...register("projectStart")}
                    className="w-full px-4 py-3 rounded-lg border border-brand-gray-300 focus:ring-2 focus:ring-brand-red outline-none bg-white font-medium"
                  >
                    <option value="Immediate">Immediate</option>
                    <option value="Within 1 month">Within 1 month</option>
                    <option value="Within 3 months">Within 3 months</option>
                    <option value="Beyond 3 months">Beyond 3 months</option>
                    <option value="Not sure">Not sure</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-brand-gray-900">Operator Required *</label>
                <div className="flex flex-wrap gap-6">
                  {["all", "none", "some"].map((val) => (
                    <label key={val} className="flex items-center gap-2 cursor-pointer group">
                      <div className="relative flex items-center justify-center">
                        <input
                          type="radio"
                          value={val}
                          {...register("operatorRequired")}
                          className="sr-only"
                        />
                        <div className={cn(
                          "w-5 h-5 rounded-full border-2 transition-all",
                          watch("operatorRequired") === val 
                            ? "border-brand-red bg-brand-red" 
                            : "border-brand-gray-300 group-hover:border-brand-gray-400"
                        )}>
                          {watch("operatorRequired") === val && (
                            <div className="w-2 h-2 rounded-full bg-white absolute inset-0 m-auto" />
                          )}
                        </div>
                      </div>
                      <span className="text-sm font-bold text-brand-gray-700 capitalize">
                        {val === "all" ? "Yes for all" : val === "none" ? "No for any" : "Some (specify in notes)"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-brand-gray-900">Equipment *</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {fields.map((field, index) => (
                    <div 
                      key={field.id}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-gray-100 border border-brand-gray-300 rounded-full group"
                    >
                      <span className="text-xs font-bold text-brand-gray-900">{field.title}</span>
                      <button 
                        type="button" 
                        onClick={() => remove(index)}
                        className="text-brand-gray-400 hover:text-brand-red transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="relative">
                  <div className="flex items-center gap-2 border border-brand-gray-300 rounded-lg px-3 focus-within:ring-2 focus-within:ring-brand-red transition-all">
                    <Plus className="w-4 h-4 text-brand-gray-400" />
                    <input
                      type="text"
                      className="flex-1 py-3 outline-none text-sm font-medium"
                      placeholder="Add more equipment..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowResults(true);
                      }}
                      onFocus={() => setShowResults(true)}
                    />
                  </div>
                  
                  {showResults && searchTerm && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-brand-gray-200 rounded-lg shadow-xl z-10 max-h-48 overflow-y-auto py-2">
                      {filteredEquipment.length > 0 ? (
                        filteredEquipment.map(item => (
                          <button
                            key={item.id}
                            type="button"
                            className="w-full text-left px-4 py-2 hover:bg-brand-gray-50 text-sm font-medium text-brand-gray-900 transition-colors"
                            onClick={() => {
                              append({ id: item.id, title: item.title });
                              setSearchTerm("");
                              setShowResults(false);
                            }}
                          >
                            {item.title}
                          </button>
                        ))
                      ) : (
                        <p className="px-4 py-2 text-xs text-brand-gray-500 italic">No matches found</p>
                      )}
                    </div>
                  )}
                </div>
                {errors.equipment && (
                  <p className="text-xs text-brand-red font-medium">{errors.equipment.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-gray-900">Notes (Optional)</label>
                <textarea
                  {...register("notes")}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-brand-gray-300 focus:ring-2 focus:ring-brand-red outline-none transition-all resize-none"
                  placeholder="Tell us about specific attachments, site constraints, etc."
                />
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        {!isSuccess && (
          <div className="p-6 border-t border-brand-gray-100 bg-brand-gray-50/50">
            <DemolitionButton
              type="submit"
              variant="primary"
              form="rental-inquiry-form"
              disabled={isSubmitting}
              className="w-full py-4 text-lg"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </span>
              ) : (
                "Send Inquiry"
              )}
            </DemolitionButton>
          </div>
        )}
      </motion.div>
    </div>
  );
}
