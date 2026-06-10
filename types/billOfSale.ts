export interface BillOfSaleFormValues {
  state: string;
  sellerName: string;
  sellerAddress: string;
  sellerContact?: string;
  buyerName: string;
  buyerAddress: string;
  buyerContact?: string;
  vehicleYear: number;
  vehicleMake: string;
  vehicleModel: string;
  bodyType: string;
  color: string;
  vin: string;
  licensePlate?: string;
  odometer: number;
  salePrice: number;
  saleDate: string;
  paymentMethod: string;
  asIs: boolean;
}

export interface BillOfSaleStateConfig {
  name: string;
  abbreviation: string;
  slug: string;
  dmvLabel: string;
  officialLinkPlaceholder: string;
  note: string;
  h1?: string;
  intro?: string;
  faqs?: Array<{ question: string; answer: string }>;
}
