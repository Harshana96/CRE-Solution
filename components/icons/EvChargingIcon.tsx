import Image from "next/image";

// Client-supplied icon (pre-colored brand red). Since it's a raster image it
// can't use `currentColor` — callers that need it to flip white (sitting on
// a solid-red background, or on hover of a red background) add the
// `brightness-0 invert` filter utilities via className instead of a text
// color class.
export default function EvChargingIcon({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <Image
      src="/images/icons/ev-charging.png"
      alt=""
      width={size}
      height={size}
      className={className}
    />
  );
}
