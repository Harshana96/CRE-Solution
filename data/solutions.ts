// Source: CRE_Solutions_Portfolio.pdf — "Our Energy Solutions" and
// "Trusted Technology & Engineering" sections. Icon names map to lucide-react.

export type SolutionSlug =
  | "solar-pv"
  | "energy-storage"
  | "ev-charging"
  | "electrical";

export interface Solution {
  slug: SolutionSlug;
  number: string;
  title: string;
  shortTitle: string;
  icon: "Sun" | "BatteryCharging" | "PlugZap" | "Zap";
  summary: string;
  heroSubline: string;
  features: string[];
  applications: { title: string; description: string }[];
}

export const solutions: Solution[] = [
  {
    slug: "solar-pv",
    number: "01",
    title: "Solar PV Systems",
    shortTitle: "Solar PV",
    icon: "Sun",
    summary: "Clean energy for a brighter tomorrow.",
    heroSubline:
      "On-grid and hybrid solar PV systems engineered for residential, commercial and industrial roofs across Sri Lanka.",
    features: ["On-Grid Systems", "Hybrid Systems", "Residential", "Commercial", "Industrial"],
    applications: [
      {
        title: "Residential Solar",
        description:
          "On-grid and hybrid systems sized for home rooftops, reducing electricity bills with clean, reliable power.",
      },
      {
        title: "Commercial Solar",
        description:
          "Solar PV systems engineered for businesses, restaurants and commercial buildings, built for daily operational load.",
      },
      {
        title: "Industrial Solar",
        description:
          "Larger-scale on-grid and hybrid installations engineered for industrial facilities and high-consumption sites.",
      },
    ],
  },
  {
    slug: "energy-storage",
    number: "02",
    title: "Battery Energy Storage",
    shortTitle: "Energy Storage",
    icon: "BatteryCharging",
    summary: "Reliable power for every need.",
    heroSubline:
      "Hybrid battery storage built on LiFePO4 packs, engineered for reliable backup power and scalable capacity.",
    features: [
      "Hybrid Storage",
      "LiFePO4 Battery Packs",
      "5 kWh / 16 kWh (Low Voltage)",
      "16 kWh+ (High Voltage)",
      "Reliable Backup Power",
    ],
    applications: [
      {
        title: "Low Voltage Systems",
        description: "5 kWh and 16 kWh LiFePO4 battery packs for residential and small commercial backup.",
      },
      {
        title: "High Voltage Systems",
        description: "16 kWh+ high-voltage battery configurations for larger commercial and industrial demand.",
      },
      {
        title: "Hybrid Storage",
        description:
          "Battery storage paired with hybrid inverters for continuous power during grid outages.",
      },
    ],
  },
  {
    slug: "ev-charging",
    number: "03",
    title: "EV Charging Solutions",
    shortTitle: "EV Charging",
    icon: "PlugZap",
    summary: "Charging towards a cleaner future.",
    heroSubline:
      "AC and DC EV charging infrastructure for residential and commercial sites, engineered for reliable daily use.",
    features: [
      "AC Chargers: 7.4 – 20 kW",
      "DC Fast Chargers: 30 / 40 / 60 kW",
      "120 kW Dual Gun",
      "Residential & Commercial",
    ],
    applications: [
      {
        title: "Residential Charging",
        description: "AC chargers from 7.4 kW to 20 kW for home EV charging.",
      },
      {
        title: "Commercial Charging",
        description: "DC fast chargers (30 / 40 / 60 kW) and 120 kW dual-gun units for commercial sites.",
      },
    ],
  },
  {
    slug: "electrical",
    number: "04",
    title: "Electrical Solutions",
    shortTitle: "Electrical",
    icon: "Zap",
    summary: "Safe, reliable and efficient systems.",
    heroSubline:
      "Electrical design, installation and documentation — from residential wiring to industrial electrical systems.",
    features: [
      "Design & Installation",
      "Residential & EV Wiring",
      "Testing & Commissioning",
      "CEB / LECO Documentation",
      "Industrial Electrical Solutions",
    ],
    applications: [
      {
        title: "Design & Installation",
        description: "Electrical system design and installation for residential and commercial properties.",
      },
      {
        title: "Residential & EV Wiring",
        description: "Wiring for homes and EV charging points, tested and commissioned to safety standards.",
      },
      {
        title: "Industrial Electrical Solutions",
        description: "Electrical engineering solutions for industrial facilities, including CEB/LECO documentation.",
      },
    ],
  },
];

export const engineeringProcess = [
  { number: "01", title: "Site Survey", description: "Understand your needs." },
  { number: "02", title: "System Design", description: "Tailored & optimized solutions." },
  { number: "03", title: "Material Selection", description: "Premium & trusted brands." },
  { number: "04", title: "Installation", description: "Professional execution." },
  { number: "05", title: "Testing & Commissioning", description: "Safe and reliable operation." },
  { number: "06", title: "Monitoring & Support", description: "Long-term performance." },
] as const;
