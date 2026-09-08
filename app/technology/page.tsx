import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import TechnologyBrands from "@/components/sections/TechnologyBrands";
import EngineeringProcess from "@/components/sections/EngineeringProcess";
import ContactCTA from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "Technology & Engineering",
  description:
    "The inverter, solar panel, battery and EV charging brands featured in CRE Solutions' engineering process across Sri Lanka.",
};

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        eyebrow="Reliable Brands. Expert Solutions."
        title="Trusted Technology & Engineering"
        description="A fixed six-stage engineering process — from site survey to long-term monitoring and support — applied to every project."
      />
      <TechnologyBrands />
      <EngineeringProcess tone="dark" />
      <ContactCTA />
    </>
  );
}
