import type { Metadata } from "next";
import Link from "next/link";
import { baseMetadata } from "@/lib/seo/site";

export const metadata: Metadata = baseMetadata({
  title: "Pricing",
  description: "Explore the next DocuGen document workflow.",
  path: "/pricing"
});

export default function PricingPage() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-6 py-16 text-center sm:px-8 sm:py-24">
        <p className="dg-eyebrow justify-center before:hidden">Pricing</p>
        <h1 className="mx-auto mt-6 max-w-4xl text-[38px] font-extrabold leading-[1.04] tracking-tight text-body sm:text-[58px]">
          Something powerful is almost ready.
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-[18px] leading-8 text-secondary">
          More document workflows are being polished for people who want cleaner files in fewer
          clicks.
        </p>
        <div className="mt-10 flex justify-center">
          <Link
            className="inline-flex min-h-14 items-center justify-center rounded-xl bg-primary px-8 text-[17px] font-extrabold text-white"
            href="/rent-receipt-generator"
          >
            Start with a free document →
          </Link>
        </div>
      </section>
    </main>
  );
}
