import Image from "next/image";
import { MapPin, Zap } from "lucide-react";
import { projects as allProjects, type Project } from "@/data/projects";
import { placeholderGradient } from "@/lib/projectPlaceholder";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal
      delay={(index % 4) * 0.08}
      className="group h-full overflow-hidden rounded-xl border border-brand-line bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(11,15,20,0.28)]"
    >
      <div
        className="relative aspect-[4/3] overflow-hidden"
        style={project.image ? undefined : { background: placeholderGradient(index) }}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.client}, ${project.location} — ${project.capacity}`}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "repeating-linear-gradient(65deg, transparent 0 20px, rgba(255,255,255,0.15) 20px 21px)",
            }}
          />
        )}
        <span className="absolute left-3 top-3 z-10 rounded-full bg-brand-red px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
          {project.systemType}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-base font-bold text-brand-ink">{project.client}</h3>
        <div className="mt-1.5 flex items-center gap-1.5 text-xs text-brand-muted">
          <MapPin size={13} className="text-brand-red" />
          {project.location}
        </div>
        <div className="mt-3 flex items-start gap-1.5 text-sm font-semibold text-brand-ink">
          <Zap size={14} className="mt-0.5 flex-none text-brand-red" />
          {project.capacity}
        </div>
        <p className="mt-3 text-xs leading-relaxed text-brand-muted">{project.description}</p>
      </div>
    </Reveal>
  );
}

export default function ProjectGrid({ limit }: { limit?: number }) {
  const list = limit ? allProjects.slice(0, limit) : allProjects;

  return (
    <div className={cn("grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4")}>
      {list.map((project, i) => (
        <ProjectCard key={project.slug} project={project} index={i} />
      ))}
    </div>
  );
}
