import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Leadership from "@/components/sections/Leadership";
import Stats from "@/components/sections/Stats";
import ContactCTA from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "Why CRE Solutions",
  description:
    "Engineering expertise, quality equipment and islandwide service — why homes, businesses and industries across Sri Lanka choose CRE Solutions.",
};

export default function WhyCrePage() {
  return (
    <>
      <PageHero
        eyebrow="Engineering Expertise. Quality Solutions. Reliable Service."
        title="Why Choose CRE Solutions"
        description="Your requirement. Our engineering. A solution built for a brighter tomorrow."
      />
      <Stats tone="light" />
      <WhyChooseUs />
      <Leadership />
      <ContactCTA />
    </>
  );
}
