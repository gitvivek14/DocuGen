import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-[#213127] focus:ring-primary disabled:bg-line disabled:text-secondary",
  secondary:
    "border-2 border-body bg-white text-body hover:bg-body hover:text-white focus:ring-primary disabled:border-line disabled:text-secondary",
  ghost:
    "bg-transparent text-primary hover:bg-primary-light focus:ring-primary disabled:text-secondary"
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
        "inline-flex min-h-12 items-center justify-center rounded-lg px-5 text-[15px] font-semibold transition active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed",
        variants[variant],
        fullWidth && "w-full",
        className
      )}
      {...props}
    />
  );
}
