"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  company: z.string().min(2, "Company name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(6, "Phone number is required"),
  inquiryType: z.string().min(1, "Please select an inquiry type"),
  projectLocation: z.string().optional(),
  projectTimeline: z.string().optional(),
  description: z.string().min(10, "Please provide a brief description"),
  // Honeypot field
  botField: z.string().max(0, "Bot detected").optional()
});

type FormData = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inquiryType: "",
      projectTimeline: "",
      botField: ""
    }
  });

  const onSubmit = async (data: FormData) => {
    if (data.botField) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Form data:", data);
      
      setIsSuccess(true);
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your form. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-brand-gray-50 p-12 text-center">
        <h3 className="text-3xl font-bold text-brand-gray-900 mb-6 tracking-tight">Message Sent</h3>
        <p className="text-brand-gray-700 mb-8 text-lg font-medium">
          Thank you for reaching out. We have received your inquiry and will reply within 24 hours.
        </p>
        <Button onClick={() => setIsSuccess(false)} variant="outline" className="rounded-full h-14 px-8 text-lg">
          Send Another Message
        </Button>
      </div>
    );
  }

  const inputClasses = "w-full bg-transparent border-0 border-b-2 border-brand-gray-300 py-4 text-xl font-medium text-brand-gray-900 focus:ring-0 focus:border-brand-gray-900 focus:outline-none transition-colors placeholder:text-brand-gray-500";
  const errorClasses = "w-full bg-transparent border-0 border-b-2 border-brand-red-dark py-4 text-xl font-medium text-brand-gray-900 focus:ring-0 focus:border-brand-red-dark focus:outline-none transition-colors placeholder:text-brand-gray-500";
  const labelClasses = "block text-sm font-bold text-brand-gray-500 uppercase tracking-widest mb-2";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-12">
      {/* Honeypot */}
      <div className="hidden">
        <label htmlFor="botField">Don't fill this out if you're human:</label>
        <input {...register("botField")} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col">
          <label htmlFor="fullName" className={labelClasses}>Full Name *</label>
          <input 
            {...register("fullName")}
            placeholder="John Doe"
            className={errors.fullName ? errorClasses : inputClasses}
          />
          {errors.fullName && <span className="text-sm font-bold text-brand-red-dark mt-2">{errors.fullName.message}</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="company" className={labelClasses}>Company *</label>
          <input 
            {...register("company")}
            placeholder="Your Company LLC"
            className={errors.company ? errorClasses : inputClasses}
          />
          {errors.company && <span className="text-sm font-bold text-brand-red-dark mt-2">{errors.company.message}</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col">
          <label htmlFor="email" className={labelClasses}>Email *</label>
          <input 
            type="email"
            {...register("email")}
            placeholder="john@company.com"
            className={errors.email ? errorClasses : inputClasses}
          />
          {errors.email && <span className="text-sm font-bold text-brand-red-dark mt-2">{errors.email.message}</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="phone" className={labelClasses}>Phone *</label>
          <input 
            type="tel"
            {...register("phone")}
            placeholder="+971 50 123 4567"
            className={errors.phone ? errorClasses : inputClasses}
          />
          {errors.phone && <span className="text-sm font-bold text-brand-red-dark mt-2">{errors.phone.message}</span>}
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="inquiryType" className={labelClasses}>Inquiry Type *</label>
        <select
          {...register("inquiryType")}
          defaultValue=""
          className={errors.inquiryType ? errorClasses : inputClasses}
        >
          <option value="" disabled>Select an option</option>
          <option value="Demolition Project">Demolition Project</option>
          <option value="Equipment Rental">Equipment Rental</option>
          <option value="Operator Availability">Operator Availability</option>
          <option value="General">General Inquiry</option>
        </select>
        {errors.inquiryType && <span className="text-sm font-bold text-brand-red-dark mt-2">{errors.inquiryType.message}</span>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col">
          <label htmlFor="projectLocation" className={labelClasses}>Project Location</label>
          <input 
            {...register("projectLocation")}
            placeholder="Dubai Marina"
            className={inputClasses}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="projectTimeline" className={labelClasses}>Project Timeline</label>
          <select
            {...register("projectTimeline")}
            defaultValue=""
            className={inputClasses}
          >
            <option value="" disabled>Select a timeline</option>
            <option value="Immediate">Immediate</option>
            <option value="Within 1 month">Within 1 month</option>
            <option value="Within 3 months">Within 3 months</option>
            <option value="Beyond 3 months">Beyond 3 months</option>
            <option value="Not sure">Not sure</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="description" className={labelClasses}>Brief Description *</label>
        <textarea 
          {...register("description")}
          rows={4}
          placeholder="Tell us about your project requirements..."
          className={`resize-none ${errors.description ? errorClasses : inputClasses}`}
        ></textarea>
        {errors.description && <span className="text-sm font-bold text-brand-red-dark mt-2">{errors.description.message}</span>}
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting} className="rounded-full h-16 px-12 text-xl self-start mt-8" variant="brand">
        {isSubmitting ? "Sending..." : "Submit Inquiry"}
      </Button>
    </form>
  );
}
