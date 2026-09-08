import type { Metadata } from "next";
import { Phone, Mail, MapPin, Globe, Sun, BatteryCharging, PlugZap, Zap } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import ContactForm from "@/components/sections/ContactForm";
import Container from "@/components/ui/Container";
import { contact } from "@/data/contact";
import { solutions } from "@/data/solutions";

const iconMap = { Sun, BatteryCharging, PlugZap, Zap };

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with CRE Solutions for solar PV, battery storage, EV charging and electrical solutions across Sri Lanka.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="Let's Power Your Future"
        description="Your requirement. Our engineering. A smarter energy solution."
      />

      <section className="bg-white py-24">
        <Container>
          <div className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {solutions.map((s) => {
              const Icon = iconMap[s.icon];
              return (
                <div
                  key={s.slug}
                  className="flex flex-col items-center gap-3 rounded-xl border border-brand-line bg-brand-light p-6 text-center"
                >
                  <Icon size={22} className="text-brand-red" />
                  <span className="text-xs font-bold uppercase tracking-wide text-brand-ink">
                    {s.shortTitle}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <h2 className="text-2xl font-bold text-brand-ink">Contact Information</h2>
              <ul className="mt-7 flex flex-col gap-6">
                <li className="flex items-start gap-4">
                  <Phone size={18} className="mt-0.5 flex-none text-brand-red" />
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wide text-brand-muted">
                      Phone
                    </div>
                    {contact.phones.map((p) => (
                      <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="block font-semibold text-brand-ink hover:text-brand-red">
                        {p}
                      </a>
                    ))}
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Mail size={18} className="mt-0.5 flex-none text-brand-red" />
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wide text-brand-muted">
                      Email
                    </div>
                    <a href={`mailto:${contact.email}`} className="font-semibold text-brand-ink hover:text-brand-red">
                      {contact.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <MapPin size={18} className="mt-0.5 flex-none text-brand-red" />
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wide text-brand-muted">
                      Office
                    </div>
                    <p className="font-semibold text-brand-ink">
                      {contact.primaryAddress.line1}
                      <br />
                      {contact.primaryAddress.line2}
                    </p>
                    <p className="mt-1 text-xs text-brand-muted">
                      Office address to be confirmed by CRE Solutions.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Globe size={18} className="mt-0.5 flex-none text-brand-red" />
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wide text-brand-muted">
                      Website
                    </div>
                    <a
                      href={`https://${contact.website}`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-brand-ink hover:text-brand-red"
                    >
                      {contact.website}
                    </a>
                  </div>
                </li>
              </ul>
              <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-brand-muted">
                {contact.serviceArea}
              </p>
            </div>

            <div className="rounded-xl border border-brand-line bg-brand-light p-8 sm:p-10">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
