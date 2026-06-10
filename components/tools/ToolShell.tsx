import type { ReactNode } from "react";
import { StepTracker } from "@/components/ui/StepTracker";

export function ToolShell({
  title,
  description,
  form,
  preview,
  cta,
  note
}: {
  title: string;
  description: string;
  form: ReactNode;
  preview: ReactNode;
  cta: ReactNode;
  note?: ReactNode;
}) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <section className="mb-6 space-y-3">
        <h1 className="text-[22px] font-medium leading-tight text-body">{title}</h1>
        <p className="max-w-3xl text-[14px] text-secondary">{description}</p>
        <p className="text-[13px] font-medium text-primary">Your data stays in your browser.</p>
        <StepTracker />
        {note ? <div className="max-w-3xl text-[13px] text-secondary">{note}</div> : null}
      </section>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
        <div className="space-y-5">
          {form}
          {cta}
        </div>

        <aside className="lg:sticky lg:top-4">
          <details className="rounded-card border border-slate-200 bg-white p-4 lg:hidden">
            <summary className="cursor-pointer text-[15px] font-medium text-body">
              Live preview
            </summary>
            <div className="mt-4">{preview}</div>
          </details>
          <div className="hidden lg:block">{preview}</div>
        </aside>
      </div>
    </main>
  );
}
