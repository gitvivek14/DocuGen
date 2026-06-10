import type { ReactNode } from "react";

export function UpgradeCard({
  title,
  description,
  children
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-card border border-cta bg-cta-light p-4">
      <h3 className="text-[15px] font-medium text-body">{title}</h3>
      <p className="mt-1 text-[13px] text-secondary">{description}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
}
