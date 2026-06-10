import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  helperText?: string;
  options: Array<{ label: string; value: string }>;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, id, label, error, helperText, options, ...props }, ref) => {
    const selectId = id ?? props.name;
    const messageId = error ? `${selectId}-error` : helperText ? `${selectId}-help` : undefined;

    return (
      <div className="space-y-1">
        <label className="block text-[13px] font-medium text-body" htmlFor={selectId}>
          {label}
        </label>
        <select
          ref={ref}
          id={selectId}
          aria-invalid={Boolean(error)}
          aria-describedby={messageId}
          className={cn(
            "min-h-11 w-full rounded-card border border-slate-300 bg-white px-3 text-[13px] text-body outline-none transition focus:border-primary focus:ring-2 focus:ring-primary-light",
            error && "border-error focus:border-error focus:ring-red-100",
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error ? (
          <p id={messageId} className="text-[12px] text-error">
            {error}
          </p>
        ) : helperText ? (
          <p id={messageId} className="text-[12px] text-secondary">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Select.displayName = "Select";
