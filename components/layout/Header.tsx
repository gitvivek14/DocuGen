import Link from "next/link";

const navItems = [
  { href: "/rent-receipt-generator", label: "Rent Receipt" },
  { href: "/vehicle-bill-of-sale-generator", label: "Vehicle Bill of Sale" },
  { href: "/faq", label: "FAQ" }
];

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="text-[20px] font-semibold text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="DocuGen home"
        >
          DocuGen
        </Link>
        <nav aria-label="Primary navigation">
          <ul className="flex flex-wrap gap-2 sm:gap-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  className="inline-flex min-h-10 items-center rounded-card px-2 text-[13px] text-secondary hover:bg-primary-light hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
