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
    <section className="dg-card p-6">
      <div className="mb-4">
        <h2 className="text-[12px] font-bold uppercase tracking-[0.18em] text-rust">{title}</h2>
        {description ? <p className="mt-2 text-[14px] text-secondary">{description}</p> : null}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
