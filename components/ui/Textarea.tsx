import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, id, label, error, helperText, rows = 3, ...props }, ref) => {
    const inputId = id ?? props.name;
    const messageId = error ? `${inputId}-error` : helperText ? `${inputId}-help` : undefined;

    return (
      <div className="space-y-1">
        <label className="block text-[13px] font-medium text-body" htmlFor={inputId}>
          {label}
        </label>
        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
          aria-invalid={Boolean(error)}
          aria-describedby={messageId}
          className={cn(
            "w-full rounded-card border border-slate-300 bg-white px-3 py-2 text-[13px] text-body outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary-light",
            error && "border-error focus:border-error focus:ring-red-100",
            className
          )}
          {...props}
        />
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

Textarea.displayName = "Textarea";
