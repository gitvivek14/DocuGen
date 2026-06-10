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
    <div className="dg-card bg-white p-6">
      <div className="border-b border-line pb-4">
        <p className="text-[13px] font-extrabold text-primary">DocuGen</p>
        <h2 className="mt-1 text-[22px] font-extrabold tracking-tight text-body">{title}</h2>
      </div>
      <div className="mt-5 space-y-3 text-[14px] text-body">{children}</div>
      {footer ? (
        <div className="mt-5 border-t border-line pt-4 text-[13px] text-secondary">
          {footer}
        </div>
      ) : null}
    </div>
  );
}
