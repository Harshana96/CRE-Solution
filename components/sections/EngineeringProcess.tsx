"use client";

import { useState } from "react";
import Image from "next/image";
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
const STEP_DELAY = 0.4;
const CIRCLE_DRAW_DURATION = 0.32;

// Real CRE Solutions project photos used as small decorative backgrounds
// behind each step tile (cycled in order — not meant to depict that
// specific step, just to give each tile its own visual texture instead of
// one large photo behind the whole section).
const STEP_PHOTOS = [
  "/images/projects/mr-kamal-dambokka-kurunegala.jpg",
  "/images/projects/kiyoto-coffee-mathale.jpg",
  "/images/projects/kmee-restaurant-gampaha.jpg",
  "/images/projects/dr-weerasinghe-kurunegala.jpg",
  "/images/projects/mr-janitha-just-computer-kurunegala.jpg",
  "/images/projects/trincomalee-mr-dewinda.jpg",
  "/images/projects/dr-yamuna-kurunegala.jpg",
  "/images/projects/mr-piyumal-kurunegala.jpg",
];

// Circle sits (16px tile padding) + (20px, half the 40px circle) = 36px
// down from the tile top — the connecting line must match that exactly or
// it visibly floats above/below the row of circles.
const CIRCLE_CENTER_Y = 36;

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
  // currently passing under. Only meaningful on the xl single-row layout.
  const lineDelay = STEP_DELAY * 0.3;
  const lineDuration = STEP_DELAY * (stepCount - 1);

  return (
    <section className={cn("relative overflow-hidden py-24", isDark ? "bg-brand-ink" : "bg-brand-light")}>
      <Container className="relative z-10">
        <Reveal>
          <SectionHeading
            eyebrow="Our Engineering Process"
            title="From concept to continuous support"
            description={
              compact
                ? undefined
                : "A fixed eight-stage sequence, followed for every project regardless of scale."
            }
            tone={isDark ? "light" : "dark"}
          />
        </Reveal>

        <div
          className="relative mt-14 overflow-hidden rounded-2xl border border-white/10"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="grid grid-cols-2 divide-x divide-y divide-white/10 sm:grid-cols-4 xl:grid-cols-8 xl:divide-y-0">
            {engineeringProcess.map((step, i) => (
              <Reveal key={step.number} delay={i * 0.04}>
                <div className="group relative flex min-h-[200px] flex-col justify-between p-4">
                  <Image
                    src={STEP_PHOTOS[i % STEP_PHOTOS.length]}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 12vw, (min-width: 640px) 25vw, 50vw"
                    className="object-cover opacity-70 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:opacity-90"
                  />
                  {/* Uniform dark-red brand wash over every tile, so eight
                      differently-coloured real project photos read as one
                      cohesive strip instead of clashing side by side —
                      light enough that the photo itself stays visible. */}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-brand-ink/90 via-brand-ink/35 to-brand-ink/10"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-br from-brand-red/25 via-transparent to-transparent opacity-50 transition-opacity duration-500 group-hover:opacity-70"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 ring-1 ring-inset ring-brand-red/50 transition-opacity duration-300 group-hover:opacity-100"
                  />

                  <div className="relative z-10 h-[40px] w-[40px]">
                    <svg viewBox="0 0 52 52" className="absolute inset-0 h-full w-full -rotate-90">
                      <circle
                        cx="26"
                        cy="26"
                        r="23"
                        fill="rgba(11,15,20,0.55)"
                        stroke="rgba(255,255,255,0.25)"
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
                    <span className="absolute inset-0 flex items-center justify-center font-heading text-sm font-bold text-brand-red">
                      {step.number}
                    </span>
                  </div>

                  <div className="relative z-10 transition-transform duration-300 ease-out group-hover:-translate-y-1">
                    <h4 className="text-sm font-bold uppercase tracking-wide text-white">{step.title}</h4>
                    <p className="mt-1.5 text-xs leading-relaxed text-white/60 transition-colors duration-300 group-hover:text-white/85">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 hidden h-px origin-left xl:block"
            style={{ top: CIRCLE_CENTER_Y, background: "rgba(227,6,19,0.45)" }}
            initial={false}
            animate={{ scaleX: hovered ? 1 : 0 }}
            transition={
              hovered
                ? { duration: lineDuration, delay: lineDelay, ease: "linear" }
                : { duration: 0.15, ease: "easeIn" }
            }
          />
        </div>
      </Container>
    </section>
  );
}
