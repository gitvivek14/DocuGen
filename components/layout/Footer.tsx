import Link from "next/link";

const links = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xl text-[13px] text-secondary">
          We don&apos;t store, sell, or see your document data.
        </p>
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-4 text-[13px] text-secondary">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  className="hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
