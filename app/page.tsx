import type { Metadata } from "next";
import { FAQBlock } from "@/components/ui/FAQBlock";
import { ToolCard } from "@/components/ui/ToolCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { homepageFaqs } from "@/data/faq";
import { baseMetadata, faqJsonLd } from "@/lib/seo/site";

export const metadata: Metadata = baseMetadata({
  title: "Free document generators that respect your privacy",
  description:
    "Fill, preview, and download clean PDFs instantly. No signup, no watermark, and document data stays in your browser.",
  path: "/"
});

const tools = [
  {
    title: "Rent Receipt Generator",
    description: "Create rent receipts with country-aware currency, India HRA notes, and live PDF preview.",
    href: "/rent-receipt-generator"
  },
  {
    title: "Vehicle Bill of Sale Generator",
    description: "Generate a clean US vehicle bill of sale with VIN validation and odometer disclosure.",
    href: "/vehicle-bill-of-sale-generator"
  },
  {
    title: "Merge PDF",
    description: "Combine multiple PDF files in your browser.",
    comingSoon: true
  },
  {
    title: "Split PDF",
    description: "Extract pages from PDF files without uploading them.",
    comingSoon: true
  },
  {
    title: "Compress PDF",
    description: "Reduce PDF file size with simple local controls.",
    comingSoon: true
  },
  {
    title: "Image to PDF",
    description: "Turn images into a clean PDF document.",
    comingSoon: true
  }
];

const differences = [
  "No signup",
  "No watermark",
  "Client-side PDF generation",
  "Smart local fields",
  "Mobile-first"
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(homepageFaqs)} />
      <main>
        <section className="mx-auto max-w-6xl px-4 py-10">
          <div className="max-w-3xl">
            <h1 className="text-[22px] font-medium leading-tight text-body">
              Free document generators that respect your privacy
            </h1>
            <p className="mt-3 text-[14px] text-secondary">
              Fill, preview, and download clean PDFs instantly. No signup. No watermark.
            </p>
            <p className="mt-3 text-[13px] font-medium text-primary">
              Your data stays in your browser.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-6" aria-labelledby="tools-heading">
          <h2 id="tools-heading" className="text-[18px] font-medium text-body">
            Document tools
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <ToolCard key={tool.title} {...tool} />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-10" aria-labelledby="features-heading">
          <h2 id="features-heading" className="text-[18px] font-medium text-body">
            Why DocuGen is different
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {differences.map((item) => (
              <div key={item} className="rounded-card border border-slate-200 bg-white p-4 shadow-soft">
                <p className="text-[14px] font-medium text-body">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-10" aria-labelledby="seo-heading">
          <div className="rounded-card border border-slate-200 bg-white p-5 shadow-soft">
            <h2 id="seo-heading" className="text-[18px] font-medium text-body">
              Clean utility documents without account friction
            </h2>
            <div className="mt-3 space-y-3 text-[14px] text-secondary">
              <p>
                DocuGen is built for everyday documents that should be quick, readable, and easy to
                download. Each MVP tool keeps form data on the device and creates the PDF in the
                browser.
              </p>
              <p>
                The platform is structured around reusable templates, shared validation, regional
                content, and SEO-friendly routes so new document utilities can be added without
                changing the privacy-first flow.
              </p>
            </div>
          </div>
        </section>
      </main>
      <FAQBlock faqs={homepageFaqs} />
    </>
  );
}
