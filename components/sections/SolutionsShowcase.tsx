"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { X, Sun, BatteryCharging, PlugZap, Zap, Check, Mail } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { solutions, type Solution } from "@/data/solutions";
import { contact } from "@/data/contact";
import { company } from "@/data/company";

const iconMap = { Sun, BatteryCharging, PlugZap, Zap };

export default function SolutionsShowcase() {
  const [active, setActive] = useState<Solution | null>(null);

  return (
    <section className="bg-white py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Our Solutions"
            title={company.reachStatement}
            description={company.description}
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((solution, i) => {
            const Icon = iconMap[solution.icon];
            return (
              <Reveal key={solution.slug} delay={i * 0.08}>
                <button
                  type="button"
                  onClick={() => setActive(solution)}
                  className="group relative flex h-full w-full flex-col justify-end overflow-hidden rounded-xl bg-brand-ink p-6 text-left aspect-[4/5] transition-transform duration-200 hover:-translate-y-1.5"
                >
                  {solution.image ? (
                    <Image
                      src={solution.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover opacity-55 transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-70"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(115deg, rgba(227,6,19,0.12) 0 44px, transparent 44px 88px)",
                      }}
                    />
                  )}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/60 to-brand-ink/10"
                  />

                  <div className="relative z-10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-red">
                      <Icon size={22} className="text-white" />
                    </div>
                    <span className="mt-4 block text-xs font-bold uppercase tracking-widest text-brand-red">
                      {solution.number}
                    </span>
                    <h3 className="mt-1 text-xl font-bold text-white">{solution.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">{solution.summary}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white underline decoration-brand-red decoration-2 underline-offset-4">
                      View options
                    </span>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </Container>

      {active && <SolutionPopup solution={active} onClose={() => setActive(null)} />}
    </section>
  );
}

function SolutionPopup({ solution, onClose }: { solution: Solution; onClose: () => void }) {
  const [selected, setSelected] = useState<Solution>(solution);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next: { name?: string; email?: string } = {};
    if (!name.trim()) next.name = "Please enter your name.";
    if (!email.trim()) next.email = "Please enter your email.";
    else if (!EMAIL_RE.test(email)) next.email = "Please enter a valid email address.";
    setErrors(next);
    if (Object.keys(next).length === 0) setSubmitted(true);
  }

  const mailtoHref = `mailto:${contact.email}?subject=${encodeURIComponent(
    `Quote request: ${selected.title}`
  )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nSolution: ${selected.title}`)}`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-ink/70 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${selected.title} solutions`}
      onClick={onClose}
    >
      <div
        className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-7 sm:p-9"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-brand-muted transition-colors hover:bg-brand-light hover:text-brand-ink"
        >
          <X size={20} />
        </button>

        <p className="text-xs font-bold uppercase tracking-widest text-brand-red">
          Solution {selected.number}
        </p>
        <h3 className="mt-1 text-2xl font-extrabold text-brand-ink sm:text-3xl">{selected.title}</h3>
        <p className="mt-2 text-sm text-brand-muted">{selected.heroSubline}</p>

        {/* All four solutions, so switching between them doesn't require closing the popup */}
        <div className="mt-6 flex flex-wrap gap-2">
          {solutions.map((s) => {
            const Icon = iconMap[s.icon];
            const isSelected = s.slug === selected.slug;
            return (
              <button
                key={s.slug}
                type="button"
                onClick={() => setSelected(s)}
                className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-xs font-bold uppercase tracking-wide transition-colors ${
                  isSelected
                    ? "border-brand-red bg-brand-red-soft text-brand-red-dark"
                    : "border-brand-line text-brand-ink hover:border-brand-red/40"
                }`}
              >
                <Icon size={15} className={isSelected ? "text-brand-red" : "text-brand-muted"} />
                {s.shortTitle}
              </button>
            );
          })}
        </div>

        <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {selected.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm font-medium text-brand-ink">
              <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-brand-red-soft">
                <Check size={12} className="text-brand-red" />
              </span>
              {f}
            </li>
          ))}
        </ul>

        <div className="my-7 h-px bg-brand-line" />

        {submitted ? (
          <div className="flex flex-col items-start gap-3 rounded-lg bg-brand-light p-6">
            <p className="text-sm font-bold text-brand-ink">Thanks{name ? `, ${name.split(" ")[0]}` : ""}.</p>
            <p className="text-sm text-brand-muted">
              This is a static demo site, so this form doesn&rsquo;t send data yet. Use the button below to
              send this request by email, or call {contact.phones[0]}.
            </p>
            <a
              href={mailtoHref}
              className="inline-flex items-center gap-2 rounded-md bg-brand-red px-5 py-3 text-sm font-semibold text-white"
            >
              <Mail size={15} /> Send via Email
            </a>
          </div>
        ) : (
          <form noValidate onSubmit={handleSubmit}>
            <p className="text-sm font-bold uppercase tracking-widest text-brand-ink">Contact Information</p>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-brand-muted">Name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`rounded-md border bg-brand-light px-3.5 py-2.5 text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-red/40 ${
                    errors.name ? "border-brand-red" : "border-brand-line"
                  }`}
                  placeholder="Your full name"
                />
                {errors.name && <span className="text-xs text-brand-red">{errors.name}</span>}
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-brand-muted">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`rounded-md border bg-brand-light px-3.5 py-2.5 text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-red/40 ${
                    errors.email ? "border-brand-red" : "border-brand-line"
                  }`}
                  placeholder="you@example.com"
                />
                {errors.email && <span className="text-xs text-brand-red">{errors.email}</span>}
              </label>
            </div>
            <button
              type="submit"
              className="mt-6 w-full rounded-md bg-brand-red px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 sm:w-auto"
            >
              Get Quote
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
