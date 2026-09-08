import { Sun, BatteryCharging, PlugZap, Zap, Check } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import EngineeringProcess from "@/components/sections/EngineeringProcess";
import ContactCTA from "@/components/sections/ContactCTA";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { solutions, type SolutionSlug } from "@/data/solutions";
import { batteryHighlights, evChargingHighlights } from "@/data/technology";

const iconMap = { Sun, BatteryCharging, PlugZap, Zap };

export default function SolutionDetail({ slug }: { slug: SolutionSlug }) {
  const solution = solutions.find((s) => s.slug === slug)!;
  const Icon = iconMap[solution.icon];

  const extraHighlights =
    slug === "energy-storage" ? batteryHighlights : slug === "ev-charging" ? evChargingHighlights : null;

  return (
    <>
      <PageHero eyebrow={`Solution ${solution.number}`} title={solution.title} description={solution.heroSubline}>
        <div className="mt-8 flex h-14 w-14 items-center justify-center rounded-lg bg-white/10">
          <Icon size={26} className="text-brand-red" />
        </div>
      </PageHero>

      <section className="bg-white py-24">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <SectionHeading eyebrow="Overview" title={solution.summary} />
              <p className="mt-5 text-brand-muted">{solution.heroSubline}</p>
              <ul className="mt-7 space-y-3">
                {solution.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm font-medium text-brand-ink">
                    <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-brand-red-soft">
                      <Check size={12} className="text-brand-red" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {solution.applications.map((app) => (
                <div key={app.title} className="rounded-xl border border-brand-line bg-brand-light p-6">
                  <h3 className="text-base font-bold text-brand-ink">{app.title}</h3>
                  <p className="mt-2 text-sm text-brand-muted">{app.description}</p>
                </div>
              ))}
            </div>
          </div>

          {extraHighlights && (
            <div className="mt-16 rounded-xl border border-brand-line bg-brand-ink p-9">
              <h3 className="text-sm font-bold uppercase tracking-widest text-brand-red">
                Specification Highlights
              </h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {extraHighlights.map((h) => (
                  <span
                    key={h}
                    className="rounded-md border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>

      {slug === "solar-pv" && <EngineeringProcess tone="light" />}

      <ContactCTA />
    </>
  );
}
