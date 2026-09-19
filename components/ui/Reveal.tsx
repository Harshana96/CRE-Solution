"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

// Re-enabled site-wide per client request for a "dynamic look" — was
// previously turned off (without unwiring it from any section) per earlier
// feedback. Flip back to `false` to disable the fade/slide-up animation
// everywhere at once without touching every section that uses it.
const ANIMATIONS_ENABLED = true;

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
