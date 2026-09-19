import Image from "next/image";
import {
  ImageIcon,
  Zap,
  Sun,
  BatteryCharging,
  PlugZap,
  Cable,
  Layers,
  ShieldCheck,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { technologyBrandGroups, type TechnologyBrand } from "@/data/technology";

const categoryIcon: Record<string, typeof Zap> = {
  "Inverter Brands": Zap,
  "Solar Panel Brands": Sun,
  "Battery Energy Storage": BatteryCharging,
  "EV Charging Solutions": PlugZap,
  Wiring: Cable,
  Aluminum: Layers,
  "Surge Protection": ShieldCheck,
};

// Flatten once so brand rows alternate sides continuously down the whole
// page (not restarting each category), while still knowing which category
// each row belongs to for the divider + tag.
let rowCounter = 0;
const rows = technologyBrandGroups.flatMap((group) =>
  group.brands.map((brand, indexInGroup) => ({
    brand,
    category: group.category,
    tagline: group.tagline,
    isFirstInGroup: indexInGroup === 0,
    globalIndex: rowCounter++,
  })),
);

function ProductPanel({ brand }: { brand: TechnologyBrand }) {
  if (brand.image) {
    return (
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-[0_30px_60px_-28px_rgba(11,15,20,0.4)] sm:aspect-[5/4]">
        <Image
          src={brand.image}
          alt={`${brand.name} product`}
          fill
          sizes="(min-width: 768px) 480px, 90vw"
          className="object-cover"
        />
      </div>
    );
  }
  return (
    <div className="relative flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 rounded-3xl bg-white shadow-[0_20px_40px_-30px_rgba(11,15,20,0.35)] sm:aspect-[5/4]">
      <ImageIcon size={40} className="text-brand-line" strokeWidth={1.4} />
      <span className="text-xs font-semibold uppercase tracking-wide text-brand-muted">
        Product photo coming soon
      </span>
    </div>
  );
}

function BrandRow({
  brand,
  category,
  tagline,
  reverse,
  index,
}: {
  brand: TechnologyBrand;
  category: string;
  tagline: string;
  reverse: boolean;
  index: number;
}) {
  const Icon = categoryIcon[category] ?? Zap;

  return (
    <div
      className={`grid grid-cols-1 items-center gap-10 rounded-3xl bg-brand-light/70 p-8 sm:p-12 md:grid-cols-2 md:gap-16 lg:gap-24 ${
        reverse ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className="relative max-w-md">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-14 -left-1 select-none text-[6.5rem] font-black leading-none text-white sm:text-[8rem]"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="relative">
          <h3 className="sr-only">{brand.name}</h3>

          {brand.logo ? (
            <div className="relative h-24 w-full max-w-[280px] sm:h-32 sm:max-w-[340px]">
              <Image
                src={brand.logo}
                alt={`${brand.name} logo`}
                fill
                sizes="340px"
                className="object-contain object-left"
              />
            </div>
          ) : (
            <span className="text-3xl font-extrabold text-brand-ink sm:text-4xl">
              {brand.name}
            </span>
          )}

          <p className="mt-6 text-lg leading-relaxed text-brand-muted">{tagline}</p>
          <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-brand-ink shadow-sm">
            <Icon size={14} className="text-brand-red" />
            {category}
          </span>
        </div>
      </div>

      <div className="mx-auto w-full max-w-sm sm:max-w-md">
        <ProductPanel brand={brand} />
      </div>
    </div>
  );
}

export default function TechnologyBrands() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      <Container className="relative">
        <Reveal>
          <SectionHeading
            eyebrow="Reliable Brands, Expert Solutions"
            title="Trusted technology & engineering"
          />
        </Reveal>

        <div className="mt-8 space-y-8">
          {rows.map(({ brand, category, tagline, isFirstInGroup, globalIndex }) => (
            <div key={`${category}-${brand.name}-${globalIndex}`}>
              {isFirstInGroup && (
                <div className={`mb-8 flex items-center gap-3 border-t border-brand-line pt-10 ${globalIndex === 0 ? "border-t-0 pt-0" : ""}`}>
                  <span className="h-px flex-1 bg-brand-line" aria-hidden />
                  <span className="text-xs font-bold uppercase tracking-[0.15em] text-brand-red">
                    {category}
                  </span>
                  <span className="h-px flex-1 bg-brand-line" aria-hidden />
                </div>
              )}
              <Reveal delay={(globalIndex % 4) * 0.05}>
                <BrandRow
                  brand={brand}
                  category={category}
                  tagline={tagline}
                  reverse={globalIndex % 2 === 1}
                  index={globalIndex}
                />
              </Reveal>
            </div>
          ))}
        </div>

        <p className="mt-10 max-w-2xl text-xs text-brand-muted">
          Brands shown are the equipment manufacturers CRE Solutions works
          with. Product photos are added as each brand&rsquo;s own photo
          becomes available. CRE Solutions is not represented here as an
          official distributor, authorized dealer, partner or certified
          installer of these brands.
        </p>
      </Container>
    </section>
  );
}
