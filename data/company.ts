// Source: CRE_Solutions_Portfolio.pdf (client-provided). Do not alter figures
// or claims here without a corresponding update to the source document.

export const company = {
  legalName: "CRE Solutions (Pvt) Ltd",
  fullName: "Ceylon Radiant Energy Solutions",
  shortName: "CRE Solutions",
  tagline: "Engineering the Energy of Tomorrow",
  heroSubline: "Renewable solutions for a cleaner, greener Sri Lanka.",
  founded: 2022,
  description:
    "CRE Solutions (Pvt) Ltd (Ceylon Radiant Energy Solutions) is an energy and electrical solutions company delivering reliable and sustainable solutions across Sri Lanka. We design and deliver customized solutions for residential, commercial and industrial customers, combining engineering expertise with practical experience.",
  mission:
    "To deliver reliable and innovative energy and electrical solutions, creating lasting value for our customers and a sustainable Sri Lanka.",
  vision:
    "To be Sri Lanka's most trusted energy and electrical solutions provider, committed to a cleaner, brighter and more sustainable future.",
  motto: "Cleaner. Greener. Brighter. Together.",
  reachStatement: "Powering a Greener Sri Lanka",
  reachSubStatement: "Islandwide Engineering & Energy Solutions",
  reachDescription:
    "From homes to industries, CRE Solutions delivers reliable and sustainable energy solutions across the island, contributing to a cleaner, greener Sri Lanka.",
  segments: ["Homes", "Businesses", "Industries"],
  stats: [
    { value: "200+", label: "Happy Customers" },
    { value: "200+", label: "Projects Completed" },
    { value: "1.5 MW+", label: "Installed Capacity" },
    { value: "10+", label: "EV Charging Sites" },
  ],
} as const;

// Districts referenced in the portfolio's "Project Reach" map. Counts shown
// in the PDF are approximate ("+") and are only included where the document
// gave an explicit figure for that district — otherwise omitted rather than
// guessed. `name` must match a district `name` in data/sriLankaDistricts.ts
// so <SriLankaMap> can colorize the correct real district shape.
export const reachRegions = [
  { name: "Trincomalee", count: "10+", category: "solar" },
  { name: "Anuradhapura", count: "15+", category: "solar" },
  { name: "Polonnaruwa", count: "5+", category: "offgrid" },
  { name: "Kurunegala", count: "50+", category: "solar" },
  { name: "Matale", count: "5+", category: "ev" },
  { name: "Kandy", count: "5+", category: "electrical" },
  { name: "Kegalle", count: "5+", category: "offgrid" },
  { name: "Gampaha", count: "15+", category: "solar" },
  { name: "Colombo", count: "15+", category: "electrical" },
] as const;

// Negombo is a city within Gampaha District rather than a district of its
// own, so it can't be matched to a district shape in sriLankaDistricts.ts.
// It's rendered as a pin overlay instead; coordinates are an approximate
// placement (Negombo's real position, north-western coastal Gampaha) within
// the Gampaha district's bounding box in that file's shared viewBox.
export const reachCityPins = [
  { name: "Negombo", count: "5+", category: "ev", cx: 42, cy: 517 },
] as const;
