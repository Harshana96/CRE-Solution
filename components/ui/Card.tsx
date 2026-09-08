import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function Card({
  children,
  className,
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-brand-line bg-white p-7 transition-all duration-200",
        hover && "hover:-translate-y-1 hover:border-brand-red/40 hover:shadow-[0_20px_40px_-20px_rgba(11,15,20,0.25)]",
        className
      )}
    >
      {children}
    </div>
  );
}
