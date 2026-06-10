import type { Metadata } from "next";
import { baseMetadata } from "@/lib/seo/site";

export const metadata: Metadata = baseMetadata({
  title: "Privacy",
  description: "DocuGen privacy policy for browser-only document generation.",
  path: "/privacy"
});

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-[22px] font-medium text-body">Privacy</h1>
      <div className="mt-4 space-y-4 rounded-card border border-slate-200 bg-white p-5 text-[14px] text-secondary shadow-soft">
        <p>
          Your data stays in your browser. The free DocuGen tools generate PDFs locally and do not
          send document form values to an API route, database, or storage service.
        </p>
        <p>
          We do not store, sell, or see your document data. You can close the page or clear the form
          to remove entered details from your current browser session.
        </p>
        <p>
          Basic website hosting or analytics, if added later, must not include document field
          values. Premium checkout is a placeholder in this MVP and is not connected to Stripe.
        </p>
      </div>
    </main>
  );
}
