import { HardHat, BadgeCheck, Settings2, Wrench, Headphones, LineChart, MapPin, Users } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { strengths } from "@/data/why-cre";

const iconMap = { HardHat, BadgeCheck, Settings2, Wrench, Headphones, LineChart, MapPin, Users };

export default function WhyChooseUs({ compact = false }: { compact?: boolean }) {
  return (
    <section className="bg-white py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Engineering Expertise. Quality Solutions. Reliable Service."
            title="Why choose CRE Solutions"
            description={
              compact
                ? undefined
                : "Eight commitments that shape every project, from the first site visit to long-term support."
            }
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-brand-line bg-brand-line sm:grid-cols-2 lg:grid-cols-4">
          {strengths.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <Reveal key={item.title} delay={(i % 4) * 0.06} className="bg-white">
                <div className="flex h-full flex-col gap-4 p-7">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-red-soft">
                    <Icon size={20} className="text-brand-red" />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-brand-ink">
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-brand-muted">{item.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
