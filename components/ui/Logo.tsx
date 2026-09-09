import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Real CRE Solutions logo (client-supplied, /public/logo/cre-logo.png). It
// already bakes in the "CRE SOLUTIONS (PVT) LTD" wordmark, so the tagline
// (where shown) is added alongside it separately. The logo's black text
// needs a light backing to stay legible over the dark transparent hero
// header — hence the white chip in the `light` tone.
export default function Logo({
  tone = "dark",
  showTagline = true,
  size = 44,
}: {
  tone?: "dark" | "light";
  showTagline?: boolean;
  /** Logo mark size in pixels (the chip/image is square). */
  size?: number;
}) {
  const isLight = tone === "light";

  return (
    <Link href="/" className="flex items-center gap-3">
      <span
        className={cn(
          "relative flex flex-none items-center justify-center rounded-lg",
          isLight && "bg-white p-1 shadow-sm"
        )}
        style={{ height: size, width: size }}
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
          <span className="text-brand-red">Engineering</span> the
          <br />
          <span className="text-brand-red">Energy</span> of{" "}
          <span className="text-brand-red">Tomorrow</span>
        </span>
      )}
    </Link>
  );
}
