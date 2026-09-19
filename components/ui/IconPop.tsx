"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, scale: 0.4, rotate: -24 },
  // Rotate overshoots past 0 and settles back — a small wiggle instead of a
  // flat fade-in, so the icon reads as "animated" rather than just appearing.
  visible: { opacity: 1, scale: 1, rotate: [-24, 12, -6, 3, 0] },
};

// Scroll-triggered "pop in + settle wiggle" used for icon badges site-wide —
// separate from Reveal (whole-block fade/slide): this only wraps the small
// icon badge itself, so as each one scrolls into view it springs in and
// gives a couple of small back-and-forth turns before settling, rather than
// just fading. Falls back to no motion when reduced motion is requested.
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
      whileHover={
        reduceMotion
          ? undefined
          : { scale: 1.15, rotate: -8, transition: { type: "spring", stiffness: 320, damping: 12 } }
      }
      whileTap={reduceMotion ? undefined : { scale: 0.92 }}
    >
      {children}
    </motion.div>
  );
}
