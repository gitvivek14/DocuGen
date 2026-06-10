import Link from "next/link";

export function ToolCard({
  title,
  description,
  href,
  comingSoon
}: {
  title: string;
  description: string;
  href?: string;
  comingSoon?: boolean;
}) {
  const body = (
    <div className="flex h-full flex-col rounded-card border border-slate-200 bg-white p-4 shadow-soft transition hover:border-primary">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-[18px] font-medium text-body">{title}</h2>
        {comingSoon ? (
          <span className="rounded-full bg-slate-100 px-2 py-1 text-[12px] text-secondary">
            Coming soon
          </span>
        ) : null}
      </div>
      <p className="mt-2 flex-1 text-[14px] text-secondary">{description}</p>
      <p className="mt-4 text-[13px] font-medium text-primary">
        {comingSoon ? "Planned" : "Open tool"}
      </p>
    </div>
  );

  if (!href || comingSoon) {
    return <div aria-disabled="true">{body}</div>;
  }

  return (
    <Link
      href={href}
      className="block h-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
    >
      {body}
    </Link>
  );
}
