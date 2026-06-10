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
    <div className="dg-card flex h-full flex-col p-6 transition hover:-translate-y-0.5 hover:border-primary">
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-full bg-primary-light px-3 py-1 text-[12px] font-bold text-primary">
          {comingSoon ? "Soon" : "Free"}
        </span>
        {comingSoon ? (
          <span className="rounded-full bg-paper px-2 py-1 text-[12px] text-secondary">
            Planned
          </span>
        ) : null}
      </div>
      <h2 className="mt-5 text-[21px] font-extrabold leading-tight tracking-tight text-body">
        {title}
      </h2>
      <p className="mt-3 flex-1 text-[15px] text-secondary">{description}</p>
      <p className="mt-5 text-[14px] font-bold text-primary">
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
