// Local fallback for the `rentalCategory` documents in Sanity. Rendered verbatim
// when Sanity is unconfigured or has no rentalCategory docs.
// Field names mirror sanity/schemas/rentalCategory.ts — keep the two in step.
export type RentalCategoryDetail = {
  id: string;
  title: string;
  image: string;
  description: string;
};

/** Default destination for a category card when the doc sets no ctaLink. */
export const RENTAL_CARD_DEFAULT_LINK = "/contact?inquiry=Equipment+Rental";

export const rentalCategoriesData: RentalCategoryDetail[] = [
  {
    id: "robotic-demolition-machines",
    title: "Robotic Demolition Machines",
    image: "/rental-robotic-demolition.jpeg",
    description:
      "Brokk 500, 400, 300, and 160 alongside Husqvarna DXR series. Remote-operated, emission-free machines built for confined spaces, high-precision structural work, and environments inaccessible to conventional plant.",
  },
  {
    id: "excavators",
    title: "Excavators",
    image: "/rental-excavators.jpeg",
    description:
      "13 to 50-tonne excavators for structural demolition, bulk dig, and site clearance across the GCC. Every machine supplied with a trained, site-inducted operator and full safety documentation.",
  },
  {
    id: "mini-excavators",
    title: "Mini Excavators",
    image: "/rental-mini-excavators.jpeg",
    description:
      "Compact 1.5 to 6-tonne machines designed for tight access, basement strip-outs, and congested urban sites where larger plant cannot operate safely.",
  },
  {
    id: "skid-steers",
    title: "Skid Steers",
    image: "/rental-skid-steers.jpeg",
    description:
      "Wheeled and tracked skid steers for debris handling, grading, and site preparation. Fast to mobilise, easy to manoeuvre in restricted yards and below-grade structures.",
  },
  {
    id: "wheel-loaders",
    title: "Wheel Loaders",
    image: "/rental-wheel-loaders.jpeg",
    description:
      "Heavy-duty front loaders for bulk material handling, aggregate loading, and spoil removal. Available with a range of bucket configurations to match your programme.",
  },
  {
    id: "waste-removal",
    title: "Waste Removal",
    image: "/rental-waste-removal.jpeg",
    description:
      "Roll-on/roll-off skips and tipper lorries for demolition rubble, concrete spoil, and mixed construction waste. Scheduled collections or on-call, sized to your output.",
  },
];
