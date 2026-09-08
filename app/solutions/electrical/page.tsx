import type { Metadata } from "next";
import SolutionDetail from "@/components/sections/SolutionDetail";

export const metadata: Metadata = {
  title: "Electrical Solutions",
  description:
    "Electrical design, installation, testing, commissioning and CEB/LECO documentation for residential and industrial sites.",
};

export default function ElectricalPage() {
  return <SolutionDetail slug="electrical" />;
}
