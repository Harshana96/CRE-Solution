// Google-Maps-style circular pin: a red disc with a white ring and a small
// white bolt icon, matching the reference Google Maps screenshot (red
// circle markers with a white icon inside) rather than a teardrop shape.
export default function MapPinCircle({ size = 22, id }: { size?: number; id: string }) {
  const shadowId = `pin-circle-shadow-${id}`;

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ overflow: "visible" }}>
      <defs>
        <filter id={shadowId} x="-60%" y="-60%" width="220%" height="220%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.1" floodColor="#0B0F14" floodOpacity="0.4" />
        </filter>
      </defs>
      <circle cx="12" cy="12" r="10" fill="#E30613" stroke="#FFFFFF" strokeWidth="2" filter={`url(#${shadowId})`} />
      <path
        d="M12.8 6.5 8 12.6h3.1l-.9 4.9 4.8-6.1h-3.1l.9-4.9z"
        fill="#FFFFFF"
      />
    </svg>
  );
}
