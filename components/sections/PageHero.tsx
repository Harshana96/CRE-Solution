import type { ReactNode } from "react";
import Container from "@/components/ui/Container";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

// Shared dark hero band used at the top of every inner page (About,
// Solutions, Projects, Technology, Why CRE, Contact). Keeps the "Engineering
// the Energy of Tomorrow" premium tone consistent while the homepage gets its
// own larger cinematic Hero component.
export default function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-brand-ink pb-20 pt-40 text-white">
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
        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-brand-red">
          <span className="h-[3px] w-6 rounded-full bg-brand-red" />
          {eyebrow}
        </div>
        <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">{description}</p>
        )}
        {children}
      </Container>
    </section>
  );
}
