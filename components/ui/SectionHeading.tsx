"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  className,
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const isLight = tone === "light";
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "max-w-2xl",
        isCenter && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-brand-red",
            isCenter && "justify-center"
          )}
        >
          {/* Draws in left-to-right the first time it scrolls into view —
              the small red dash every section eyebrow uses site-wide. */}
          <motion.span
            className="h-[3px] w-6 origin-left rounded-full bg-brand-red"
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          {eyebrow}
        </div>
      )}
      <h2
        className={cn(
          "mt-4 text-3xl font-extrabold leading-[1.1] sm:text-4xl lg:text-[2.75rem]",
          isLight ? "text-white" : "text-brand-ink"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            isLight ? "text-white/70" : "text-brand-muted"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
