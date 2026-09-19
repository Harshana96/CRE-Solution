import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import SolutionsShowcase from "@/components/sections/SolutionsShowcase";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import EngineeringProcess from "@/components/sections/EngineeringProcess";
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

      <SolutionsShowcase />
      <WhyChooseUs compact />
      <EngineeringProcess tone="dark" />

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
