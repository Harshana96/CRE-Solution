"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, scale: 0.4, rotate: -20 },
  visible: { opacity: 1, scale: 1, rotate: 0 },
};

// Scroll-triggered "pop in" used specifically for icon badges site-wide —
// separate from Reveal (whole-block fade/slide, currently disabled
// site-wide per client feedback): this only wraps the small icon badge
// itself, so as each one scrolls into view it springs in rather than the
// whole card fading. Falls back to no motion when reduced motion is
// requested.
export default function IconPop({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={variants}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 16,
        delay: reduceMotion ? 0 : delay,
      }}
    >
      {children}
    </motion.div>
  );
}
