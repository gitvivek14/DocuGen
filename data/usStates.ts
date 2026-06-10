import { slugify } from "@/lib/utils";
import type { BillOfSaleStateConfig } from "@/types/billOfSale";

const statePairs = [
  ["Alabama", "AL"],
  ["Alaska", "AK"],
  ["Arizona", "AZ"],
  ["Arkansas", "AR"],
  ["California", "CA"],
  ["Colorado", "CO"],
  ["Connecticut", "CT"],
  ["Delaware", "DE"],
  ["Florida", "FL"],
  ["Georgia", "GA"],
  ["Hawaii", "HI"],
  ["Idaho", "ID"],
  ["Illinois", "IL"],
  ["Indiana", "IN"],
  ["Iowa", "IA"],
  ["Kansas", "KS"],
  ["Kentucky", "KY"],
  ["Louisiana", "LA"],
  ["Maine", "ME"],
  ["Maryland", "MD"],
  ["Massachusetts", "MA"],
  ["Michigan", "MI"],
  ["Minnesota", "MN"],
  ["Mississippi", "MS"],
  ["Missouri", "MO"],
  ["Montana", "MT"],
  ["Nebraska", "NE"],
  ["Nevada", "NV"],
  ["New Hampshire", "NH"],
  ["New Jersey", "NJ"],
  ["New Mexico", "NM"],
  ["New York", "NY"],
  ["North Carolina", "NC"],
  ["North Dakota", "ND"],
  ["Ohio", "OH"],
  ["Oklahoma", "OK"],
  ["Oregon", "OR"],
  ["Pennsylvania", "PA"],
  ["Rhode Island", "RI"],
  ["South Carolina", "SC"],
  ["South Dakota", "SD"],
  ["Tennessee", "TN"],
  ["Texas", "TX"],
  ["Utah", "UT"],
  ["Vermont", "VT"],
  ["Virginia", "VA"],
  ["Washington", "WA"],
  ["West Virginia", "WV"],
  ["Wisconsin", "WI"],
  ["Wyoming", "WY"]
] as const;

const seoStateSlugs = new Set([
  "texas",
  "california",
  "florida",
  "new-york",
  "georgia",
  "ohio",
  "north-carolina",
  "michigan",
  "pennsylvania",
  "illinois"
]);

const overrideNotes: Record<string, Partial<BillOfSaleStateConfig>> = {
  texas: {
    dmvLabel: "Texas Department of Motor Vehicles",
    officialLinkPlaceholder: "https://www.txdmv.gov/",
    note: "Texas buyers and sellers commonly keep a signed bill of sale with title transfer records."
  },
  california: {
    dmvLabel: "California DMV",
    officialLinkPlaceholder: "https://www.dmv.ca.gov/",
    note: "California transactions may require additional DMV forms along with a bill of sale."
  },
  florida: {
    dmvLabel: "Florida Highway Safety and Motor Vehicles",
    officialLinkPlaceholder: "https://www.flhsmv.gov/",
    note: "Florida sellers should confirm title transfer and odometer requirements before completing a sale."
  },
  "new-york": {
    dmvLabel: "New York DMV",
    officialLinkPlaceholder: "https://dmv.ny.gov/",
    note: "New York vehicle sales may require state-specific forms in addition to a private bill of sale."
  },
  georgia: {
    dmvLabel: "Georgia Department of Revenue",
    officialLinkPlaceholder: "https://dor.georgia.gov/",
    note: "Georgia buyers should verify county tag office requirements before registration."
  },
  ohio: {
    dmvLabel: "Ohio BMV",
    officialLinkPlaceholder: "https://www.bmv.ohio.gov/",
    note: "Ohio private vehicle sales should include complete seller, buyer, VIN, and odometer details."
  },
  "north-carolina": {
    dmvLabel: "North Carolina DMV",
    officialLinkPlaceholder: "https://www.ncdot.gov/dmv/",
    note: "North Carolina buyers and sellers should confirm notarization and title transfer requirements."
  },
  michigan: {
    dmvLabel: "Michigan Department of State",
    officialLinkPlaceholder: "https://www.michigan.gov/sos/",
    note: "Michigan sellers should keep a signed copy for personal records after title transfer."
  },
  pennsylvania: {
    dmvLabel: "Pennsylvania DMV",
    officialLinkPlaceholder: "https://www.dmv.pa.gov/",
    note: "Pennsylvania private sales often require title work through an authorized agent."
  },
  illinois: {
    dmvLabel: "Illinois Secretary of State",
    officialLinkPlaceholder: "https://www.ilsos.gov/",
    note: "Illinois buyers should check title, tax, and registration steps before use."
  }
};

export const US_STATES: BillOfSaleStateConfig[] = statePairs.map(
  ([name, abbreviation]) => {
    const slug = slugify(name);
    const base: BillOfSaleStateConfig = {
      name,
      abbreviation,
      slug,
      dmvLabel: `${name} motor vehicle agency`,
      officialLinkPlaceholder: "Official DMV link placeholder",
      note: `Check ${name} motor vehicle requirements before using this template.`
    };
    const override = overrideNotes[slug] ?? {};
    return {
      ...base,
      ...override,
      h1: `${name} vehicle bill of sale generator`,
      intro: `Create a clean ${name} vehicle bill of sale PDF in your browser. Fill seller, buyer, vehicle, odometer, and sale details, then download instantly.`,
      faqs: [
        {
          question: `Is this ${name} bill of sale stored online?`,
          answer: "No. DocuGen generates the PDF in your browser and does not upload your form details."
        },
        {
          question: `Do I still need to check ${name} DMV rules?`,
          answer:
            "Yes. This is a general template, and state or county requirements can change."
        }
      ]
    };
  }
);

export const TOP_US_STATE_NAMES = ["Texas", "California", "Florida"];

export const BILL_OF_SALE_SEO_STATES = US_STATES.filter((state) =>
  seoStateSlugs.has(state.slug)
);

export function getStateBySlug(slug: string) {
  return US_STATES.find((state) => state.slug === slug);
}

export function getStateByName(name: string) {
  return US_STATES.find((state) => state.name === name);
}
