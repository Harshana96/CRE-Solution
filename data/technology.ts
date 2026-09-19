// Source: CRE_Solutions_Portfolio.pdf — "Trusted Technology & Engineering" page,
// plus Wiring/Aluminum/Surge Protection added directly by the client
// (Website changes.pdf). These are brands CRE Solutions works with —
// CRE Solutions is NOT described as an official distributor, authorized
// dealer, partner or certified installer of any of these brands — do not add
// that language in copy that references this data.

export const technologyBrandGroups = [
  {
    category: "Inverter Brands",
    tagline: "Proven performance. A brighter future.",
    brands: ["GoodWe", "Solis", "Huawei", "Deye", "Growatt", "Sungrow"],
  },
  {
    category: "Solar Panel Brands",
    tagline: "High quality. Higher possibilities.",
    brands: ["Jinko Solar", "Astronergy", "Trina Solar", "LONGi", "JA Solar"],
  },
  {
    category: "Battery Energy Storage",
    tagline: "Store clean energy for an independent tomorrow.",
    brands: ["GoodWe", "Dyness", "Solis"],
  },
  {
    category: "EV Charging Solutions",
    tagline: "Powering cleaner mobility.",
    brands: ["BENNY"],
  },
  {
    category: "Wiring",
    tagline: "Safe, certified cabling for every installation.",
    brands: ["Kelani", "KBE", "LAPP"],
  },
  {
    category: "Aluminum",
    tagline: "Durable mounting and structural components.",
    brands: ["Lanka Aluminium", "Swistech"],
  },
  {
    category: "Surge Protection",
    tagline: "Protecting systems from electrical surges.",
    brands: ["Schneider", "ZBENY"],
  },
] as const;

export const batteryHighlights = [
  "5 kWh / 16 kWh (Low Voltage)",
  "16 kWh+ (High Voltage)",
  "Reliable Backup Power",
  "Modular & Scalable Solutions",
  "10 Years Warranty",
] as const;

export const evChargingHighlights = [
  "AC Chargers: 7.4 – 20 kW",
  "DC Fast Chargers: 30 / 40 / 60 kW",
  "120 kW Dual Gun",
  "Smart & Reliable Charging",
  "For Residential and Commercial",
] as const;
