import { z } from "zod";

const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const countryValues = ["India", "US", "Canada", "UK", "Australia"] as const;

export const rentReceiptSchema = z
  .object({
    country: z.enum(countryValues),
    region: z.string().trim().min(1, "Select or enter a region"),
    landlordName: z.string().trim().min(1, "Enter landlord name"),
    landlordAddress: z.string().trim().min(1, "Enter landlord address"),
    landlordPan: z.string().trim().optional(),
    tenantName: z.string().trim().min(1, "Enter tenant name"),
    tenantAddress: z.string().trim().min(1, "Enter tenant address"),
    monthlyRent: z.coerce.number().positive("Enter monthly rent amount"),
    currency: z.string().trim().min(1, "Currency is required"),
    rentStartDate: z.string().trim().min(1, "Enter rent period start date"),
    rentEndDate: z.string().trim().min(1, "Enter rent period end date"),
    paymentMethod: z.string().trim().min(1, "Select a payment method"),
    receiptNo: z.string().trim().min(1, "Enter receipt number"),
    propertyAddress: z.string().trim().min(1, "Enter property address"),
    receiptDate: z.string().trim().min(1, "Enter receipt date"),
    receiptMode: z.enum(["monthly", "quarterly"]),
    includeRevenueStampNote: z.boolean(),
    includeHraNote: z.boolean(),
    bulkMonths: z.coerce.number().min(1).max(12)
  })
  .superRefine((data, ctx) => {
    if (data.country === "India") {
      if (!data.landlordPan) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Enter landlord PAN for India receipts",
          path: ["landlordPan"]
        });
      } else if (!panRegex.test(data.landlordPan.toUpperCase())) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "PAN must look like ABCDE1234F",
          path: ["landlordPan"]
        });
      }
    }
  });

export type RentReceiptSchema = z.infer<typeof rentReceiptSchema>;
