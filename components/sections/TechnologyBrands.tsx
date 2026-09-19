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

function BrandCard({ brand }: { brand: TechnologyBrand }) {
  return (
    <div className="group relative flex aspect-[4/3] flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-brand-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/40 hover:shadow-[0_24px_48px_-24px_rgba(11,15,20,0.35)]">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-brand-red transition-transform duration-300 group-hover:scale-x-100"
      />
      {brand.logo ? (
        <div className="relative h-16 w-full sm:h-20">
          <Image
            src={brand.logo}
            alt={`${brand.name} logo`}
            fill
            sizes="(min-width: 1024px) 220px, 45vw"
            className="object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      ) : (
        <>
          <ImageIcon size={26} className="text-brand-line" />
          <span className="text-center text-sm font-bold text-brand-ink">{brand.name}</span>
        </>
      )}
    </div>
  );
}

export default function TechnologyBrands() {
  return (
    <section className="relative overflow-hidden bg-brand-light py-24">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[520px] bg-gradient-to-b from-brand-red-soft via-brand-light to-brand-light"
      />
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

        <div className="mt-14 space-y-14">
          {technologyBrandGroups.map((group, i) => {
            const Icon = categoryIcon[group.category] ?? Zap;
            return (
              <Reveal key={group.category} delay={i * 0.06}>
                <div>
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-brand-ink shadow-[0_10px_20px_-8px_rgba(11,15,20,0.5)]">
                        <Icon size={20} className="text-brand-red" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold uppercase tracking-[0.08em] text-brand-ink">
                          {group.category}
                        </h3>
                        <p className="text-xs text-brand-muted">{group.tagline}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
                    {group.brands.map((brandItem) => (
                      <BrandCard key={brandItem.name} brand={brandItem} />
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-14 max-w-2xl text-xs text-brand-muted">
          Brands shown are the equipment manufacturers CRE Solutions works with.
          Product photos will be added as they become available. CRE Solutions
          is not represented here as an official distributor, authorized
          dealer, partner or certified installer of these brands.
        </p>
      </Container>
    </section>
  );
}
