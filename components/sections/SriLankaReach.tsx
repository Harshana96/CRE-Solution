import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import SriLankaMap from "@/components/sections/SriLankaMap";
import { company } from "@/data/company";

export default function SriLankaReach() {
  return (
    <section className="bg-brand-light py-24">
      <Container>
        <div>
          <div className="max-w-2xl">
            <SectionHeading
              eyebrow="Project Reach"
              title={company.reachSubStatement}
              description={company.reachDescription}
            />
            <div className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-brand-line bg-white px-4 py-2 text-xs font-semibold text-brand-ink">
              <span className="h-2 w-2 rounded-full bg-brand-red" />
              Hover or tap a district to see completed projects
            </div>
          </div>

          <div className="mt-12 rounded-xl border border-brand-line bg-white p-8">
            <SriLankaMap />
          </div>
        </div>
      </Container>
    </section>
  );
}
