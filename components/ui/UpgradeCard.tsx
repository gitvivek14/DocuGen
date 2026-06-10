export function UpgradeCard({
  title,
  description,
  priceLabel = "Early access",
  actionLabel = "Upgrade"
}: {
  title: string;
  description: string;
  priceLabel?: string;
  actionLabel?: string;
}) {
  return (
    <div className="dg-card flex gap-4 p-5 sm:p-6">
      <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-rust text-white">
        <svg aria-hidden="true" className="h-7 w-7" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3 10.4 8.4 5 10l5.4 1.6L12 17l1.6-5.4L19 10l-5.4-1.6L12 3Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            d="M19 15v4M17 17h4M5 4v3M3.5 5.5h3"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <h3 className="text-[20px] font-extrabold leading-tight tracking-tight text-body">
            {title}
          </h3>
          <p className="shrink-0 text-[16px] font-extrabold text-primary">{priceLabel}</p>
        </div>
        <p className="mt-3 max-w-2xl text-[16px] leading-7 text-secondary">{description}</p>
        <button
          type="button"
          disabled
          className="mt-4 inline-flex cursor-not-allowed items-center gap-3 text-[17px] font-extrabold text-rust opacity-65"
        >
          {actionLabel}
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
