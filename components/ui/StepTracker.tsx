const steps = ["Fill", "Preview", "Download"];

export function StepTracker() {
  return (
    <ol className="flex flex-wrap gap-2" aria-label="Document generation steps">
      {steps.map((step, index) => (
        <li
          key={step}
          className="inline-flex min-h-9 items-center rounded-full bg-white px-3 text-[13px] font-medium text-secondary ring-1 ring-slate-200"
        >
          <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary-light text-[12px] text-primary">
            {index + 1}
          </span>
          {step}
        </li>
      ))}
    </ol>
  );
}
