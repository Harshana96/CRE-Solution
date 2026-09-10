import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Real CRE Solutions logo (client-supplied, /public/logo/cre-logo.png,
// transparent background). Rendered with no backing chip — client asked for
// the white box behind it removed. It already bakes in the "CRE SOLUTIONS
// (PVT) LTD" wordmark, so the tagline (where shown) is added separately.
export default function Logo({
  tone = "dark",
  showTagline = true,
  size = 44,
  expandedSize,
  expanded = false,
}: {
  tone?: "dark" | "light";
  showTagline?: boolean;
  /** Logo mark size in pixels (the chip/image is square). This is also the
   * space reserved in normal layout flow when `expandedSize` is set. */
  size?: number;
  /**
   * When set, the logo mark floats at this larger size (absolutely
   * positioned, so it doesn't grow the header/row it sits in) while
   * `expanded` is true, and smoothly shrinks down to `size` when it's
   * false — e.g. a big logo over the hero that docks to nav size on scroll.
   * Anchored at its top edge (not vertically centered) so growing larger
   * only extends downward, never clipping against the viewport's top edge.
   */
  expandedSize?: number;
  expanded?: boolean;
}) {
  const isLight = tone === "light";
  const isFloating = expandedSize !== undefined;
  const chipSize = isFloating ? (expanded ? expandedSize : size) : size;

  const chip = (
    <span
      className={cn(
        "flex items-center justify-center",
        isFloating ? "absolute left-0 top-0 transition-[width,height] duration-500 ease-out" : "relative flex-none"
      )}
      style={{ height: chipSize, width: chipSize }}
    >
      <Image
        src="/logo/cre-logo.png"
        alt="CRE Solutions (Pvt) Ltd"
        width={200}
        height={200}
        priority
        className="h-full w-full object-contain"
      />
    </span>
  );

  return (
    <Link href="/" className="flex items-center gap-3">
      {isFloating ? (
        <span className="relative flex-none" style={{ height: size, width: size }}>
          {chip}
        </span>
      ) : (
        chip
      )}
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
