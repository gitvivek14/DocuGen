import type { ReactNode } from "react";

export function PreviewField({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="grid grid-cols-[120px_minmax(0,1fr)] gap-3 border-b border-slate-100 pb-2 last:border-b-0">
      <dt className="font-medium text-secondary">{label}</dt>
      <dd className="min-w-0 break-words text-body">{value || "Not provided"}</dd>
    </div>
  );
}
