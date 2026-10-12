"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { company } from "@/data/company";
import { cn } from "@/lib/utils";

function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState("0");

  const match = value.match(/^([\d.]+)(.*)$/);
  const target = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const decimals = match && match[1].includes(".") ? match[1].split(".")[1].length : 0;

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();

    let frame: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay((target * eased).toFixed(decimals));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, decimals]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

export default function Stats({
  tone = "light",
  highlight = false,
}: {
  tone?: "light" | "dark";
  /** Projects page only — makes the strip stand out as boxed, elevated cards. */
  highlight?: boolean;
}) {
  const isDark = tone === "dark";

  return (
    <section className={cn("py-16", isDark ? "bg-brand-ink" : "bg-brand-light")}>
      <Container>
        <div className={cn("grid grid-cols-2 lg:grid-cols-4", highlight ? "gap-5" : "gap-8 lg:gap-6")}>
          {company.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div
                className={cn(
                  highlight
                    ? "rounded-xl border-t-4 border-brand-red bg-white p-6 shadow-[0_20px_44px_-24px_rgba(11,15,20,0.28)] transition-transform duration-200 hover:-translate-y-1"
                    : cn("border-l-2 pl-5", isDark ? "border-brand-red/60" : "border-brand-red")
                )}
              >
                <div
                  className={cn(
                    "font-heading font-extrabold",
                    highlight
                      ? "text-4xl text-brand-ink sm:text-5xl lg:text-[3.25rem]"
                      : cn("text-4xl sm:text-5xl", isDark ? "text-white" : "text-brand-ink")
                  )}
                >
                  <Counter value={stat.value} />
                </div>
                <div
                  className={cn(
                    "mt-2 text-xs font-semibold uppercase tracking-[0.1em]",
                    highlight ? "text-brand-muted" : isDark ? "text-white/55" : "text-brand-muted"
                  )}
                >
                  {stat.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
