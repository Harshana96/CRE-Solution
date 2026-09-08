"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Mail, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { contact, contactFormServices } from "@/data/contact";

interface FormState {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  service: contactFormServices[0],
  message: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) next.email = "Please enter your email.";
    else if (!EMAIL_RE.test(form.email)) next.email = "Please enter a valid email address.";
    if (!form.message.trim()) next.message = "Please describe your requirement.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  // NOTE: this is a static site — there is no backend endpoint to receive
  // this form yet. Submitting validates the fields and shows a confirmation
  // notice with a mailto: fallback so the enquiry can still reach CRE
  // Solutions. When a backend/API route is added, replace the body of this
  // function with a fetch() call and keep the validation above unchanged.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  }

  const mailtoHref = `mailto:${contact.email}?subject=${encodeURIComponent(
    `Enquiry: ${form.service}`
  )}&body=${encodeURIComponent(
    `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nService: ${form.service}\n\n${form.message}`
  )}`;

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-xl border border-brand-line bg-brand-light p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-red-soft">
          <CheckCircle2 size={24} className="text-brand-red" />
        </div>
        <h3 className="text-lg font-bold text-brand-ink">Thanks, {form.name.split(" ")[0]}.</h3>
        <p className="text-sm text-brand-muted">
          This is a static demo site, so this form doesn&rsquo;t send data anywhere yet. To
          reach CRE Solutions right now, please use the button below to send this
          enquiry by email, or call {contact.phones[0]}.
        </p>
        <Button href={mailtoHref} variant="primary">
          <Mail size={16} /> Send via Email
        </Button>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setForm(initialState);
          }}
          className="text-sm font-semibold text-brand-ink underline underline-offset-4 hover:text-brand-red"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Name" error={errors.name}>
          <input
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputClass(!!errors.name)}
            placeholder="Your full name"
          />
        </Field>
        <Field label="Email" error={errors.email}>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClass(!!errors.email)}
            placeholder="you@example.com"
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Phone (optional)">
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputClass(false)}
            placeholder="07X XXX XXXX"
          />
        </Field>
        <Field label="Service">
          <select
            value={form.service}
            onChange={(e) => update("service", e.target.value)}
            className={inputClass(false)}
          >
            {contactFormServices.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Message" error={errors.message}>
        <textarea
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          rows={5}
          className={inputClass(!!errors.message)}
          placeholder="Tell us about your site and requirement..."
        />
      </Field>

      <Button type="submit" variant="primary" className="w-full sm:w-auto">
        Send Enquiry
      </Button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-brand-ink">{label}</span>
      {children}
      {error && <span className="text-xs font-medium text-brand-red">{error}</span>}
    </label>
  );
}

function inputClass(hasError: boolean) {
  return [
    "rounded-md border bg-white px-4 py-3 text-sm text-brand-ink placeholder:text-brand-muted/60",
    "focus:outline-none focus:ring-2 focus:ring-brand-red/40",
    hasError ? "border-brand-red" : "border-brand-line",
  ].join(" ");
}
