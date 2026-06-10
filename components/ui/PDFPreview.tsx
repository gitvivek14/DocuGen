import type { ReactNode } from "react";

export function PDFPreview({
  title,
  children,
  footer
}: {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="rounded-card border border-slate-200 bg-white p-5 shadow-soft">
      <div className="border-b border-slate-200 pb-3">
        <p className="text-[13px] font-semibold text-primary">DocuGen</p>
        <h2 className="mt-1 text-[18px] font-medium text-body">{title}</h2>
      </div>
      <div className="mt-4 space-y-3 text-[13px] text-body">{children}</div>
      {footer ? (
        <div className="mt-5 border-t border-slate-200 pt-3 text-[12px] text-secondary">
          {footer}
        </div>
      ) : null}
    </div>
  );
}
