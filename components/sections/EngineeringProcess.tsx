import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { engineeringProcess } from "@/data/solutions";
import { cn } from "@/lib/utils";

export default function EngineeringProcess({
  tone = "dark",
  compact = false,
}: {
  tone?: "dark" | "light";
  compact?: boolean;
}) {
  const isDark = tone === "dark";

  return (
    <section className={cn("py-24", isDark ? "bg-brand-ink" : "bg-brand-light")}>
      <Container>
        <SectionHeading
          eyebrow="Our Engineering Process"
          title="From concept to continuous support"
          description={
            compact
              ? undefined
              : "A fixed six-stage sequence, followed for every project regardless of scale."
          }
          tone={isDark ? "light" : "dark"}
        />

        <div className="relative mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          <div
            aria-hidden
            className={cn(
              "absolute left-0 right-0 top-[26px] hidden h-px lg:block",
              isDark ? "bg-white/10" : "bg-brand-line"
            )}
          />
          {engineeringProcess.map((step) => (
            <div key={step.number} className="relative">
              <div
                className={cn(
                  "relative z-10 flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 font-heading text-base font-bold",
                  isDark
                    ? "border-brand-red bg-brand-ink text-brand-red"
                    : "border-brand-red bg-white text-brand-red"
                )}
              >
                {step.number}
              </div>
              <h4
                className={cn(
                  "mt-4 text-sm font-bold uppercase tracking-wide",
                  isDark ? "text-white" : "text-brand-ink"
                )}
              >
                {step.title}
              </h4>
              <p className={cn("mt-1.5 text-xs leading-relaxed", isDark ? "text-white/55" : "text-brand-muted")}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
