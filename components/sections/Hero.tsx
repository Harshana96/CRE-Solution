"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { company } from "@/data/company";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden bg-brand-ink pt-24 text-white">
      {/* Decorative solar-panel-grid graphic, standing in for hero photography */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 500px at 85% 0%, rgba(227,6,19,0.16), transparent 60%), linear-gradient(200deg, #05070a 0%, #0b0f14 45%, #171d24 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -right-[10%] bottom-[-8%] h-[70%] w-[65%] -skew-y-6 opacity-90"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, rgba(20,25,32,0.95) 0 46px, rgba(32,40,50,0.95) 46px 92px), repeating-linear-gradient(115deg, transparent 0 44px, rgba(255,255,255,0.08) 44px 46px), repeating-linear-gradient(25deg, transparent 0 22px, rgba(255,255,255,0.05) 22px 23px)",
          maskImage: "linear-gradient(200deg, transparent 0%, #000 32%)",
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
          {company.tagline.split(" of ")[0]} of{" "}
          <span className="text-brand-red">{company.tagline.split(" of ")[1]}</span>
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
