import type { MetadataRoute } from "next";
import { RENT_SEO_REGIONS } from "@/data/rentRegions";
import { BILL_OF_SALE_SEO_STATES } from "@/data/usStates";
import { absoluteUrl } from "@/lib/seo/site";

const staticRoutes = [
  "/",
  "/rent-receipt-generator",
  "/vehicle-bill-of-sale-generator",
  "/faq",
  "/privacy",
  "/terms",
  "/about",
  "/contact"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const dynamicRoutes = [
    ...RENT_SEO_REGIONS.map((region) => `/rent-receipt-generator/${region.slug}`),
    ...BILL_OF_SALE_SEO_STATES.map((state) => `/vehicle-bill-of-sale-generator/${state.slug}`)
  ];

  return [...staticRoutes, ...dynamicRoutes].map((route) => ({
    url: absoluteUrl(route),
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7
  }));
}
