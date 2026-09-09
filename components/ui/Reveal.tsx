"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

// Scroll-reveal is disabled site-wide per client feedback, without removing
// it from any of the sections it was wired into (EngineeringProcess,
// SolutionsGrid, WhyChooseUs, Leadership, TechnologyBrands, ProjectGrid,
// SolutionDetail) — flip this back to `true` to re-enable the fade/slide-up
// animation everywhere at once.
const ANIMATIONS_ENABLED = false;

// Simple, consistent scroll-reveal used across sections sitewide (engineering
// process steps, solution/strength/project cards, etc.) — fade + slide up
// once, the first time an element scrolls into view. Falls back to no motion
// when the user has requested reduced motion.
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (!ANIMATIONS_ENABLED) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={variants}
      transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeOut", delay: reduceMotion ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
}
