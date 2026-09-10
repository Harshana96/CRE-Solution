// Source: CRE_Solutions_Portfolio.pdf — "Our Works Speaks For Us" page.
//
// `image`: real client site photos, selected from the "Project wise photos"
// drive folder (one representative photo per project — not every photo in
// that folder was used), resized/compressed and renamed to
// public/images/projects/<slug>.jpg. Still `null` for the two projects with
// no matching folder in that drive export (Ganegoda Temple, Mr. Devinda) —
// pages fall back to a generated placeholder for those until real photos
// are supplied. Note: the drive folder named "Trincomalee site (MR Dewinda)"
// is actually the LB Finance Building shoot (visible "LB FINANCE" signage
// throughout), not a separate Devinda site — used for lb-finance-trincomalee
// below, not mr-devinda-trincomalee.
//
// `district` is not from the portfolio — it's the administrative district
// each project's town sits in (a geographic fact, e.g. Polgahawela and
// Wilgodawaththa are both in Kurunegala District), added so the project map
// on /projects can look projects up by district. It must match a `name` in
// data/sriLankaDistricts.ts.
//
// `mapX`/`mapY` are an approximate, illustrative pin position for this
// project within its district — placed near the district's centroid (and
// spread apart from sibling projects in the same district so each gets its
// own pin), against the same viewBox as data/sriLankaDistricts.ts. Not
// GPS-precise; used only by the zoomable map on /projects (SriLankaMapPins).

export interface Project {
  slug: string;
  client: string;
  location: string;
  district: string;
  mapX: number;
  mapY: number;
  systemType: string;
  capacity: string;
  description: string;
  image: string | null;
}

export const projects: Project[] = [
  {
    slug: "ganegoda-temple-polgahawela",
    client: "Ganegoda Temple",
    location: "Polgahawela",
    district: "Kurunegala",
    mapX: 148.76,
    mapY: 472.59,
    systemType: "On-Grid",
    capacity: "3 kW",
    description: "3 kW on-grid solar PV installation at Ganegoda Temple, Polgahawela.",
    image: null,
  },
  {
    slug: "mr-sampath-wilgodawaththa",
    client: "Mr. Sampath",
    location: "Wilgodawaththa, Kurunegala",
    district: "Kurunegala",
    mapX: 108.76,
    mapY: 417.59,
    systemType: "Solar PV",
    capacity: "5 kW",
    description: "5 kW residential solar PV system in Wilgodawaththa, Kurunegala.",
    image: "/images/projects/mr-sampath-wilgodawaththa.jpg",
  },
  {
    slug: "mr-janitha-mallawapitiya",
    client: "Mr. Janitha",
    location: "Mallawapitiya, Kurunegala",
    district: "Kurunegala",
    mapX: 138.76,
    mapY: 392.59,
    systemType: "Hybrid",
    capacity: "5 kW",
    description: "5 kW hybrid solar system for residential backup and daily use.",
    image: "/images/projects/mr-janitha-mallawapitiya.jpg",
  },
  {
    slug: "kmee-restaurant-katunayake",
    client: "K-MEE Restaurant",
    location: "Katunayake",
    district: "Gampaha",
    mapX: 58.33,
    mapY: 520.36,
    systemType: "Hybrid + Battery",
    capacity: "5 kW Hybrid, 5 kWh Battery",
    description: "5 kW hybrid solar system with 5 kWh battery storage for continuous restaurant operation.",
    image: "/images/projects/kmee-restaurant-katunayake.jpg",
  },
  {
    slug: "mr-devinda-trincomalee",
    client: "Mr. Devinda",
    location: "Trincomalee",
    district: "Trincomalee",
    mapX: 263.22,
    mapY: 237.04,
    systemType: "Hybrid + On-Grid + Battery",
    capacity: "3 × 5 kW Hybrid, 5 kW On-Grid, 20 kW Hybrid, 14.3 kWh Battery",
    description:
      "A multi-system installation combining three 5 kW hybrid units, a 5 kW on-grid system, a 20 kW hybrid system and 14.3 kWh of battery storage.",
    image: null,
  },
  {
    slug: "mr-bommugala-kurunegala",
    client: "Mr. Bommugala",
    location: "Kurunegala",
    district: "Kurunegala",
    mapX: 83.76,
    mapY: 447.59,
    systemType: "Off-Grid + Battery",
    capacity: "5 kW Off-Grid, 14 kWh Battery",
    description: "5 kW off-grid hybrid inverter system with 14 kWh battery storage.",
    image: "/images/projects/mr-bommugala-kurunegala.jpg",
  },
  {
    slug: "kiyoto-coffee-mathale",
    client: "Kiyoto Coffee",
    location: "Mathale",
    district: "Matale",
    mapX: 220.83,
    mapY: 433.36,
    systemType: "On-Grid + Hybrid + Battery",
    capacity: "12 kW On-Grid, 20 kW Hybrid, 16 kWh Battery",
    description:
      "Combined 12 kW on-grid and 20 kW hybrid solar system with 16 kWh of battery storage for a commercial coffee business.",
    image: "/images/projects/kiyoto-coffee-mathale.jpg",
  },
  {
    slug: "lb-finance-trincomalee",
    client: "LB Finance Building",
    location: "Trincomalee",
    district: "Trincomalee",
    mapX: 313.22,
    mapY: 282.04,
    systemType: "Solar PV",
    capacity: "40 kW",
    description: "40 kW commercial solar PV installation at the LB Finance Building, Trincomalee.",
    image: "/images/projects/lb-finance-trincomalee.jpg",
  },
];
