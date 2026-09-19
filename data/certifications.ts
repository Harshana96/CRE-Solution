// DUMMY preview data — none of these are real certifications. They exist
// only so the section's layout can be previewed instead of showing empty
// slots. `isSample: true` drives a visible "Sample — replace with real
// certifications" notice in the UI so this is never mistaken for real
// content. Replace this whole array with the client's actual certification
// names/issuers/logos, and remove `isSample`, once they're supplied.
export const isSample = true;

export interface Certification {
  name: string;
  issuer: string;
  logo: string | null;
}

export const certifications: Certification[] = [
  { name: "Certification Name", issuer: "Issuing Body", logo: null },
  { name: "Certification Name", issuer: "Issuing Body", logo: null },
  { name: "Certification Name", issuer: "Issuing Body", logo: null },
  { name: "Certification Name", issuer: "Issuing Body", logo: null },
];
