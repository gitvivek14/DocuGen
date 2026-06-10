import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { RentReceiptTool } from "@/components/tools/RentReceiptTool";
import { FAQBlock } from "@/components/ui/FAQBlock";
import { rentReceiptFaqs } from "@/data/faq";
import { baseMetadata, faqJsonLd } from "@/lib/seo/site";

export const metadata: Metadata = baseMetadata({
  title: "Rent receipt generator",
  description:
    "Create a clean rent receipt PDF with live preview, country-aware currency, and no signup. Your data stays in your browser.",
  path: "/rent-receipt-generator"
});

export default function RentReceiptGeneratorPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(rentReceiptFaqs)} />
      <RentReceiptTool />
      <FAQBlock faqs={rentReceiptFaqs} />
    </>
  );
}
