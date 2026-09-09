import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
// Previous flat-color hover map, kept in the codebase for future reuse —
// see components/sections/SriLankaMap.tsx. Swapped out below for the
// zoomable 3D-pin version per client request.
// import SriLankaMap from "@/components/sections/SriLankaMap";
import SriLankaMapPins from "@/components/sections/SriLankaMapPins";
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
              Zoom in to see every completed project, district by district
            </div>
          </div>

          <div className="mt-12 rounded-xl border border-brand-line bg-white p-8">
            <SriLankaMapPins />
          </div>
        </div>
      </Container>
    </section>
  );
}
