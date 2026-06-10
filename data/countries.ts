import type { RentCountry } from "@/types/rentReceipt";

export interface CountryConfig {
  name: RentCountry;
  currency: string;
  currencySymbol: string;
  regionLabel: string;
  rentLabel: string;
  regions: string[];
}

export const COUNTRY_CONFIGS: Record<RentCountry, CountryConfig> = {
  India: {
    name: "India",
    currency: "INR",
    currencySymbol: "₹",
    regionLabel: "City",
    rentLabel: "Monthly rent amount",
    regions: ["Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Pune", "Chennai"]
  },
  US: {
    name: "US",
    currency: "USD",
    currencySymbol: "$",
    regionLabel: "State",
    rentLabel: "Monthly rent amount",
    regions: ["Texas", "California", "Florida", "New York", "Georgia", "Illinois"]
  },
  Canada: {
    name: "Canada",
    currency: "CAD",
    currencySymbol: "$",
    regionLabel: "Province",
    rentLabel: "Monthly rent amount",
    regions: ["Ontario", "British Columbia", "Alberta", "Quebec"]
  },
  UK: {
    name: "UK",
    currency: "GBP",
    currencySymbol: "£",
    regionLabel: "Region",
    rentLabel: "Monthly rent amount",
    regions: ["England", "Scotland", "Wales", "Northern Ireland"]
  },
  Australia: {
    name: "Australia",
    currency: "AUD",
    currencySymbol: "$",
    regionLabel: "State or territory",
    rentLabel: "Monthly rent amount",
    regions: [
      "New South Wales",
      "Victoria",
      "Queensland",
      "Western Australia",
      "South Australia"
    ]
  }
};

export const RENT_COUNTRIES = Object.keys(COUNTRY_CONFIGS) as RentCountry[];

export function getCountryConfig(country: RentCountry) {
  return COUNTRY_CONFIGS[country];
}

export function formatCurrency(amount: number | undefined, country: RentCountry) {
  if (!amount || Number.isNaN(amount)) {
    return `${COUNTRY_CONFIGS[country].currencySymbol}0`;
  }
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: COUNTRY_CONFIGS[country].currency,
    maximumFractionDigits: 2
  }).format(amount);
}
