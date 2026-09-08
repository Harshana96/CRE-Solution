import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline-dark" | "outline-light" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-red text-white shadow-[0_3px_0_var(--color-brand-red-dark)] hover:shadow-[0_4px_0_var(--color-brand-red-dark)] hover:-translate-y-px",
  "outline-dark":
    "border-2 border-brand-ink text-brand-ink hover:bg-brand-ink hover:text-white",
  "outline-light":
    "border-2 border-white/50 text-white hover:bg-white/10",
  ghost: "text-brand-ink hover:text-brand-red",
};

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: Variant;
  className?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  className,
  disabled,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-md px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none",
    variantClasses[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
