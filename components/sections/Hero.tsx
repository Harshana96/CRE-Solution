"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { company } from "@/data/company";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden bg-brand-ink pt-24 text-white">
      {/* Cover photo: rooftop solar installation */}
      <Image
        src="/images/hero/rooftop-solar.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Overlay: lighter overall (so the photo — and the logo sitting over
          the top-left corner of it — actually reads), with a focused darker
          "spotlight" behind the headline/body text area only, for legibility. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 500px at 85% 0%, rgba(227,6,19,0.18), transparent 60%), radial-gradient(1000px 560px at 26% 58%, rgba(5,7,10,0.8), transparent 68%), linear-gradient(200deg, rgba(6,8,11,0.5) 0%, rgba(10,13,17,0.4) 45%, rgba(18,23,28,0.32) 100%)",
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
          className="mt-6 max-w-3xl text-[2.6rem] font-extrabold leading-[1.06] sm:text-6xl lg:text-[4.25rem]"
        >
          <span className="text-brand-red">Engineering</span> the{" "}
          <span className="text-brand-red">Energy</span> of{" "}
          <span className="text-brand-red">Tomorrow</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.16 }}
          className="mt-7 max-w-xl text-lg leading-relaxed text-white/70 sm:text-xl"
        >
          {company.heroSubline} Solar PV, battery storage, EV charging and
          electrical systems, engineered and installed islandwide.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.24 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Button href="/contact" variant="primary">
            Get a Quote <ArrowRight size={16} />
          </Button>
          <Button href="/solutions" variant="outline-light">
            Explore Our Solutions
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
