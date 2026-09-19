// No certifications supplied by the client yet — add real entries here
// (name + logo path once the client sends the actual certificate/logo
// files) and the Certifications section will render them automatically.
// Do not invent certification names/bodies; leave this empty until real
// ones are confirmed.

export interface Certification {
  name: string;
  issuer: string;
  logo: string | null;
}

export const certifications: Certification[] = [];
