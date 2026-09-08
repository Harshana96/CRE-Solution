import { Mail, MapPin, Phone, Globe } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { company } from "@/data/company";
import { contact } from "@/data/contact";
import { solutions } from "@/data/solutions";

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Why CRE", href: "/why-cre" },
  { label: "Technology", href: "/technology" },
  { label: "Projects", href: "/projects" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-ink text-white/70">
      <div className="container-cre grid grid-cols-1 gap-12 border-b border-white/10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo tone="light" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
            {company.description}
          </p>
        </div>

        <div>
          <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.14em] text-white">
            Solutions
          </h4>
          <ul className="flex flex-col gap-3 text-sm">
            {solutions.map((s) => (
              <li key={s.slug}>
                <a href={`/solutions/${s.slug}`} className="transition-colors hover:text-brand-red">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.14em] text-white">
            Company
          </h4>
          <ul className="flex flex-col gap-3 text-sm">
            {companyLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-colors hover:text-brand-red">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.14em] text-white">
            Contact
          </h4>
          <ul className="flex flex-col gap-4 text-sm">
            <li className="flex items-start gap-3">
              <Phone size={16} className="mt-0.5 flex-none text-brand-red" />
              <span>
                {contact.phones.map((p) => (
                  <span key={p} className="block">
                    {p}
                  </span>
                ))}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={16} className="mt-0.5 flex-none text-brand-red" />
              <a href={`mailto:${contact.email}`} className="hover:text-brand-red">
                {contact.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 flex-none text-brand-red" />
              <span>
                {contact.primaryAddress.line1}
                <br />
                {contact.primaryAddress.line2}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Globe size={16} className="mt-0.5 flex-none text-brand-red" />
              <a
                href={`https://${contact.website}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand-red"
              >
                {contact.website}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-cre flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/45 sm:flex-row">
        <span>
          © {new Date().getFullYear()} {company.legalName}. {contact.serviceArea}.
        </span>
        <span className="font-semibold uppercase tracking-[0.1em] text-white/60">
          {company.motto}
        </span>
      </div>
    </footer>
  );
}
