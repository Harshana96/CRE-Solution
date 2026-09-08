import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { leadership, leadershipIntro } from "@/data/leadership";

export default function Leadership() {
  return (
    <section className="bg-white py-24">
      <Container>
        <SectionHeading
          eyebrow="Our Leadership"
          title="Driven by engineering, experience and purpose"
          description={leadershipIntro}
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {leadership.map((leader) => (
            <div
              key={leader.name}
              className="flex gap-6 rounded-xl border border-brand-line bg-white p-7"
            >
              <div className="flex h-16 w-16 flex-none items-center justify-center rounded-full bg-brand-ink font-heading text-xl font-bold text-brand-red">
                {leader.initials}
              </div>
              <div>
                <h3 className="text-lg font-bold text-brand-ink">{leader.name}</h3>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-brand-red">
                  {leader.role}
                </div>
                <p className="mt-2 text-xs text-brand-muted">{leader.credentials}</p>
                <p className="mt-3 border-l-2 border-brand-red pl-3 text-sm italic text-brand-ink">
                  &ldquo;{leader.quote}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
