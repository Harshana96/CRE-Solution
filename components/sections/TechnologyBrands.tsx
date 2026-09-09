import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { technologyBrandGroups } from "@/data/technology";

export default function TechnologyBrands() {
  return (
    <section className="bg-brand-light py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Reliable Brands, Expert Solutions"
            title="Trusted technology & engineering"
          />
        </Reveal>

        <div className="mt-14 space-y-10">
          {technologyBrandGroups.map((group, i) => (
            <Reveal key={group.category} delay={i * 0.08}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-brand-ink">
                  {group.category}
                </h3>
                <span className="text-xs text-brand-muted">{group.tagline}</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                {group.brands.map((brand) => (
                  <span
                    key={brand}
                    className="rounded-md border border-brand-line bg-white px-5 py-2.5 text-sm font-bold text-brand-ink"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 max-w-2xl text-xs text-brand-muted">
          Brands shown are the equipment manufacturers featured in CRE Solutions&rsquo;
          project portfolio. CRE Solutions is not represented here as an official
          distributor, authorized dealer, partner or certified installer of these
          brands.
        </p>
      </Container>
    </section>
  );
}
