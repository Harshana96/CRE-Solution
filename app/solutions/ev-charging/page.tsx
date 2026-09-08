import type { Metadata } from "next";
import SolutionDetail from "@/components/sections/SolutionDetail";

export const metadata: Metadata = {
  title: "EV Charging Solutions",
  description:
    "AC and DC EV charging infrastructure for residential and commercial sites across Sri Lanka.",
};

export default function EvChargingPage() {
  return <SolutionDetail slug="ev-charging" />;
}
