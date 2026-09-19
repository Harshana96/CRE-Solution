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

function LogoCard({ brand }: { brand: TechnologyBrand }) {
  return (
    <div className="group flex min-h-[136px] flex-col items-center justify-center gap-3 rounded-xl border border-brand-line bg-white p-6 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-red/30 hover:shadow-[0_16px_32px_-20px_rgba(11,15,20,0.35)]">
      {brand.logo ? (
        <div className="relative h-14 w-full">
          <Image
            src={brand.logo}
            alt={`${brand.name} logo`}
            fill
            sizes="200px"
            className="object-contain"
          />
        </div>
      ) : (
        <>
          <ImageIcon size={22} className="text-brand-line" />
          <span className="text-sm font-bold text-brand-ink">{brand.name}</span>
        </>
      )}
    </div>
  );
}

function ProductPhotoPlaceholder({ brand }: { brand: TechnologyBrand }) {
  return (
    <div
      className="relative flex min-h-[136px] flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border border-dashed border-brand-line/80 bg-brand-light text-center"
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
    <section className="relative overflow-hidden bg-brand-light py-24">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 20px 20px, rgba(11,15,20,0.08) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
      <Container className="relative">
        <Reveal>
          <SectionHeading
            eyebrow="Reliable Brands, Expert Solutions"
            title="Trusted technology & engineering"
          />
        </Reveal>

        <div className="mt-14 space-y-8">
          {technologyBrandGroups.map((group, i) => {
            const Icon = categoryIcon[group.category] ?? Zap;
            return (
              <Reveal key={group.category} delay={i * 0.06}>
                <div className="overflow-hidden rounded-2xl border border-brand-line bg-white shadow-[0_20px_50px_-30px_rgba(11,15,20,0.25)]">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-line bg-brand-ink px-6 py-5 sm:px-8">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-brand-red">
                        <Icon size={19} className="text-white" />
                      </div>
                      <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-white">
                        {group.category}
                      </h3>
                    </div>
                    <span className="text-xs text-white/55">{group.tagline}</span>
                  </div>

                  <div className="divide-y divide-brand-line px-6 sm:px-8">
                    {group.brands.map((brandItem, j) => {
                      const imageOnLeft = j % 2 === 1;
                      return (
                        <div
                          key={brandItem.name}
                          className="grid grid-cols-1 gap-4 py-6 sm:grid-cols-2 sm:gap-6"
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
            );
          })}
        </div>

        <p className="mt-10 max-w-2xl text-xs text-brand-muted">
          Brands shown are the equipment manufacturers CRE Solutions works with.
          Product photos are placeholders pending real assets. CRE Solutions is
          not represented here as an official distributor, authorized dealer,
          partner or certified installer of these brands.
        </p>
      </Container>
    </section>
  );
}
