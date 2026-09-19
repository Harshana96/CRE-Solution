import Image from "next/image";
import { BadgeCheck, AlertTriangle } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { certifications, isSample } from "@/data/certifications";

export default function Certifications() {
  return (
    <section className="bg-white py-24">
      <Container>
        {isSample && (
          <div className="mb-10 flex items-start gap-3 rounded-lg border border-amber-300 bg-amber-50 px-5 py-4 text-sm text-amber-900">
            <AlertTriangle size={18} className="mt-0.5 flex-none text-amber-600" />
            <p>
              <strong className="font-bold">Sample preview only</strong> — the
              certifications below are placeholders to show the layout. They
              must be replaced with CRE Solutions&rsquo; real certification
              names, issuing bodies and logos before this section goes live.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-10 md:grid-cols-[280px_1fr] md:gap-14">
          <Reveal>
            <SectionHeading
              eyebrow="Certifications & Standards"
              title="Backed by recognized standards"
              description="Certifications and accreditations will be listed here as they are confirmed."
            />
          </Reveal>

          <Reveal delay={0.08}>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {certifications.map((cert, i) => (
                <div
                  key={`${cert.name}-${i}`}
                  className="relative flex aspect-square flex-col items-center justify-center gap-3 rounded-xl border border-brand-line bg-white p-5 text-center"
                >
                  {isSample && (
                    <span className="absolute right-2 top-2 rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-amber-700">
                      Sample
                    </span>
                  )}
                  {cert.logo ? (
                    <div className="relative h-12 w-full">
                      <Image
                        src={cert.logo}
                        alt={`${cert.name} certification`}
                        fill
                        sizes="140px"
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <BadgeCheck size={26} className="text-brand-line" />
                  )}
                  <span className="text-xs font-bold text-brand-ink">{cert.name}</span>
                  <span className="text-[10px] text-brand-muted">{cert.issuer}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
