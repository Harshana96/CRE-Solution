import type { Metadata } from "next";
import Link from "next/link";
import { Target, Eye, Compass } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import EngineeringProcess from "@/components/sections/EngineeringProcess";
import SriLankaReach from "@/components/sections/SriLankaReach";
import ContactCTA from "@/components/sections/ContactCTA";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import IconPop from "@/components/ui/IconPop";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "CRE Solutions (Pvt) Ltd — Ceylon Radiant Energy Solutions. Established 2022, delivering reliable and sustainable energy and electrical solutions across Sri Lanka.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={`Established ${company.founded}`}
        title="About CRE Solutions"
        description={company.description}
      />

      <section className="bg-white py-24">
        <Container>
          <SectionHeading eyebrow="Who We Are" title="Engineering expertise, practical experience" />
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-brand-muted sm:text-lg">
            {company.description} We design and deliver customized solutions for
            residential, commercial and industrial customers, combining engineering
            expertise with practical, on-site experience — from initial consultation to
            installation and after-sales support.
          </p>
        </Container>
      </section>

      <section className="bg-brand-light py-24">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-brand-line bg-white p-8">
              <IconPop className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-red-soft">
                <Target size={22} className="text-brand-red" />
              </IconPop>
              <h3 className="mt-5 text-xl font-bold text-brand-ink">Our Mission</h3>
              <p className="mt-3 text-brand-muted">{company.mission}</p>
            </div>
            <div className="rounded-xl border border-brand-line bg-white p-8">
              <IconPop delay={0.08} className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-red-soft">
                <Eye size={22} className="text-brand-red" />
              </IconPop>
              <h3 className="mt-5 text-xl font-bold text-brand-ink">Our Vision</h3>
              <p className="mt-3 text-brand-muted">{company.vision}</p>
            </div>
          </div>
        </Container>
      </section>

      <EngineeringProcess tone="light" />

      <section className="bg-white pb-24">
        <Container>
          <div className="flex items-center gap-2 text-sm text-brand-muted">
            <Compass size={16} className="text-brand-red" />
            See the full process detail on our{" "}
            <Link href="/solutions/solar-pv" className="font-semibold text-brand-ink hover:text-brand-red">
              Solar PV
            </Link>{" "}
            page.
          </div>
        </Container>
      </section>

      <SriLankaReach />
      <ContactCTA />
    </>
  );
}
