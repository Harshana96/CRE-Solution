import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function Badge({
  children,
  tone = "red",
  className,
}: {
  children: ReactNode;
  tone?: "red" | "dark" | "light";
  className?: string;
}) {
  const toneClasses = {
    red: "bg-brand-red-soft text-brand-red-dark",
    dark: "bg-brand-ink text-white",
    light: "bg-white/10 text-white border border-white/20",
  }[tone];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider",
        toneClasses,
        className
      )}
    >
      {children}
    </span>
  );
}
