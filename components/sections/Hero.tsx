"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { company } from "@/data/company";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden bg-brand-light pt-24 text-brand-ink">
      {/* Client-supplied cover image (AI-generated, not a photo of an actual
          CRE Solutions installation — unlike the real project photos used
          elsewhere on the site). Washed light (not darkened) so it stays
          airy and the dark headline/body text and logo above it both stay
          legible. */}
      <Image
        src="/images/hero/rooftop-solar-sunrise.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1000px 620px at 28% 58%, rgba(245,247,248,0.85), transparent 70%), linear-gradient(180deg, rgba(245,247,248,0.32) 0%, rgba(245,247,248,0.22) 45%, rgba(245,247,248,0.14) 100%)",
        }}
      />

      <Container className="relative z-10 py-24">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-red"
        >
          <span className="h-[3px] w-7 rounded-full bg-brand-red" />
          {company.fullName} · Est. {company.founded}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.08 }}
          className="mt-6 max-w-3xl text-[2.6rem] font-extrabold leading-[1.06] text-brand-ink sm:text-6xl lg:text-[4.25rem]"
        >
          <span className="text-brand-red">Engineering</span> the{" "}
          <span className="text-brand-red">Energy</span> of{" "}
          <span className="text-brand-red">Tomorrow</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.24 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Button href="/contact" variant="primary">
            Free Consultation <ArrowRight size={16} />
          </Button>
          <Button href="/solutions" variant="outline-dark">
            Explore Our Solutions
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
