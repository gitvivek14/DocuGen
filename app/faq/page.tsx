import type { Metadata } from "next";
import { FAQBlock } from "@/components/ui/FAQBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { billOfSaleFaqs, homepageFaqs, rentReceiptFaqs } from "@/data/faq";
import { baseMetadata, faqJsonLd } from "@/lib/seo/site";

const faqs = [...homepageFaqs, ...rentReceiptFaqs, ...billOfSaleFaqs];

export const metadata: Metadata = baseMetadata({
  title: "FAQ",
  description: "Answers about DocuGen privacy, PDF downloads, validation, and document templates.",
  path: "/faq"
});

export default function FAQPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-[22px] font-medium text-body">FAQ</h1>
        <p className="mt-2 max-w-3xl text-[14px] text-secondary">
          Common questions about DocuGen&apos;s privacy-first document tools.
        </p>
      </main>
      <FAQBlock faqs={faqs} title="Questions and answers" />
    </>
  );
}
