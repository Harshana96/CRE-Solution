"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, scale: 0.4, rotate: -24 },
  // Rotate overshoots past 0 and settles back — a small wiggle instead of a
  // flat fade-in, so the icon reads as "animated" rather than just appearing.
  visible: { opacity: 1, scale: 1, rotate: [-24, 12, -6, 3, 0] },
};

// Scroll-triggered "pop in + settle wiggle" for icon badges site-wide, plus a
// hover reaction driven by plain CSS `group`/`group-hover` (not Framer's
// whileHover) on an inner span — the outer motion.div owns the scroll
// animation's transform, so a second transform-driven trigger on the SAME
// element (e.g. Framer's whileHover, or a CSS hover class on this element)
// would fight it via inline-style vs stylesheet specificity and silently do
// nothing. Putting the hover transform on a separate inner element sidesteps
// that entirely. The ancestor card/section just needs a `group` class
// somewhere above this (see WhyChooseUs, SolutionsGrid, etc.).
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
        opacity: { duration: 0.3, delay: reduceMotion ? 0 : delay },
        scale: {
          type: "spring",
          stiffness: 280,
          damping: 16,
          delay: reduceMotion ? 0 : delay,
        },
        rotate: {
          duration: 0.7,
          times: [0, 0.4, 0.65, 0.85, 1],
          ease: "easeOut",
          delay: reduceMotion ? 0 : delay,
        },
      }}
    >
      <span className="inline-flex transition-transform duration-300 ease-out group-hover:scale-125 group-hover:-rotate-6">
        {children}
      </span>
    </motion.div>
  );
}
