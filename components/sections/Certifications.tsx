import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { certifications } from "@/data/certifications";

// Fixed number of empty slots shown while no real certifications have been
// supplied yet, so the section reads as "certifications coming" rather than
// blank. Once data/certifications.ts has real entries, those render instead
// and this placeholder count is ignored.
const PLACEHOLDER_SLOTS = 4;

export default function Certifications() {
  const hasCertifications = certifications.length > 0;

  return (
    <section className="bg-white py-24">
      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[280px_1fr] md:gap-14">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand-red">
              Certifications &amp; Standards
            </p>
            <h2 className="mt-3 text-2xl font-extrabold text-brand-ink sm:text-3xl">
              Backed by recognized standards
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-brand-muted">
              Certifications and accreditations will be listed here as they are
              confirmed.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {hasCertifications
                ? certifications.map((cert) => (
                    <div
                      key={cert.name}
                      className="flex aspect-square flex-col items-center justify-center gap-3 rounded-xl border border-brand-line bg-white p-5 text-center"
                    >
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
                        <BadgeCheck size={26} className="text-brand-red" />
                      )}
                      <span className="text-xs font-bold text-brand-ink">{cert.name}</span>
                      <span className="text-[10px] text-brand-muted">{cert.issuer}</span>
                    </div>
                  ))
                : Array.from({ length: PLACEHOLDER_SLOTS }).map((_, i) => (
                    <div
                      key={i}
                      className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-brand-line/80 bg-brand-light text-center"
                    >
                      <BadgeCheck size={22} className="text-brand-line" />
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-brand-muted">
                        Coming soon
                      </span>
                    </div>
                  ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
