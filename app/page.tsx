import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import SolutionsGrid from "@/components/sections/SolutionsGrid";
import EngineeringProcess from "@/components/sections/EngineeringProcess";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import ProjectGrid from "@/components/sections/ProjectGrid";
import SriLankaReach from "@/components/sections/SriLankaReach";
import ContactCTA from "@/components/sections/ContactCTA";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: `${company.tagline}`,
  description:
    "CRE Solutions delivers solar PV, battery storage, EV charging and electrical solutions for homes, businesses and industries across Sri Lanka.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats tone="light" />

      <section className="bg-white py-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <SectionHeading
              eyebrow="About CRE Solutions"
              title={company.reachStatement}
              description={company.description}
            />
            <div className="rounded-xl border border-brand-line bg-brand-light p-8">
              <p className="text-sm font-bold uppercase tracking-widest text-brand-red">
                Our Mission
              </p>
              <p className="mt-2 text-brand-ink">{company.mission}</p>
              <div className="my-6 h-px bg-brand-line" />
              <p className="text-sm font-bold uppercase tracking-widest text-brand-red">
                Our Vision
              </p>
              <p className="mt-2 text-brand-ink">{company.vision}</p>
            </div>
          </div>
        </Container>
      </section>

      <SolutionsGrid />
      <EngineeringProcess tone="dark" />
      <WhyChooseUs compact />

      <section className="bg-white py-24">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Our Works Speak For Us"
              title="Recent installations"
              description="A sample of completed projects across Sri Lanka's homes, restaurants and industries."
            />
            <Button href="/projects" variant="outline-dark" className="shrink-0">
              View All Projects
            </Button>
          </div>
          <div className="mt-12">
            <ProjectGrid limit={4} />
          </div>
        </Container>
      </section>

      <SriLankaReach />
      <ContactCTA />
    </>
  );
}
