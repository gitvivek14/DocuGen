import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-cta text-white hover:bg-[#15582f] focus:ring-cta disabled:bg-slate-300 disabled:text-slate-600",
  secondary:
    "border border-primary bg-white text-primary hover:bg-primary-light focus:ring-primary disabled:border-slate-300 disabled:text-slate-500",
  ghost:
    "bg-transparent text-primary hover:bg-primary-light focus:ring-primary disabled:text-slate-500"
};

export function Button({
  className,
  variant = "primary",
  fullWidth,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-card px-4 text-[15px] font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed",
        variants[variant],
        fullWidth && "w-full",
        className
      )}
      {...props}
    />
  );
}
