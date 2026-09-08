import type { Metadata } from "next";
import { Sun, BatteryCharging, PlugZap, Zap, ArrowUpRight } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import ContactCTA from "@/components/sections/ContactCTA";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { solutions } from "@/data/solutions";

const iconMap = { Sun, BatteryCharging, PlugZap, Zap };

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Solar PV, battery energy storage, EV charging and electrical solutions from CRE Solutions — engineered for homes, businesses and industries across Sri Lanka.",
};

export default function SolutionsOverviewPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Deliver"
        title="Our Energy Solutions"
        description="Four disciplines, one engineering team. Explore each solution to see how CRE Solutions designs, installs and supports it."
      />

      <section className="bg-white py-24">
        <Container>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {solutions.map((solution) => {
              const Icon = iconMap[solution.icon];
              return (
                <div
                  key={solution.slug}
                  className="flex flex-col rounded-xl border border-brand-line bg-white p-9"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-brand-ink">
                      <Icon size={26} className="text-brand-red" />
                    </div>
                    <span className="font-heading text-3xl font-extrabold text-brand-line">
                      {solution.number}
                    </span>
                  </div>
                  <h2 className="mt-6 text-2xl font-bold text-brand-ink">{solution.title}</h2>
                  <p className="mt-3 text-brand-muted">{solution.heroSubline}</p>
                  <ul className="mt-5 flex flex-1 flex-col gap-2 border-t border-brand-line pt-5">
                    {solution.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-brand-ink">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-brand-red" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`/solutions/${solution.slug}`}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-ink transition-colors hover:text-brand-red"
                  >
                    Explore {solution.shortTitle}
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              );
            })}
          </div>

          <div className="mt-16 flex flex-col items-center gap-5 rounded-xl bg-brand-ink px-8 py-14 text-center">
            <h2 className="max-w-xl font-heading text-2xl font-extrabold text-white sm:text-3xl">
              Find the Right Energy Solution
            </h2>
            <p className="max-w-lg text-white/60">
              Tell us about your site and requirements — our engineering team will
              recommend the right combination of solar, storage, EV charging or
              electrical work.
            </p>
            <Button href="/contact" variant="primary">
              Get a Quote
            </Button>
          </div>
        </Container>
      </section>

      <ContactCTA />
    </>
  );
}
