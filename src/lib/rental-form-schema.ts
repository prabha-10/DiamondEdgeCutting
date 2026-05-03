import { z } from "zod";

export const rentalFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  projectLocation: z.string().min(3, "Please enter the project location"),
  rentalDuration: z.enum([
    "Hourly",
    "Daily",
    "Weekly",
    "Monthly",
    "Full project",
    "Not sure",
  ], {
    errorMap: () => ({ message: "Please select a rental duration" }),
  }),
  operatorRequired: z.enum(["all", "none", "some"], {
    errorMap: () => ({ message: "Please select an operator option" }),
  }),
  projectStart: z.enum([
    "Immediate",
    "Within 1 month",
    "Within 3 months",
    "Beyond 3 months",
    "Not sure",
  ], {
    errorMap: () => ({ message: "Please select a project start timeframe" }),
  }),
  equipment: z.array(z.object({
    id: z.string(),
    title: z.string(),
  })).min(1, "Please select at least one piece of equipment"),
  notes: z.string().optional(),
  website: z.string().max(0, "Honeypot caught you").optional(), // Honeypot
});

export type RentalFormData = z.infer<typeof rentalFormSchema>;
