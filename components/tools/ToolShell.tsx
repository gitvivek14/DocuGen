import type { ReactNode } from "react";
import { TrustBar } from "@/components/layout/TrustBar";
import { StepTracker } from "@/components/ui/StepTracker";

export function ToolShell({
  title,
  description,
  form,
  preview,
  cta,
  note,
  eyebrow = "Tool",
  activeStep = 0
}: {
  title: string;
  description: string;
  form: ReactNode;
  preview: ReactNode;
  cta: ReactNode;
  note?: ReactNode;
  eyebrow?: string;
  activeStep?: number;
}) {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <p className="dg-eyebrow">{eyebrow}</p>
        <h1 className="mt-5 max-w-3xl text-[34px] font-extrabold leading-[1.06] tracking-tight text-body sm:text-[48px]">
          {title}
        </h1>
        <p className="mt-5 max-w-3xl text-[18px] leading-8 text-secondary">{description}</p>
        {note ? <div className="mt-4 max-w-3xl text-[14px] text-secondary">{note}</div> : null}
      </section>
      <TrustBar />

      <section className="mx-auto max-w-6xl px-4 py-8">
        <StepTracker activeStep={activeStep} />
      </section>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
        <div className="space-y-5">
          {form}
          {cta}
        </div>

        <aside className="lg:sticky lg:top-4">
          <details className="dg-card p-4 lg:hidden" open={activeStep > 0}>
            <summary className="cursor-pointer text-[15px] font-bold text-body">
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
