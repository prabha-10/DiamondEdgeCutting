// Category subpages were removed — every entry now points to the main
// /rental-equipment page.
export const rentalCategories = [
  { name: "Robotic Demolition Machines", href: "/rental-equipment" },
  { name: "Excavators", href: "/rental-equipment" },
  { name: "Mini Excavators", href: "/rental-equipment" },
  { name: "Skid Steers", href: "/rental-equipment" },
  { name: "Wheel Loaders", href: "/rental-equipment" },
  { name: "Waste Removal", href: "/rental-equipment" },
];

export const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "Demolition Services", href: "/demolition-services" },
  { name: "Rental Equipment", href: "/rental-equipment", dropdown: rentalCategories },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];
