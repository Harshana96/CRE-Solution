import type { Metadata } from "next";
import SolutionDetail from "@/components/sections/SolutionDetail";

export const metadata: Metadata = {
  title: "Battery Energy Storage",
  description:
    "LiFePO4 hybrid battery storage systems — low and high voltage — for reliable backup power across Sri Lanka.",
};

export default function EnergyStoragePage() {
  return <SolutionDetail slug="energy-storage" />;
}
