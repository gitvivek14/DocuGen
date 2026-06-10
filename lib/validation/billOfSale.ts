import { z } from "zod";

const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/;

export const billOfSaleSchema = z.object({
  state: z.string().trim().min(1, "Select a state"),
  sellerName: z.string().trim().min(1, "Enter seller name"),
  sellerAddress: z.string().trim().min(1, "Enter seller address"),
  sellerContact: z.string().trim().optional(),
  buyerName: z.string().trim().min(1, "Enter buyer name"),
  buyerAddress: z.string().trim().min(1, "Enter buyer address"),
  buyerContact: z.string().trim().optional(),
  vehicleYear: z.coerce
    .number()
    .int("Enter a valid year")
    .min(1900, "Year must be 1900 or later")
    .max(new Date().getFullYear() + 1, "Year is too far in the future"),
  vehicleMake: z.string().trim().min(1, "Enter vehicle make"),
  vehicleModel: z.string().trim().min(1, "Enter vehicle model"),
  bodyType: z.string().trim().min(1, "Enter body type"),
  color: z.string().trim().min(1, "Enter color"),
  vin: z
    .string()
    .trim()
    .transform((value) => value.toUpperCase())
    .refine((value) => value.length === 17, "VIN must be 17 characters")
    .refine((value) => vinRegex.test(value), "VIN cannot include I, O, or Q"),
  licensePlate: z.string().trim().optional(),
  odometer: z.coerce.number().nonnegative("Enter odometer reading"),
  salePrice: z.coerce.number().positive("Enter sale price"),
  saleDate: z.string().trim().min(1, "Enter sale date"),
  paymentMethod: z.string().trim().min(1, "Select a payment method"),
  asIs: z.boolean()
});

export type BillOfSaleSchema = z.infer<typeof billOfSaleSchema>;
