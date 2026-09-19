"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
  /**
   * Photos to slide through behind this banner. Defaults to a general set
   * of real CRE Solutions project photos — pass a different list per page
   * (e.g. Technology, Why CRE) so each banner can show a different mix.
   */
  images?: string[];
}

// Default rotation — real CRE Solutions project photos, not stock imagery.
// Used by any page that doesn't pass its own `images` prop.
export const DEFAULT_PAGE_HERO_IMAGES = [
  "/images/projects/trincomalee-mr-dewinda.jpg",
  "/images/projects/mr-kamal-dambokka-kurunegala.jpg",
  "/images/projects/kiyoto-coffee-mathale.jpg",
  "/images/projects/kmee-restaurant-gampaha.jpg",
  "/images/projects/dr-weerasinghe-kurunegala.jpg",
  "/images/projects/mr-janitha-just-computer-kurunegala.jpg",
];

const ROTATE_INTERVAL_MS = 5000;

// Shared dark hero band used at the top of every inner page (About,
// Solutions, Projects, Technology, Why CRE, Contact). Keeps the "Engineering
// the Energy of Tomorrow" premium tone consistent while the homepage gets its
// own larger cinematic Hero component.
export default function PageHero({
  eyebrow,
  title,
  description,
  children,
  images = DEFAULT_PAGE_HERO_IMAGES,
}: PageHeroProps) {
  const [index, setIndex] = useState(0);
  // Only the images actually shown so far get mounted — otherwise all 6
  // rotating photos would start downloading immediately on load, competing
  // for bandwidth with the one that's actually the LCP element and tanking
  // it. Grows as the rotation (or a direct dot click) reaches a new photo;
  // once shown, an image stays mounted so the crossfade-back still works.
  const [revealed, setRevealed] = useState(() => new Set([0]));

  function reveal(i: number) {
    setRevealed((prev) => (prev.has(i) ? prev : new Set(prev).add(i)));
  }

  function goTo(i: number) {
    setIndex(i);
    reveal(i);
  }

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setIndex((i) => {
        const next = (i + 1) % images.length;
        reveal(next);
        return next;
      });
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <section className="group relative flex min-h-[560px] flex-col justify-end overflow-hidden bg-brand-ink pb-20 pt-40 text-white">
      {images.map((src, i) =>
        revealed.has(i) ? (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            priority={i === 0}
            fetchPriority={i === 0 ? "high" : undefined}
            sizes="100vw"
            // Sits under a heavy dark gradient at max 70% opacity, so a
            // lower quality is visually indistinguishable here but cuts
            // real bytes off what was the LCP image on every inner page.
            quality={55}
            className="object-cover transition-opacity duration-[1500ms] ease-in-out"
            style={{ opacity: i === index ? 0.7 : 0 }}
          />
        ) : null
      )}
      {/* Top-to-bottom instead of diagonal, and much lighter up top — the
          photo should read clearly there; darkens only toward the bottom,
          where the heading/description/dots actually sit (content is
          bottom-aligned via justify-end), so text stays legible without
          dimming the image everywhere. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,15,20,0.25) 0%, rgba(11,15,20,0.35) 35%, rgba(11,15,20,0.65) 65%, rgba(11,15,20,0.93) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "linear-gradient(180deg, transparent, #000 30%, #000 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-red/20 blur-3xl"
      />
      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-brand-red"
        >
          <motion.span
            className="h-[3px] w-6 origin-left rounded-full bg-brand-red"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          />
          {eyebrow}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.08 }}
          className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.16 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70"
          >
            {description}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.24 }}
          >
            {children}
          </motion.div>
        )}

        {images.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.32 }}
            className="mt-10 flex items-center gap-1"
            role="tablist"
            aria-label="Background photo"
          >
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show background photo ${i + 1}`}
                onClick={() => goTo(i)}
                className="group flex h-6 w-8 flex-none items-center justify-center"
              >
                <span
                  aria-hidden
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-7 bg-brand-red" : "w-1.5 bg-white/30 group-hover:bg-white/50"
                  }`}
                />
              </button>
            ))}
          </motion.div>
        )}
      </Container>
    </section>
  );
}
