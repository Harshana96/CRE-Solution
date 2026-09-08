import Link from "next/link";
import { cn } from "@/lib/utils";

// Placeholder logo mark — the client portfolio shows a red arc + "CRE" wordmark
// logo. Replace this component's contents with an <Image> of the real logo
// file (e.g. /public/logo/cre-logo.svg) once the asset is supplied.
export default function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const isLight = tone === "light";

  return (
    <Link href="/" className="flex items-center gap-3">
      <span className="relative flex h-10 w-10 flex-none items-center justify-center">
        <svg viewBox="0 0 42 42" fill="none" className="h-10 w-10">
          <path
            d="M21 2a19 19 0 0 1 0 38"
            stroke="#E30613"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <path
            d={
              isLight
                ? "M21 8a13 13 0 0 1 0 26"
                : "M21 8a13 13 0 0 1 0 26"
            }
            stroke={isLight ? "#FFFFFF" : "#0B0F14"}
            strokeWidth="4.5"
            strokeLinecap="round"
            opacity="0.85"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-heading text-lg font-extrabold tracking-tight",
            isLight ? "text-white" : "text-brand-ink"
          )}
        >
          CRE <span className="text-brand-red">SOLUTIONS</span>
        </span>
        <span
          className={cn(
            "mt-0.5 text-[10px] font-semibold uppercase tracking-[0.14em]",
            isLight ? "text-white/60" : "text-brand-muted"
          )}
        >
          Engineering the Energy of Tomorrow
        </span>
      </span>
    </Link>
  );
}
