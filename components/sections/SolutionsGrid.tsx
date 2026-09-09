import { Sun, BatteryCharging, PlugZap, Zap, ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { solutions } from "@/data/solutions";

const iconMap = { Sun, BatteryCharging, PlugZap, Zap };

export default function SolutionsGrid() {
  return (
    <section className="bg-white py-24">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="What We Deliver"
            title="Four disciplines. One engineering team."
            description="Every system is specified against your load, site conditions and budget — then installed and commissioned by trained technicians."
          />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((solution, i) => {
            const Icon = iconMap[solution.icon];
            return (
              <Reveal key={solution.slug} delay={i * 0.08}>
                <a
                  href={`/solutions/${solution.slug}`}
                  className="group relative flex h-full flex-col gap-5 rounded-xl border border-brand-line bg-white p-7 transition-all duration-200 hover:-translate-y-1.5 hover:border-brand-red/40 hover:shadow-[0_24px_48px_-24px_rgba(11,15,20,0.28)]"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-brand-ink transition-colors group-hover:bg-brand-red">
                    <Icon size={26} className="text-brand-red group-hover:text-white" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-red">
                      {solution.number}
                    </span>
                    <h3 className="mt-2 text-xl font-bold text-brand-ink">{solution.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-muted">
                      {solution.summary}
                    </p>
                  </div>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-brand-ink transition-colors group-hover:text-brand-red">
                    Learn More
                    <ArrowUpRight
                      size={16}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
