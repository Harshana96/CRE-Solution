"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { sriLankaDistricts, sriLankaMapViewBox } from "@/data/sriLankaDistricts";
import { reachRegions } from "@/data/company";
import { projects } from "@/data/projects";
import MapPinCircle from "@/components/ui/MapPinCircle";

const BRAND_RED = "#E30613";
const MIN_ZOOM = 1;
const MAX_ZOOM = 6;
const PIN_BASE_SCALE = 0.55;

const [VB_WIDTH, VB_HEIGHT] = sriLankaMapViewBox.split(" ").slice(2).map(Number);
const CENTER = { x: VB_WIDTH / 2, y: VB_HEIGHT / 2 };
const DEFAULT_ORIGIN = { ...CENTER };
// Longest side capped by viewport height; the other side derives from the
// real aspect ratio so neither dimension gets clamped independently (the
// bug that made the map render squashed into a sliver — see MAX_BOX below).
const ASPECT = VB_WIDTH / VB_HEIGHT;
const MAX_BOX_HEIGHT = "min(74vh, 680px)";

const regionByName = new Map<string, (typeof reachRegions)[number]>(
  reachRegions.map((r) => [r.name, r])
);
const districtByName = new Map(sriLankaDistricts.map((d) => [d.name, d]));

// Below this zoom, districts show a single count badge (matching the real
// portfolio figures, e.g. "50+") instead of individual pins — spreading 50
// dots across Kurunegala at the overview zoom would just be noise. Zooming
// past the threshold (scroll, +/- buttons, or clicking a district) reveals
// the pins underneath it.
const CLUSTER_ZOOM_THRESHOLD = 1.8;
// Cap on how many *unnamed* filler pins we draw per district beyond the
// named projects we actually have client/capacity details for — keeps a
// district with a "50+" count from turning into an unreadable pincushion,
// while still visually reflecting that there are more completed projects
// than the ones we can name.
const MAX_FILLER_PINS_PER_DISTRICT = 5;

interface FillerPin {
  id: string;
  district: string;
  mapX: number;
  mapY: number;
}

function parseCount(count: string): number {
  const n = parseInt(count, 10);
  return Number.isNaN(n) ? 0 : n;
}

const namedCountByDistrict = new Map<string, number>();
for (const project of projects) {
  namedCountByDistrict.set(project.district, (namedCountByDistrict.get(project.district) ?? 0) + 1);
}

// Deterministic golden-angle spiral so filler pins fan out evenly around a
// district's centroid without overlapping — same output on every render,
// no randomness to fight with React.
function fillerOffset(index: number) {
  const angle = index * 137.508 * (Math.PI / 180);
  const radius = 9 + index * 4.5;
  return { dx: Math.cos(angle) * radius, dy: Math.sin(angle) * radius };
}

const fillerPins: FillerPin[] = reachRegions.flatMap((region) => {
  const district = districtByName.get(region.name);
  if (!district) return [];
  const named = namedCountByDistrict.get(region.name) ?? 0;
  const extra = Math.min(Math.max(parseCount(region.count) - named, 0), MAX_FILLER_PINS_PER_DISTRICT);
  return Array.from({ length: extra }, (_, i) => {
    const { dx, dy } = fillerOffset(i);
    return {
      id: `${region.name}-filler-${i}`,
      district: region.name,
      mapX: district.cx + dx,
      mapY: district.cy + dy,
    };
  });
});

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function SriLankaMapPins() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const [origin, setOrigin] = useState(DEFAULT_ORIGIN);
  const dragState = useRef<{ startX: number; startY: number; origin: { x: number; y: number } } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  function toSvgPoint(clientX: number, clientY: number) {
    const rect = svgRef.current!.getBoundingClientRect();
    return {
      x: ((clientX - rect.left) / rect.width) * VB_WIDTH,
      y: ((clientY - rect.top) / rect.height) * VB_HEIGHT,
    };
  }

  function zoomAt(screenPoint: { x: number; y: number }, factor: number) {
    const newZoom = clamp(zoom * factor, MIN_ZOOM, MAX_ZOOM);
    const mapCoord = {
      x: origin.x + (screenPoint.x - CENTER.x) / zoom,
      y: origin.y + (screenPoint.y - CENTER.y) / zoom,
    };
    const newOrigin =
      newZoom === MIN_ZOOM
        ? { ...DEFAULT_ORIGIN }
        : {
            x: mapCoord.x - (screenPoint.x - CENTER.x) / newZoom,
            y: mapCoord.y - (screenPoint.y - CENTER.y) / newZoom,
          };
    setZoom(newZoom);
    setOrigin(newOrigin);
  }

  // Attached as a native, non-passive listener (not React's onWheel) so
  // preventDefault() actually stops the page from scrolling while zooming —
  // React registers onWheel as passive by default, which silently ignores
  // preventDefault() and lets the page scroll underneath the map.
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const onWheel = (e: globalThis.WheelEvent) => {
      e.preventDefault();
      const point = toSvgPoint(e.clientX, e.clientY);
      zoomAt(point, e.deltaY < 0 ? 1.18 : 1 / 1.18);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoom, origin]);

  function zoomToDistrict(cx: number, cy: number) {
    const newZoom = clamp(Math.max(zoom, 2.6), MIN_ZOOM, MAX_ZOOM);
    setZoom(newZoom);
    setOrigin({ x: cx, y: cy });
  }

  function resetView() {
    setZoom(MIN_ZOOM);
    setOrigin({ ...DEFAULT_ORIGIN });
  }

  function handlePointerDown(e: ReactPointerEvent<SVGSVGElement>) {
    if (zoom <= MIN_ZOOM) return;
    (e.target as Element).setPointerCapture(e.pointerId);
    dragState.current = { startX: e.clientX, startY: e.clientY, origin: { ...origin } };
    setIsDragging(true);
  }

  function handlePointerMove(e: ReactPointerEvent<SVGSVGElement>) {
    if (!dragState.current || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const dxSvg = ((e.clientX - dragState.current.startX) / rect.width) * VB_WIDTH;
    const dySvg = ((e.clientY - dragState.current.startY) / rect.height) * VB_HEIGHT;
    setOrigin({
      x: clamp(dragState.current.origin.x - dxSvg / zoom, 0, VB_WIDTH),
      y: clamp(dragState.current.origin.y - dySvg / zoom, 0, VB_HEIGHT),
    });
  }

  function handlePointerUp() {
    dragState.current = null;
    setIsDragging(false);
  }

  const groupTransform = `translate(${CENTER.x} ${CENTER.y}) scale(${zoom}) translate(${-origin.x} ${-origin.y})`;
  const pinScale = PIN_BASE_SCALE / zoom;

  const showPins = zoom >= CLUSTER_ZOOM_THRESHOLD;

  return (
    <div>
      <div
        className="relative mx-auto overflow-hidden rounded-lg"
        style={{
          aspectRatio: `${VB_WIDTH} / ${VB_HEIGHT}`,
          // Width is derived from the height cap up front (rather than
          // capping height on a full-width box after the fact), so the map
          // never ends up letterboxed/squashed to a sliver on wide cards.
          width: `min(100%, calc(${MAX_BOX_HEIGHT} * ${ASPECT}))`,
        }}
      >
        <svg
          ref={svgRef}
          viewBox={sriLankaMapViewBox}
          className="block h-full w-full touch-none select-none"
          style={{ cursor: zoom > MIN_ZOOM ? (isDragging ? "grabbing" : "grab") : "default" }}
          role="img"
          aria-label="Zoomable map of Sri Lanka's districts with pins for each completed CRE Solutions project"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          <defs>
            <filter id="islandShadowPins" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#0B0F14" floodOpacity="0.22" />
            </filter>
          </defs>

          <g transform={groupTransform}>
            <g filter="url(#islandShadowPins)">
              {sriLankaDistricts.map((district) => (
                <path key={`base-${district.id}`} d={district.d} fill={BRAND_RED} />
              ))}
            </g>

            {sriLankaDistricts.map((district) => {
              const isServed = regionByName.has(district.name);
              return (
                <path
                  key={district.id}
                  d={district.d}
                  onClick={() => isServed && zoomToDistrict(district.cx, district.cy)}
                  fill={isServed ? "#FFFFFF" : "#F5F7F8"}
                  stroke={BRAND_RED}
                  strokeOpacity={isServed ? 0.9 : 0.35}
                  strokeWidth={1.2 / zoom}
                  strokeLinejoin="round"
                  className={isServed ? "cursor-pointer" : undefined}
                />
              );
            })}

            {!showPins &&
              reachRegions.map((region) => {
                const district = districtByName.get(region.name);
                if (!district) return null;
                return (
                  <g
                    key={`cluster-${region.name}`}
                    transform={`translate(${district.cx} ${district.cy}) scale(${1 / zoom})`}
                    className="cursor-pointer"
                    onClick={() => zoomToDistrict(district.cx, district.cy)}
                  >
                    <circle r="15" fill={BRAND_RED} stroke="#FFFFFF" strokeWidth="2" />
                    <text
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize="11"
                      fontWeight={700}
                      fill="#FFFFFF"
                    >
                      {region.count}
                    </text>
                  </g>
                );
              })}

            {showPins &&
              projects.map((project) => (
                <g
                  key={project.slug}
                  transform={`translate(${project.mapX} ${project.mapY}) scale(${pinScale})`}
                  aria-label={
                    project.capacity
                      ? `${project.client}, ${project.location}: ${project.capacity}`
                      : `${project.client}, ${project.location}`
                  }
                >
                  <g transform="translate(-12 -12)">
                    <MapPinCircle size={24} id={project.slug} />
                  </g>
                </g>
              ))}

            {showPins &&
              fillerPins.map((pin) => (
                <g
                  key={pin.id}
                  transform={`translate(${pin.mapX} ${pin.mapY}) scale(${pinScale})`}
                  opacity={0.6}
                  aria-label={`Additional completed project in ${pin.district}`}
                >
                  <g transform="translate(-9 -9)">
                    <MapPinCircle size={18} id={pin.id} />
                  </g>
                </g>
              ))}
          </g>
        </svg>

        <div className="absolute right-3 top-3 flex flex-col gap-1.5">
          <button
            type="button"
            aria-label="Zoom in"
            onClick={() => zoomAt(CENTER, 1.4)}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-brand-line bg-white text-brand-ink shadow-sm transition-colors hover:border-brand-red hover:text-brand-red"
          >
            <ZoomIn size={16} />
          </button>
          <button
            type="button"
            aria-label="Zoom out"
            onClick={() => zoomAt(CENTER, 1 / 1.4)}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-brand-line bg-white text-brand-ink shadow-sm transition-colors hover:border-brand-red hover:text-brand-red"
          >
            <ZoomOut size={16} />
          </button>
          {zoom > MIN_ZOOM + 0.05 && (
            <button
              type="button"
              aria-label="Reset map view"
              onClick={resetView}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-brand-line bg-white text-brand-ink shadow-sm transition-colors hover:border-brand-red hover:text-brand-red"
            >
              <Maximize2 size={14} />
            </button>
          )}
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-brand-muted">
        {showPins
          ? "Each pin marks a completed project. Drag to pan, scroll or use +/- to zoom further."
          : "Each badge shows completed projects per district — scroll, use +, or click a district to zoom in and see them."}
      </p>
    </div>
  );
}
