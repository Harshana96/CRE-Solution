// Source: CRE_Solutions_Portfolio.pdf — "Our Works Speaks For Us" page.
// No client photographs were supplied with this build; `image` is left null
// and pages fall back to a generated placeholder. Drop real files into
// /public/images/projects and set `image` to that path when available.
//
// `district` is not from the portfolio — it's the administrative district
// each project's town sits in (a geographic fact, e.g. Polgahawela and
// Wilgodawaththa are both in Kurunegala District), added so the project map
// on /projects can look projects up by district. It must match a `name` in
// data/sriLankaDistricts.ts.

export interface Project {
  slug: string;
  client: string;
  location: string;
  district: string;
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
    systemType: "Solar PV",
    capacity: "5 kW",
    description: "5 kW residential solar PV system in Wilgodawaththa, Kurunegala.",
    image: null,
  },
  {
    slug: "mr-janitha-mallawapitiya",
    client: "Mr. Janitha",
    location: "Mallawapitiya, Kurunegala",
    district: "Kurunegala",
    systemType: "Hybrid",
    capacity: "5 kW",
    description: "5 kW hybrid solar system for residential backup and daily use.",
    image: null,
  },
  {
    slug: "kmee-restaurant-katunayake",
    client: "K-MEE Restaurant",
    location: "Katunayake",
    district: "Gampaha",
    systemType: "Hybrid + Battery",
    capacity: "5 kW Hybrid, 5 kWh Battery",
    description: "5 kW hybrid solar system with 5 kWh battery storage for continuous restaurant operation.",
    image: null,
  },
  {
    slug: "mr-devinda-trincomalee",
    client: "Mr. Devinda",
    location: "Trincomalee",
    district: "Trincomalee",
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
    systemType: "Off-Grid + Battery",
    capacity: "5 kW Off-Grid, 14 kWh Battery",
    description: "5 kW off-grid hybrid inverter system with 14 kWh battery storage.",
    image: null,
  },
  {
    slug: "kiyoto-coffee-mathale",
    client: "Kiyoto Coffee",
    location: "Mathale",
    district: "Matale",
    systemType: "On-Grid + Hybrid + Battery",
    capacity: "12 kW On-Grid, 20 kW Hybrid, 16 kWh Battery",
    description:
      "Combined 12 kW on-grid and 20 kW hybrid solar system with 16 kWh of battery storage for a commercial coffee business.",
    image: null,
  },
  {
    slug: "lb-finance-trincomalee",
    client: "LB Finance Building",
    location: "Trincomalee",
    district: "Trincomalee",
    systemType: "Solar PV",
    capacity: "40 kW",
    description: "40 kW commercial solar PV installation at the LB Finance Building, Trincomalee.",
    image: null,
  },
];
