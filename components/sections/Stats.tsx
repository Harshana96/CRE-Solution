"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import Container from "@/components/ui/Container";
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

export default function Stats({ tone = "light" }: { tone?: "light" | "dark" }) {
  const isDark = tone === "dark";

  return (
    <section className={cn("py-16", isDark ? "bg-brand-ink" : "bg-brand-light")}>
      <Container>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-6">
          {company.stats.map((stat) => (
            <div
              key={stat.label}
              className={cn(
                "border-l-2 pl-5",
                isDark ? "border-brand-red/60" : "border-brand-red"
              )}
            >
              <div
                className={cn(
                  "font-heading text-4xl font-extrabold sm:text-5xl",
                  isDark ? "text-white" : "text-brand-ink"
                )}
              >
                <Counter value={stat.value} />
              </div>
              <div
                className={cn(
                  "mt-2 text-xs font-semibold uppercase tracking-[0.1em]",
                  isDark ? "text-white/55" : "text-brand-muted"
                )}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
