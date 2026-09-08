import type { Config } from "tailwindcss";

// NOTE: Tailwind v4 is CSS-first — the actual color/font tokens that generate
// utility classes (bg-brand-red, text-brand-ink, font-heading, etc.) live in
// app/globals.css under the `@theme` block. This file exists for editor
// tooling / content-path clarity and mirrors those tokens for reference.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#E30613",
          "red-dark": "#B8050F",
          ink: "#0B0F14",
          white: "#FFFFFF",
          light: "#F5F7F8",
        },
      },
    },
  },
};

export default config;
