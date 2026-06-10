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
        <label className="block text-[12px] font-bold uppercase tracking-[0.16em] text-secondary" htmlFor={inputId}>
          {label}
        </label>
        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
          aria-invalid={Boolean(error)}
          aria-describedby={messageId}
          className={cn(
            "w-full border-0 border-b border-line bg-transparent px-0 py-2 text-[16px] text-body outline-none transition placeholder:text-secondary/60 focus:border-primary focus:ring-0",
            error && "border-error focus:border-error",
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
