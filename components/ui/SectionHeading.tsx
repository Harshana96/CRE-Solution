import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  className,
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const isLight = tone === "light";

  return (
    <div
      className={cn(
        "max-w-2xl",
        isCenter && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-brand-red",
            isCenter && "justify-center"
          )}
        >
          <span className="h-[3px] w-6 rounded-full bg-brand-red" />
          {eyebrow}
        </div>
      )}
      <h2
        className={cn(
          "mt-4 text-3xl font-extrabold leading-[1.1] sm:text-4xl lg:text-[2.75rem]",
          isLight ? "text-white" : "text-brand-ink"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            isLight ? "text-white/70" : "text-brand-muted"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
