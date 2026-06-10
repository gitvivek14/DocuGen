import type { RentRegionConfig } from "@/types/rentReceipt";

const indiaFaqs = (city: string) => [
  {
    question: `Can I use this rent receipt for HRA in ${city}?`,
    answer:
      "You can use the generated receipt as a clean template, but your employer may ask for additional proof or landlord PAN details."
  },
  {
    question: "Is my rent receipt data uploaded?",
    answer:
      "No. DocuGen creates the PDF in your browser and does not send your form data to a server."
  }
];

const canadaFaqs = (province: string) => [
  {
    question: `Can I create a rent receipt for ${province}?`,
    answer:
      "Yes. The tool creates a general rent receipt template with province-specific page copy."
  },
  {
    question: "Should I check local tenancy rules?",
    answer:
      "Yes. This template is for convenience and should be checked against local tenancy requirements."
  }
];

export const RENT_SEO_REGIONS: RentRegionConfig[] = [
  "Mumbai",
  "Delhi",
  "Bengaluru",
  "Hyderabad",
  "Pune",
  "Chennai"
].map((city) => ({
  slug: city.toLowerCase(),
  displayName: city,
  country: "India",
  regionType: "city",
  h1: `${city} rent receipt generator`,
  intro: `Create a clean rent receipt PDF for ${city} with India-specific HRA, PAN, and revenue stamp notes. Your data stays in your browser.`,
  officialLinkLabel: "Official tax guidance",
  officialLinkPlaceholder: "Check Indian tax or employer guidance before filing",
  faqs: indiaFaqs(city)
}));

RENT_SEO_REGIONS.push(
  ...[
    ["Ontario", "ontario"],
    ["British Columbia", "british-columbia"],
    ["Alberta", "alberta"],
    ["Quebec", "quebec"]
  ].map(([province, slug]) => ({
    slug,
    displayName: province,
    country: "Canada" as const,
    regionType: "province" as const,
    h1: `${province} rent receipt generator`,
    intro: `Create a clean rent receipt PDF for ${province}. Fill landlord, tenant, property, rent, and payment details, then download instantly.`,
    officialLinkLabel: "Official tenancy guidance",
    officialLinkPlaceholder: "Check official provincial tenancy guidance before use",
    faqs: canadaFaqs(province)
  }))
);

export function getRentRegionBySlug(slug: string) {
  return RENT_SEO_REGIONS.find((region) => region.slug === slug);
}
