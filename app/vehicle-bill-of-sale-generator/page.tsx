import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { VehicleBillOfSaleTool } from "@/components/tools/VehicleBillOfSaleTool";
import { FAQBlock } from "@/components/ui/FAQBlock";
import { billOfSaleFaqs } from "@/data/faq";
import { baseMetadata, faqJsonLd } from "@/lib/seo/site";

export const metadata: Metadata = baseMetadata({
  title: "Vehicle bill of sale generator",
  description:
    "Create a clean US vehicle bill of sale PDF with VIN validation, odometer disclosure, live preview, and no signup.",
  path: "/vehicle-bill-of-sale-generator"
});

export default function VehicleBillOfSaleGeneratorPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(billOfSaleFaqs)} />
      <VehicleBillOfSaleTool />
      <FAQBlock faqs={billOfSaleFaqs} />
    </>
  );
}
