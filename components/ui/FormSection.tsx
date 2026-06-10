import type { ReactNode } from "react";

export function FormSection({
  title,
  description,
  children
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-card border border-slate-200 bg-card p-4 shadow-soft">
      <div className="mb-4">
        <h2 className="text-[18px] font-medium text-body">{title}</h2>
        {description ? <p className="mt-1 text-[13px] text-secondary">{description}</p> : null}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
