const steps = ["Fill", "Preview", "Download"];

export function StepTracker({ activeStep = 0 }: { activeStep?: number }) {
  return (
    <ol
      className="flex flex-nowrap items-center gap-2 overflow-x-auto pb-1 sm:gap-3"
      aria-label="Document generation steps"
    >
      {steps.map((step, index) => (
        <li
          key={step}
          aria-current={index === activeStep ? "step" : undefined}
          className="flex shrink-0 items-center gap-2 sm:gap-3"
        >
          <span
            className={
              index <= activeStep
                ? "inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-[14px] font-extrabold text-white transition-all sm:h-11 sm:w-11 sm:text-[18px]"
                : "inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-line bg-white text-[14px] font-extrabold text-secondary transition-all sm:h-11 sm:w-11 sm:text-[18px]"
            }
          >
            {index < activeStep ? (
              <svg aria-hidden="true" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="none">
                <path d="m5 12 4 4L19 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
              </svg>
            ) : (
              index + 1
            )}
          </span>
          <span
            className={
              index <= activeStep
                ? "text-[14px] font-extrabold text-body transition-colors sm:text-[20px]"
                : "text-[14px] font-medium text-secondary transition-colors sm:text-[20px]"
            }
          >
            Step {index + 1} · {step}
          </span>
          {index < steps.length - 1 ? <span className="hidden h-px w-12 bg-line sm:inline-block" /> : null}
        </li>
      ))}
    </ol>
  );
}
