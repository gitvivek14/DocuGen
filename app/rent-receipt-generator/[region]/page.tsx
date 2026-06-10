import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { RentReceiptTool } from "@/components/tools/RentReceiptTool";
import { FAQBlock } from "@/components/ui/FAQBlock";
import { RENT_SEO_REGIONS, getRentRegionBySlug } from "@/data/rentRegions";
import { baseMetadata, faqJsonLd } from "@/lib/seo/site";

type PageProps = {
  params: Promise<{
    region: string;
  }>;
};

export function generateStaticParams() {
  return RENT_SEO_REGIONS.map((region) => ({ region: region.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { region: slug } = await params;
  const region = getRentRegionBySlug(slug);
  if (!region) {
    return {};
  }

  return baseMetadata({
    title: region.h1,
    description: region.intro,
    path: `/rent-receipt-generator/${region.slug}`
  });
}

export default async function RentReceiptRegionPage({ params }: PageProps) {
  const { region: slug } = await params;
  const region = getRentRegionBySlug(slug);
  if (!region) notFound();

  return (
    <>
      <JsonLd data={faqJsonLd(region.faqs)} />
      <RentReceiptTool region={region} />
      <FAQBlock faqs={region.faqs} />
    </>
  );
}
