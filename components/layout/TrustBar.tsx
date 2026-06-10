const items = ["No signup", "Data stays on your device", "Instant PDF", "No watermark"];

export function TrustBar() {
  return (
    <div className="border-b border-slate-200 bg-primary-light">
      <div className="mx-auto max-w-6xl px-4 py-2">
        <p className="text-[13px] font-medium text-primary">
          {items.join(" · ")}
        </p>
      </div>
    </div>
  );
}
