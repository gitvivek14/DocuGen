import type { Metadata } from "next";
import { baseMetadata } from "@/lib/seo/site";

export const metadata: Metadata = baseMetadata({
  title: "Terms",
  description: "Terms for using DocuGen document templates.",
  path: "/terms"
});

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-[22px] font-medium text-body">Terms</h1>
      <div className="mt-4 space-y-4 rounded-card border border-slate-200 bg-white p-5 text-[14px] text-secondary shadow-soft">
        <p>
          DocuGen provides general document templates for convenience. The templates are not legal,
          tax, employment, DMV, or financial advice.
        </p>
        <p>
          You are responsible for checking your local authority, employer, DMV, or legal
          requirements before using any generated document.
        </p>
        <p>
          Free PDF downloads are provided without watermark. Premium features shown in the
          interface may change.
        </p>
      </div>
    </main>
  );
}
