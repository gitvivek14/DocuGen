import type { Metadata } from "next";
import { baseMetadata } from "@/lib/seo/site";

export const metadata: Metadata = baseMetadata({
  title: "Contact",
  description: "Contact DocuGen for feedback and support.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-[22px] font-medium text-body">Contact</h1>
      <div className="mt-4 space-y-4 rounded-card border border-slate-200 bg-white p-5 text-[14px] text-secondary shadow-soft">
        <p>
          For feedback, template requests, or support questions, contact the DocuGen team at{" "}
          <a className="font-medium text-primary underline" href="mailto:hello@docugen.example">
            hello@docugen.example
          </a>
          .
        </p>
        <p>
          Do not email sensitive document details unless you are comfortable sharing them outside
          the browser.
        </p>
      </div>
    </main>
  );
}
