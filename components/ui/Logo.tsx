import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Real CRE Solutions logo (client-supplied, /public/logo/cre-logo.png). It
// already bakes in the "CRE SOLUTIONS (PVT) LTD" wordmark, so only the
// tagline is added alongside it here. The logo's black text needs a light
// backing to stay legible over the dark transparent hero header — hence the
// white chip in the `light` tone.
export default function Logo({
  tone = "dark",
  showTagline = true,
}: {
  tone?: "dark" | "light";
  showTagline?: boolean;
}) {
  const isLight = tone === "light";

  return (
    <Link href="/" className="flex items-center gap-3">
      <span
        className={cn(
          "relative flex h-11 w-11 flex-none items-center justify-center rounded-lg",
          isLight && "bg-white p-1 shadow-sm"
        )}
      >
        <Image
          src="/logo/cre-logo.png"
          alt="CRE Solutions (Pvt) Ltd"
          width={160}
          height={160}
          priority
          className="h-full w-full object-contain"
        />
      </span>
      {showTagline && (
        <span
          className={cn(
            "hidden text-[10px] font-semibold uppercase leading-tight tracking-[0.14em] sm:block",
            isLight ? "text-white/70" : "text-brand-muted"
          )}
        >
          Engineering the
          <br />
          Energy of Tomorrow
        </span>
      )}
    </Link>
  );
}
