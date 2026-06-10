import type { Metadata } from "next";
import { baseMetadata } from "@/lib/seo/site";

export const metadata: Metadata = baseMetadata({
  title: "About",
  description: "About DocuGen, a privacy-first document generator platform.",
  path: "/about"
});

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-[22px] font-medium text-body">About</h1>
      <div className="mt-4 space-y-4 rounded-card border border-slate-200 bg-white p-5 text-[14px] text-secondary shadow-soft">
        <p>
          DocuGen is a utility hub for simple document generation. The MVP focuses on fast,
          account-free forms with live previews and clean PDF downloads.
        </p>
        <p>
          The platform is built so additional tools can share the same components, validation
          patterns, SEO scaffolding, and browser-only PDF generation approach.
        </p>
      </div>
    </main>
  );
}
