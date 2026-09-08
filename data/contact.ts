// Source: CRE_Solutions_Portfolio.pdf.
//
// IMPORTANT — ADDRESS CONFLICT: the portfolio shows two different office
// addresses paired with two different phone/email sets:
//   - Page 7 ("Why Choose CRE"): No. 123, High Level Road, Maharagama, Sri Lanka
//     with +94 76 123 4567 / +94 11 234 5678 / info@cresolutions.lk
//   - Page 8 ("Let's Power Your Future" / final CTA page): No. 8, Malkaduwawa
//     Circular Road, Wehera, Kurunegala with 077 217 0258 / 070 501 2499 /
//     the gmail address below.
// These were NOT merged or corrected. `primaryAddress` below is displayed on
// the site (paired with the phone/email set that matches it) because it is
// the set used on the portfolio's dedicated contact/CTA page — but this is a
// display choice, not a resolution of the conflict.
// TODO(client): confirm the single official registered office address before
// launch, and update `primaryAddress` / `alternateAddress` accordingly.

export const contact = {
  phones: ["077 217 0258", "070 501 2499"],
  email: "infcresolution@gmail.com",
  website: "www.cresolutions.lk",
  primaryAddress: {
    line1: "No. 8, Malkaduwawa Circular Road, Wehera",
    line2: "Kurunegala, Sri Lanka",
    source: "Portfolio, contact / CTA page",
  },
  alternateAddress: {
    line1: "No. 123, High Level Road",
    line2: "Maharagama, Sri Lanka",
    phones: ["+94 76 123 4567", "+94 11 234 5678"],
    email: "info@cresolutions.lk",
    source: "Portfolio, \"Why Choose CRE Solutions\" page",
  },
  serviceArea: "Islandwide service across Sri Lanka",
} as const;

export const contactFormServices = [
  "Solar PV Solutions",
  "Battery Storage",
  "EV Charging Solutions",
  "Electrical Solutions",
  "Other",
] as const;
