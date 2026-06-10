export type RentCountry = "India" | "US" | "Canada" | "UK" | "Australia";

export type ReceiptMode = "monthly" | "quarterly";

export interface RentReceiptFormValues {
  country: RentCountry;
  region: string;
  landlordName: string;
  landlordAddress: string;
  landlordPan?: string;
  tenantName: string;
  tenantAddress: string;
  monthlyRent: number;
  currency: string;
  rentStartDate: string;
  rentEndDate: string;
  paymentMethod: string;
  propertyAddress: string;
  receiptDate: string;
  receiptMode: ReceiptMode;
  includeRevenueStampNote: boolean;
  includeHraNote: boolean;
  bulkMonths: number;
}

export interface RentRegionConfig {
  slug: string;
  displayName: string;
  country: RentCountry;
  regionType: "city" | "province";
  h1: string;
  intro: string;
  officialLinkLabel: string;
  officialLinkPlaceholder: string;
  faqs: Array<{ question: string; answer: string }>;
}
