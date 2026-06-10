const items = [
  {
    label: "No signup needed",
    path: "M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M18 8v6M15 11h6"
  },
  {
    label: "Data stays on your device",
    path: "M7 10V7a5 5 0 0 1 10 0v3M6 10h12v10H6V10Z"
  },
  {
    label: "Instant PDF",
    path: "m13 2-8 12h7l-1 8 8-12h-7l1-8Z"
  }
];

export function TrustBar() {
  return (
    <div className="border-y border-line bg-page">
      <div className="mx-auto grid max-w-6xl grid-cols-3 gap-2 px-4 py-4 text-[12px] text-body sm:text-[13px]">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-center gap-2 text-center">
            <svg aria-hidden="true" className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none">
              <path d={item.path} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
