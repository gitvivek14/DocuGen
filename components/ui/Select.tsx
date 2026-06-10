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
        <label className="block text-[12px] font-bold uppercase tracking-[0.16em] text-secondary" htmlFor={selectId}>
          {label}
        </label>
        <select
          ref={ref}
          id={selectId}
          aria-invalid={Boolean(error)}
          aria-describedby={messageId}
          className={cn(
            "min-h-12 w-full border-0 border-b border-line bg-transparent px-0 text-[16px] text-body outline-none transition focus:border-primary focus:ring-0",
            error && "border-error focus:border-error",
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
