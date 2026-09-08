// Source: CRE_Solutions_Portfolio.pdf — "Why Choose CRE Solutions" page.

export interface Strength {
  title: string;
  description: string;
  icon: "HardHat" | "BadgeCheck" | "Settings2" | "Wrench" | "Headphones" | "LineChart" | "MapPin" | "Users";
}

export const strengths: Strength[] = [
  {
    title: "Professional Engineering",
    description: "Detailed site assessment, system design and engineering to deliver safe and efficient solutions.",
    icon: "HardHat",
  },
  {
    title: "Quality Equipment",
    description: "Trusted global brands for panels, inverters, batteries and EV chargers.",
    icon: "BadgeCheck",
  },
  {
    title: "Customized Solutions",
    description: "Solutions designed around your requirement, budget and application.",
    icon: "Settings2",
  },
  {
    title: "Quality Installation",
    description: "Professional installation, testing and commissioning by trained technicians.",
    icon: "Wrench",
  },
  {
    title: "Complete Service",
    description: "From initial consultation to installation and after-sales support.",
    icon: "Headphones",
  },
  {
    title: "Monitoring & Maintenance",
    description: "Ongoing system monitoring, maintenance and technical support for long-term performance.",
    icon: "LineChart",
  },
  {
    title: "Islandwide Service",
    description: "Projects and technical services across Sri Lanka.",
    icon: "MapPin",
  },
  {
    title: "Customer Focused",
    description: "Our priority: your requirement, the right solution and the best value.",
    icon: "Users",
  },
];
