import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import Stats from "@/components/sections/Stats";
import ProjectGrid from "@/components/sections/ProjectGrid";
import SriLankaReach from "@/components/sections/SriLankaReach";
import ContactCTA from "@/components/sections/ContactCTA";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Completed solar PV, battery storage and electrical installations by CRE Solutions across Sri Lanka.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Works Speak For Us"
        title="Recent Installations"
        description="A sample of completed projects across Sri Lanka's homes, restaurants, temples and industries."
      />
      <Stats tone="light" />
      <section className="bg-white py-24">
        <Container>
          <ProjectGrid />
        </Container>
      </section>
      <SriLankaReach />
      <ContactCTA />
    </>
  );
}
