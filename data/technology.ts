// Source: CRE_Solutions_Portfolio.pdf — "Trusted Technology & Engineering" page,
// plus Wiring/Aluminum/Surge Protection added directly by the client
// (Website changes.pdf). These are brands CRE Solutions works with —
// CRE Solutions is NOT described as an official distributor, authorized
// dealer, partner or certified installer of any of these brands — do not add
// that language in copy that references this data.

export interface TechnologyBrand {
  name: string;
  /** Real logo image path once the client supplies one — null shows a
   * placeholder in the meantime. */
  logo: string | null;
  /** Real product/site photo for this specific brand — same placeholder
   * pattern as `logo`. Still pending for every brand (client will supply). */
  image: string | null;
}

// Client-supplied logos (from "CRE technologies" folder), background
// removed, saved to public/logo/brands/<slug>.png. Brands not in this map
// don't have a supplied logo yet.
const LOGO_BY_NAME: Record<string, string> = {
  GoodWe: "/logo/brands/goodwe.png",
  Solis: "/logo/brands/solis.png",
  Huawei: "/logo/brands/huawei.png",
  Deye: "/logo/brands/deye.png",
  Growatt: "/logo/brands/growatt.png",
  Sungrow: "/logo/brands/sungrow.png",
  "Jinko Solar": "/logo/brands/jinko-solar.png",
  Astronergy: "/logo/brands/astronergy.png",
  "Trina Solar": "/logo/brands/trina-solar.png",
  LONGi: "/logo/brands/longi.png",
  "JA Solar": "/logo/brands/ja-solar.png",
  Dyness: "/logo/brands/dyness.png",
  Kelani: "/logo/brands/kelani.png",
};

function brand(name: string): TechnologyBrand {
  return { name, logo: LOGO_BY_NAME[name] ?? null, image: null };
}

export const technologyBrandGroups = [
  {
    category: "Inverter Brands",
    tagline: "Proven performance. A brighter future.",
    brands: ["GoodWe", "Solis", "Huawei", "Deye", "Growatt", "Sungrow"].map(brand),
  },
  {
    category: "Solar Panel Brands",
    tagline: "High quality. Higher possibilities.",
    brands: ["Jinko Solar", "Astronergy", "Trina Solar", "LONGi", "JA Solar"].map(brand),
  },
  {
    category: "Battery Energy Storage",
    tagline: "Store clean energy for an independent tomorrow.",
    brands: ["GoodWe", "Dyness", "Solis"].map(brand),
  },
  {
    category: "EV Charging Solutions",
    tagline: "Powering cleaner mobility.",
    brands: ["BENNY"].map(brand),
  },
  {
    category: "Wiring",
    tagline: "Safe, certified cabling for every installation.",
    brands: ["Kelani", "KBE", "LAPP"].map(brand),
  },
  {
    category: "Aluminum",
    tagline: "Durable mounting and structural components.",
    brands: ["Lanka Aluminium", "Swistech"].map(brand),
  },
  {
    category: "Surge Protection",
    tagline: "Protecting systems from electrical surges.",
    brands: ["Schneider", "ZBENY"].map(brand),
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
