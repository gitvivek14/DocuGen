import type { Metadata } from "next";
import Link from "next/link";
import { TrustBar } from "@/components/layout/TrustBar";
import { ToolCard } from "@/components/ui/ToolCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { homepageFaqs } from "@/data/faq";
import { baseMetadata, faqJsonLd } from "@/lib/seo/site";

export const metadata: Metadata = baseMetadata({
  title: "Paperwork that actually takes a minute",
  description:
    "Fill, preview, and download clean PDFs instantly. No signup, no watermark, and document data stays in your browser.",
  path: "/"
});

const tools = [
  {
    title: "Rent Receipt Generator",
    description:
      "India HRA compliant. Monthly, quarterly, or 12-month bundles. Country-aware fields for IN, US, CA, UK, AU.",
    href: "/rent-receipt-generator"
  },
  {
    title: "Vehicle Bill of Sale Generator",
    description:
      "State-specific US bill of sale. Real-time 17-character VIN validation, federal odometer disclosure, DMV-ready output.",
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
  {
    title: "Truly private",
    text: "PDFs are built in your browser with jsPDF. Your name, PAN, VIN never leave your device.",
    icon: "shield"
  },
  {
    title: "Zero friction",
    text: "No accounts, no email capture, no waiting room. Land, fill, download in under 60 seconds.",
    icon: "bolt"
  },
  {
    title: "Localized fields",
    text: "Indian PAN, Canadian province, US state - fields adapt the moment you pick a country.",
    icon: "globe"
  },
  {
    title: "Clean free PDFs",
    text: "No watermarks on free downloads. Pay only if you need bulk receipts or a premium template.",
    icon: "download"
  },
  {
    title: "HRA compliant",
    text: "Indian tax season ready: PAN field, revenue stamp space, quarterly bundle option.",
    icon: "document"
  },
  {
    title: "DMV ready",
    text: "Federal odometer disclosure + state-specific 'as-is' language. Notary line included.",
    icon: "vehicle"
  }
];

function FeatureIcon({ type }: { type: string }) {
  const paths: Record<string, string[]> = {
    shield: ["M12 3 19 6v5c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-3Z"],
    bolt: ["m13 2-8 12h7l-1 8 8-12h-7l1-8Z"],
    globe: [
      "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z",
      "M3.6 9h16.8M3.6 15h16.8M12 3c2.2 2.4 3.4 5.4 3.4 9S14.2 18.6 12 21c-2.2-2.4-3.4-5.4-3.4-9S9.8 5.4 12 3Z"
    ],
    download: ["M12 3v11M7 10l5 5 5-5", "M5 19h14"],
    document: ["M7 3h7l3 3v15H7V3Z", "M14 3v4h4M9 12h6M9 16h6"],
    vehicle: ["M5 15h14l-2-5H7l-2 5Z", "M7 15v2M17 15v2M8 17h.01M16 17h.01"]
  };

  return (
    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-page text-primary sm:h-14 sm:w-14">
      <svg aria-hidden="true" className="h-6 w-6 sm:h-7 sm:w-7" viewBox="0 0 24 24" fill="none">
        {(paths[type] ?? paths.document).map((path) => (
          <path
            key={path}
            d={path}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        ))}
      </svg>
    </span>
  );
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(homepageFaqs)} />
      <main>
        <section className="border-b border-line">
          <div className="px-6 py-14 sm:px-8 sm:py-20 lg:px-10">
            <p className="dg-eyebrow">DocuGen</p>
            <h1 className="mt-6 max-w-4xl text-[40px] font-extrabold leading-[1.02] tracking-tight text-body sm:text-[64px]">
              Paperwork that <em className="font-extrabold text-primary">actually</em> takes a
              minute.
            </h1>
            <p className="mt-6 max-w-3xl text-[18px] leading-8 text-secondary">
              Two precise tools. No sign-up, no watermark, no servers. Fill it out, get a clean
              PDF, walk away.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/rent-receipt-generator"
                className="inline-flex min-h-14 items-center justify-center rounded-lg bg-primary px-7 text-[16px] font-bold text-white transition hover:bg-[#213127]"
              >
                Rent Receipt Generator →
              </Link>
              <Link
                href="/vehicle-bill-of-sale-generator"
                className="inline-flex min-h-14 items-center justify-center rounded-lg border-2 border-body bg-white px-7 text-[16px] font-bold text-body transition hover:bg-body hover:text-white"
              >
                Vehicle Bill of Sale →
              </Link>
            </div>
          </div>
        </section>
        <TrustBar />

        <section className="px-6 py-14 sm:px-8 lg:px-10" aria-labelledby="tools-heading">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <ToolCard key={tool.title} {...tool} />
            ))}
          </div>
        </section>

        <section
          className="border-y border-line bg-paper/60 px-6 py-12 sm:px-8 sm:py-16 lg:px-10"
          aria-labelledby="features-heading"
        >
          <div>
            <h2
              id="features-heading"
              className="max-w-4xl text-[36px] font-extrabold leading-[1.04] tracking-tight text-body sm:text-[56px]"
            >
              We fixed what other generators got wrong.
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {differences.map((item) => (
                <div key={item.title} className="dg-card p-5 sm:p-6">
                  <FeatureIcon type={item.icon} />
                  <h3 className="mt-6 text-[20px] font-extrabold tracking-tight text-body">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[16px] leading-7 text-secondary">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-line bg-page px-6 py-20 text-center sm:px-8 sm:py-28 lg:px-10" aria-labelledby="seo-heading">
          <div>
            <h2 id="seo-heading" className="mx-auto max-w-5xl text-[36px] font-extrabold leading-[1.05] tracking-tight text-body sm:text-[56px]">
              Done in the time it takes to refill your coffee.
            </h2>
            <div className="mx-auto mt-6 max-w-3xl space-y-3 text-[18px] leading-8 text-secondary">
              <p>
                Pick a tool, fill it, download. That&apos;s it.
              </p>
            </div>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link className="inline-flex min-h-14 items-center justify-center rounded-xl bg-primary px-8 text-[17px] font-extrabold text-white" href="/rent-receipt-generator">
                Start a rent receipt →
              </Link>
              <Link className="inline-flex min-h-14 items-center justify-center rounded-xl border-2 border-body bg-white px-8 text-[17px] font-extrabold text-body" href="/vehicle-bill-of-sale-generator">
                Start a bill of sale
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
