"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { ZoomIn, ZoomOut, Maximize2, Zap } from "lucide-react";
import { sriLankaDistricts, sriLankaMapViewBox } from "@/data/sriLankaDistricts";
import { reachRegions } from "@/data/company";
import { projects } from "@/data/projects";
import { placeholderGradient } from "@/lib/projectPlaceholder";
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

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function SriLankaMapPins() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const [origin, setOrigin] = useState(DEFAULT_ORIGIN);
  const [activeProject, setActiveProject] = useState<string | null>(null);
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

  const active = projects.find((p) => p.slug === activeProject);
  const activeTooltipPos = active
    ? {
        left: `${(CENTER.x + zoom * (active.mapX - origin.x)) / VB_WIDTH * 100}%`,
        top: `${(CENTER.y + zoom * (active.mapY - origin.y)) / VB_HEIGHT * 100}%`,
      }
    : null;

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

            {projects.map((project) => (
              <g
                key={project.slug}
                transform={`translate(${project.mapX} ${project.mapY}) scale(${pinScale})`}
                className="cursor-pointer"
                onMouseEnter={() => setActiveProject(project.slug)}
                onMouseLeave={() => setActiveProject((cur) => (cur === project.slug ? null : cur))}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveProject(project.slug);
                }}
                tabIndex={0}
                role="button"
                aria-label={`${project.client}, ${project.location}: ${project.capacity}`}
              >
                <g transform="translate(-12 -12)">
                  <MapPinCircle size={24} id={project.slug} />
                </g>
              </g>
            ))}
          </g>
        </svg>

        {active && activeTooltipPos && (
          <div
            className="pointer-events-none absolute z-10 w-40 -translate-x-1/2 -translate-y-[calc(100%+10px)] overflow-hidden rounded-lg border border-brand-line bg-white shadow-[0_16px_32px_-12px_rgba(11,15,20,0.35)]"
            style={activeTooltipPos}
          >
            <div className="aspect-[4/3]" style={{ background: placeholderGradient(0) }} />
            <div className="p-2.5">
              <p className="truncate text-[11px] font-bold text-brand-ink">{active.client}</p>
              <p className="truncate text-[10px] text-brand-muted">{active.location}</p>
              <p className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-brand-red">
                <Zap size={10} />
                {active.capacity}
              </p>
            </div>
            <span className="absolute left-1/2 top-full h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-brand-line bg-white" />
          </div>
        )}

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
        Scroll or use +/- to zoom, drag to pan, click a district to zoom into its projects.
      </p>
    </div>
  );
}
