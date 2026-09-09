"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { engineeringProcess } from "@/data/solutions";
import { cn } from "@/lib/utils";

// Time between each step starting to draw, and how long one circle's ring
// takes to trace itself. The connecting line's duration/start are derived
// from these so its leading edge reaches each circle exactly as that
// circle begins drawing — see the `lineDuration`/`lineDelay` comment below.
const STEP_DELAY = 0.45;
const CIRCLE_DRAW_DURATION = 0.35;

export default function EngineeringProcess({
  tone = "dark",
  compact = false,
}: {
  tone?: "dark" | "light";
  compact?: boolean;
}) {
  const isDark = tone === "dark";
  const [hovered, setHovered] = useState(false);

  const stepCount = engineeringProcess.length;
  // Line starts just after circle 1 begins, and finishes exactly as the
  // last circle begins — so its progress always matches the circle it's
  // currently passing under.
  const lineDelay = STEP_DELAY * 0.3;
  const lineDuration = STEP_DELAY * (stepCount - 1);

  return (
    <section className={cn("py-24", isDark ? "bg-brand-ink" : "bg-brand-light")}>
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Our Engineering Process"
            title="From concept to continuous support"
            description={
              compact
                ? undefined
                : "A fixed six-stage sequence, followed for every project regardless of scale."
            }
            tone={isDark ? "light" : "dark"}
          />
        </Reveal>

        <div
          className="relative mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <motion.div
            aria-hidden
            className={cn(
              "absolute left-0 right-0 top-[26px] hidden h-px origin-left lg:block",
              isDark ? "bg-white/20" : "bg-brand-red/40"
            )}
            initial={false}
            animate={{ scaleX: hovered ? 1 : 0 }}
            transition={
              hovered
                ? { duration: lineDuration, delay: lineDelay, ease: "linear" }
                : { duration: 0.15, ease: "easeIn" }
            }
          />

          {engineeringProcess.map((step, i) => (
            <Reveal key={step.number} className="relative">
              <div className="relative z-10 h-[52px] w-[52px]">
                <svg viewBox="0 0 52 52" className="absolute inset-0 h-full w-full -rotate-90">
                  <circle
                    cx="26"
                    cy="26"
                    r="23"
                    fill={isDark ? "#0B0F14" : "#FFFFFF"}
                    stroke={isDark ? "rgba(255,255,255,0.15)" : "#E4E8EA"}
                    strokeWidth="2.5"
                  />
                  <motion.circle
                    cx="26"
                    cy="26"
                    r="23"
                    fill="none"
                    stroke="#E30613"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={false}
                    animate={{ pathLength: hovered ? 1 : 0 }}
                    transition={
                      hovered
                        ? { duration: CIRCLE_DRAW_DURATION, delay: i * STEP_DELAY, ease: "easeInOut" }
                        : { duration: 0.15, ease: "easeIn" }
                    }
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-heading text-base font-bold text-brand-red">
                  {step.number}
                </span>
              </div>
              <h4
                className={cn(
                  "mt-4 text-sm font-bold uppercase tracking-wide",
                  isDark ? "text-white" : "text-brand-ink"
                )}
              >
                {step.title}
              </h4>
              <p className={cn("mt-1.5 text-xs leading-relaxed", isDark ? "text-white/55" : "text-brand-muted")}>
                {step.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
