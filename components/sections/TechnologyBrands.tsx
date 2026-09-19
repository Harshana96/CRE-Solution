import { ImageIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { technologyBrandGroups, type TechnologyBrand } from "@/data/technology";

// Per-brand logo + product photo, awaiting real assets from the client —
// see the `logo`/`image` fields on TechnologyBrand in data/technology.ts.
function LogoCard({ brand }: { brand: TechnologyBrand }) {
  return (
    <div className="flex min-h-[128px] flex-col items-center justify-center gap-2 rounded-xl border border-brand-line bg-white p-5 text-center">
      <ImageIcon size={22} className="text-brand-line" />
      <span className="text-sm font-bold text-brand-ink">{brand.name}</span>
    </div>
  );
}

function ProductPhotoPlaceholder({ brand }: { brand: TechnologyBrand }) {
  return (
    <div
      className="relative flex min-h-[128px] flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border border-dashed border-brand-line bg-brand-light text-center"
      aria-label={`Product photo for ${brand.name} — coming soon`}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, transparent 0 12px, var(--color-brand-line) 12px 13px)",
        }}
      />
      <ImageIcon size={20} className="relative z-10 text-brand-muted" />
      <span className="relative z-10 text-[11px] font-semibold uppercase tracking-wide text-brand-muted">
        Product photo coming soon
      </span>
    </div>
  );
}

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

        <div className="mt-14 space-y-8">
          {technologyBrandGroups.map((group, i) => (
            <Reveal key={group.category} delay={i * 0.06}>
              <div className="rounded-2xl border border-brand-line bg-white p-6 sm:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-brand-ink">
                    {group.category}
                  </h3>
                  <span className="text-xs text-brand-muted">{group.tagline}</span>
                </div>

                <div className="mt-6 divide-y divide-brand-line">
                  {group.brands.map((brandItem, j) => {
                    const imageOnLeft = j % 2 === 1;
                    return (
                      <div
                        key={brandItem.name}
                        className="grid grid-cols-1 gap-4 py-5 first:pt-0 last:pb-0 sm:grid-cols-2 sm:gap-6"
                      >
                        {imageOnLeft ? (
                          <>
                            <ProductPhotoPlaceholder brand={brandItem} />
                            <LogoCard brand={brandItem} />
                          </>
                        ) : (
                          <>
                            <LogoCard brand={brandItem} />
                            <ProductPhotoPlaceholder brand={brandItem} />
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 max-w-2xl text-xs text-brand-muted">
          Brands shown are the equipment manufacturers CRE Solutions works with.
          Logos and product photos are placeholders pending real assets. CRE
          Solutions is not represented here as an official distributor,
          authorized dealer, partner or certified installer of these brands.
        </p>
      </Container>
    </section>
  );
}
