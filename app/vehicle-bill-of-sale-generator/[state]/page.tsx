import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { VehicleBillOfSaleTool } from "@/components/tools/VehicleBillOfSaleTool";
import { FAQBlock } from "@/components/ui/FAQBlock";
import { BILL_OF_SALE_SEO_STATES, getStateBySlug } from "@/data/usStates";
import { baseMetadata, faqJsonLd } from "@/lib/seo/site";

type PageProps = {
  params: Promise<{
    state: string;
  }>;
};

export function generateStaticParams() {
  return BILL_OF_SALE_SEO_STATES.map((state) => ({ state: state.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state: slug } = await params;
  const state = getStateBySlug(slug);
  if (!state) {
    return {};
  }

  return baseMetadata({
    title: state.h1 ?? `${state.name} vehicle bill of sale generator`,
    description:
      state.intro ??
      `Create a clean ${state.name} vehicle bill of sale PDF in your browser.`,
    path: `/vehicle-bill-of-sale-generator/${state.slug}`
  });
}

export default async function VehicleBillOfSaleStatePage({ params }: PageProps) {
  const { state: slug } = await params;
  const state = getStateBySlug(slug);
  if (!state) notFound();

  const faqs = state.faqs ?? [];

  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <VehicleBillOfSaleTool stateConfig={state} />
      <FAQBlock faqs={faqs} />
    </>
  );
}
