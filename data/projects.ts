// Source: the client's "Project wise photos" drive export
// (E:\CRE Solution images\Project wise photos-...\Project wise photos),
// which contains 10 numbered project folders (01, 02, 04–11 — 03 is absent
// from this export) plus a "For website and google" folder of promotional
// graphics that isn't a project. Folders "06. Mr Sampath(Kurunegala))" and
// "11. Mr Sampath (Kurunegala)" name the same client, so they're combined
// into one entry below (nine projects total).
//
// `client` deliberately mirrors each folder's own name (cleaned up only for
// spelling/capitalization, e.g. "Resturant" -> "Restaurant") rather than a
// separately composed title, per client instruction.
//
// `capacity`/`systemType` are filled in only where the folder name itself
// states a figure (e.g. "5kw offgrid" in the Kamal folder) or where this
// client/site also appeared in CRE_Solutions_Portfolio.pdf with matching
// name + district (Sampath, KMEE, Janitha, Kiyoto Coffee) — never invented.
// `capacity` is optional and simply omitted from the UI where unknown,
// rather than filled with a guess.
//
// One naming note: the "01. Trincomalee site (MR Dewinda)" folder's photos
// all show a building branded "LB FINANCE" — kept named after the folder
// (Mr. Dewinda) as instructed, since a building can carry a ground-floor
// tenant's signage while the rooftop system itself was commissioned by a
// different owner. Flagged here in case that needs confirming.
//
// `district` is not from either source — it's the administrative district
// each project's town sits in (a geographic fact), added so the project map
// on /projects can look projects up by district. Must match a `name` in
// data/sriLankaDistricts.ts.
//
// `mapX`/`mapY` are an approximate, illustrative pin position for this
// project within its district — placed near the district's centroid (and
// spread apart from sibling projects in the same district so each gets its
// own pin), against the same viewBox as data/sriLankaDistricts.ts. Not
// GPS-precise; used only by the zoomable map on /projects (SriLankaMapPins).
//
// `image`: one representative photo per project (not every photo in every
// folder), resized/compressed and renamed to
// public/images/projects/<slug>.jpg.

export interface Project {
  slug: string;
  client: string;
  location: string;
  district: string;
  mapX: number;
  mapY: number;
  systemType: string;
  capacity?: string;
  description: string;
  image: string | null;
}

export const projects: Project[] = [
  {
    slug: "trincomalee-mr-dewinda",
    client: "Trincomalee Site (Mr. Dewinda)",
    location: "Trincomalee",
    district: "Trincomalee",
    mapX: 263.22,
    mapY: 237.04,
    systemType: "Solar PV",
    description: "Solar PV installation at the Trincomalee site commissioned by Mr. Dewinda.",
    image: "/images/projects/trincomalee-mr-dewinda.jpg",
  },
  {
    slug: "mr-kamal-dambokka-kurunegala",
    client: "Mr. Kamal (Dambokka, Kurunegala)",
    location: "Dambokka, Kurunegala",
    district: "Kurunegala",
    mapX: 75,
    mapY: 380,
    systemType: "Off-Grid",
    capacity: "5 kW Off-Grid",
    description: "5 kW off-grid solar PV system at Dambokka, Kurunegala.",
    image: "/images/projects/mr-kamal-dambokka-kurunegala.jpg",
  },
  {
    slug: "dr-weerasinghe-kurunegala",
    client: "Dr. Weerasinghe (Kurunegala)",
    location: "Kurunegala",
    district: "Kurunegala",
    mapX: 160,
    mapY: 360,
    systemType: "Solar PV",
    description: "Residential solar PV installation in Kurunegala.",
    image: "/images/projects/dr-weerasinghe-kurunegala.jpg",
  },
  {
    slug: "dr-yamuna-kurunegala",
    client: "Dr. Yamuna (Kurunegala)",
    location: "Kurunegala",
    district: "Kurunegala",
    mapX: 95,
    mapY: 495,
    systemType: "Solar PV",
    description: "Residential solar PV installation in Kurunegala.",
    image: "/images/projects/dr-yamuna-kurunegala.jpg",
  },
  {
    slug: "mr-sampath-kurunegala",
    client: "Mr. Sampath (Kurunegala)",
    location: "Wilgodawaththa, Kurunegala",
    district: "Kurunegala",
    mapX: 118.76,
    mapY: 427.59,
    systemType: "Solar PV",
    capacity: "5 kW",
    description: "5 kW residential solar PV system in Wilgodawaththa, Kurunegala.",
    image: "/images/projects/mr-sampath-kurunegala.jpg",
  },
  {
    slug: "kmee-restaurant-gampaha",
    client: "KMEE Restaurant (Gampaha)",
    location: "Katunayake, Gampaha",
    district: "Gampaha",
    mapX: 58.33,
    mapY: 520.36,
    systemType: "Hybrid + Battery",
    capacity: "5 kW Hybrid, 5 kWh Battery",
    description: "5 kW hybrid solar system with 5 kWh battery storage for continuous restaurant operation.",
    image: "/images/projects/kmee-restaurant-gampaha.jpg",
  },
  {
    slug: "mr-piyumal-kurunegala",
    client: "Mr. Piyumal (Kurunegala)",
    location: "Kurunegala",
    district: "Kurunegala",
    mapX: 155,
    mapY: 480,
    systemType: "Solar PV",
    description: "Residential solar PV installation in Kurunegala.",
    image: "/images/projects/mr-piyumal-kurunegala.jpg",
  },
  {
    slug: "kiyoto-coffee-mathale",
    client: "Kiyoto Coffee (Mathale)",
    location: "Mathale",
    district: "Matale",
    mapX: 220.83,
    mapY: 433.36,
    systemType: "On-Grid + Hybrid + Battery",
    capacity: "12 kW On-Grid, 20 kW Hybrid, 16 kWh Battery",
    description:
      "Combined 12 kW on-grid and 20 kW hybrid solar system with 16 kWh of battery storage for a commercial coffee business — 32 kW total.",
    image: "/images/projects/kiyoto-coffee-mathale.jpg",
  },
  {
    slug: "mr-janitha-just-computer-kurunegala",
    client: "Mr. Janitha (Just Computer)",
    location: "Mallawapitiya, Kurunegala",
    district: "Kurunegala",
    mapX: 70,
    mapY: 455,
    systemType: "Hybrid",
    capacity: "5 kW",
    description: "5 kW hybrid solar system for residential backup and daily use.",
    image: "/images/projects/mr-janitha-just-computer-kurunegala.jpg",
  },
];
