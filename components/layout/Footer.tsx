import Link from "next/link";

const columns = [
  {
    title: "Tools",
    links: [
      { href: "/rent-receipt-generator", label: "Rent Receipt Generator" },
      { href: "/vehicle-bill-of-sale-generator", label: "Vehicle Bill of Sale" }
    ]
  },
  {
    title: "Popular locations",
    links: [
      { href: "/rent-receipt-generator/mumbai", label: "Rent Receipt Mumbai" },
      { href: "/rent-receipt-generator/delhi", label: "Rent Receipt Delhi" },
      { href: "/rent-receipt-generator/ontario", label: "Rent Receipt Ontario" },
      { href: "/vehicle-bill-of-sale-generator/texas", label: "Bill of Sale Texas" },
      { href: "/vehicle-bill-of-sale-generator/california", label: "Bill of Sale California" }
    ]
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/faq", label: "FAQ" },
      { href: "/pricing", label: "Pricing" }
    ]
  }
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-page">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1.2fr_2fr]">
        <div>
          <Link href="/" className="text-[22px] font-extrabold text-body">
            DocuGen
          </Link>
          <p className="mt-3 max-w-sm text-[15px] text-secondary">
            Privacy-first document tools. We don&apos;t store, sell, or see your data. Every PDF is
            generated entirely in your browser.
          </p>
        </div>
        <nav className="grid gap-7 sm:grid-cols-3" aria-label="Footer navigation">
          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-[12px] font-bold uppercase tracking-[0.18em] text-rust">
                {column.title}
              </h2>
              <ul className="mt-3 space-y-2 text-[14px] text-secondary">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link className="hover:text-primary" href={link.href}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-[13px] text-secondary sm:flex-row sm:justify-between">
          <p>© 2026 DocuGen — Built for document peace of mind.</p>
          <p>Not legal advice. Always consult your local tax / motor authority.</p>
        </div>
      </div>
    </footer>
  );
}
