import Link from "next/link";

const navItems = [
  { href: "/rent-receipt-generator", label: "Rent Receipt" },
  { href: "/vehicle-bill-of-sale-generator", label: "Bill of Sale" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" }
];

export function Header() {
  return (
    <header className="border-b border-line bg-page/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-[18px] font-extrabold text-body focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="DocuGen home"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
            <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none">
              <path d="M8 4h8l2 2v14H6V4h2Z" stroke="currentColor" strokeWidth="2" />
              <path d="M9 10h6M9 14h6M9 18h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          <span>DocuGen</span>
        </Link>
        <nav className="hidden sm:block" aria-label="Primary navigation">
          <ul className="flex flex-wrap gap-5">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  className="inline-flex min-h-10 items-center text-[14px] tracking-wide text-secondary transition hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <details className="relative sm:hidden">
          <summary className="inline-flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-lg text-body marker:hidden">
            <span className="sr-only">Open navigation menu</span>
            <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </summary>
          <nav
            className="absolute right-0 top-12 z-20 w-56 rounded-xl border border-line bg-white p-3 shadow-soft"
            aria-label="Mobile navigation"
          >
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link className="block rounded-lg px-3 py-2 text-[14px] text-secondary hover:bg-paper hover:text-primary" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </details>
      </div>
    </header>
  );
}
