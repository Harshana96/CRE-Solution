// Glossy red 3D map-pin marker (teardrop with a punched-through circular
// hole), matching the reference pin icon supplied by the client. Pure SVG —
// no image asset — so it stays crisp at any zoom level and can be recolored
// via props later if needed.
export default function MapPin3D({
  size = 22,
  id,
}: {
  size?: number;
  /** Unique id suffix so multiple pins on one page don't share gradient/mask ids. */
  id: string;
}) {
  const gradId = `pin-grad-${id}`;
  const glossId = `pin-gloss-${id}`;
  const maskId = `pin-mask-${id}`;

  return (
    <svg
      width={size}
      height={(size * 32) / 24}
      viewBox="0 0 24 32"
      fill="none"
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id={gradId} x1="3" y1="2" x2="20" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF7A6F" />
          <stop offset="45%" stopColor="#E30613" />
          <stop offset="100%" stopColor="#960A10" />
        </linearGradient>
        <radialGradient id={glossId} cx="38%" cy="22%" r="55%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <mask id={maskId}>
          <rect x="0" y="0" width="24" height="32" fill="#FFFFFF" />
          <circle cx="12" cy="12" r="5" fill="#000000" />
        </mask>
      </defs>

      {/* soft ground shadow */}
      <ellipse cx="12" cy="29.5" rx="4.2" ry="1.3" fill="#0B0F14" opacity="0.22" />

      <g mask={`url(#${maskId})`}>
        <path
          d="M12 0C5.373 0 0 5.373 0 12c0 9 12 20 12 20s12-11 12-20C24 5.373 18.627 0 12 0z"
          fill={`url(#${gradId})`}
        />
        <path
          d="M12 0C5.373 0 0 5.373 0 12c0 9 12 20 12 20s12-11 12-20C24 5.373 18.627 0 12 0z"
          fill={`url(#${glossId})`}
        />
      </g>
      <circle cx="12" cy="12" r="5" fill="none" stroke="#5A0308" strokeOpacity="0.35" strokeWidth="0.6" />
    </svg>
  );
}
