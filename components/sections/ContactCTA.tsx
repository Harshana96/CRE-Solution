import { Phone, Mail } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { contact } from "@/data/contact";

export default function ContactCTA() {
  return (
    <section className="bg-brand-ink py-20">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 rounded-2xl border border-white/10 bg-[#12181f] p-10 lg:flex-row lg:items-center lg:p-14">
          <div>
            <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
              Let&rsquo;s power your future.
            </h2>
            <p className="mt-3 max-w-md text-white/60">
              Your requirement. Our engineering. A smarter energy solution — request a
              free site survey today.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button href={`tel:${contact.phones[0].replace(/\s/g, "")}`} variant="primary">
              <Phone size={16} /> Call {contact.phones[0]}
            </Button>
            <Button href={`mailto:${contact.email}`} variant="outline-light">
              <Mail size={16} /> Email Us
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
