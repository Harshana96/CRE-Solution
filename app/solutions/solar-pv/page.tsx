import type { Metadata } from "next";
import SolutionDetail from "@/components/sections/SolutionDetail";

export const metadata: Metadata = {
  title: "Solar PV Systems",
  description:
    "On-grid and hybrid solar PV systems for residential, commercial and industrial sites across Sri Lanka.",
};

export default function SolarPvPage() {
  return <SolutionDetail slug="solar-pv" />;
}
