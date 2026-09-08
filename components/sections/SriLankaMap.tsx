"use client";

import { useMemo, useState } from "react";
import { MapPin, Zap } from "lucide-react";
import { sriLankaDistricts, sriLankaMapViewBox } from "@/data/sriLankaDistricts";
import { reachRegions, reachCityPins } from "@/data/company";
import { projects } from "@/data/projects";
import { placeholderGradient } from "@/lib/projectPlaceholder";

const BRAND_RED = "#E30613";

// The side detail panel (district name + "N Projects" badge + sample project
// photo cards, see the JSX below) is disabled per client feedback — the
// floating photo tooltip that appears on the map itself when hovering a
// district is enough for this page. Kept in place (not deleted) in case it's
// wanted again later; flip this back to `true` to re-enable it.
const SHOW_DETAIL_PANEL = false;

const regionByName = new Map<string, (typeof reachRegions)[number]>(
  reachRegions.map((r) => [r.name, r])
);

const [VB_WIDTH, VB_HEIGHT] = sriLankaMapViewBox
  .split(" ")
  .slice(2)
  .map(Number);

function toPercent(cx: number, cy: number) {
  return {
    left: `${(cx / VB_WIDTH) * 100}%`,
    top: `${(cy / VB_HEIGHT) * 100}%`,
  };
}

export default function SriLankaMap() {
  const [active, setActive] = useState<string | null>(null);

  const projectsByDistrict = useMemo(() => {
    const map = new Map<string, typeof projects>();
    for (const project of projects) {
      const list = map.get(project.district) ?? [];
      list.push(project);
      map.set(project.district, list);
    }
    return map;
  }, []);

  const activeRegion = active ? regionByName.get(active) : undefined;
  const activeCity = active ? reachCityPins.find((c) => c.name === active) : undefined;
  const activeProjects = active ? projectsByDistrict.get(active) ?? [] : [];
  const activePin = active
    ? sriLankaDistricts.find((d) => d.name === active) ?? reachCityPins.find((c) => c.name === active)
    : undefined;

  return (
    <div
      className={
        SHOW_DETAIL_PANEL
          ? "grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center"
          : undefined
      }
    >
      <div className="relative mx-auto w-full max-w-[340px]">
        <svg
          viewBox={sriLankaMapViewBox}
          className="w-full"
          role="img"
          aria-label="Map of Sri Lanka's districts — hover a district to see completed CRE Solutions projects"
        >
          <defs>
            <filter id="islandShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#0B0F14" floodOpacity="0.22" />
            </filter>
          </defs>

          {/* Solid silhouette beneath the districts — reads as a crisp
              coastline against the card background, independent of the
              border strokes drawn on top. */}
          <g filter="url(#islandShadow)">
            {sriLankaDistricts.map((district) => (
              <path key={`base-${district.id}`} d={district.d} fill={BRAND_RED} />
            ))}
          </g>

          {sriLankaDistricts.map((district) => {
            const isServed = regionByName.has(district.name);
            const isActive = active === district.name;
            return (
              <path
                key={district.id}
                d={district.d}
                tabIndex={isServed ? 0 : -1}
                role={isServed ? "button" : undefined}
                aria-label={
                  isServed ? `${district.name}: ${regionByName.get(district.name)!.count} projects` : undefined
                }
                onMouseEnter={() => isServed && setActive(district.name)}
                onMouseLeave={() => isServed && setActive((cur) => (cur === district.name ? null : cur))}
                onFocus={() => isServed && setActive(district.name)}
                onBlur={() => isServed && setActive((cur) => (cur === district.name ? null : cur))}
                onClick={() => isServed && setActive(district.name)}
                fill={isActive ? BRAND_RED : isServed ? "#FFFFFF" : "#F5F7F8"}
                fillOpacity={isActive ? 0.18 : 1}
                stroke={BRAND_RED}
                strokeOpacity={isServed ? 0.9 : 0.35}
                strokeWidth={isActive ? 2 : 1.2}
                strokeLinejoin="round"
                className={isServed ? "cursor-pointer outline-none transition-[stroke-width]" : undefined}
              />
            );
          })}

          {sriLankaDistricts
            .filter((d) => regionByName.has(d.name))
            .map((district) => {
              const region = regionByName.get(district.name)!;
              return (
                <g key={`label-${district.id}`} className="pointer-events-none">
                  <circle cx={district.cx} cy={district.cy} r={3.2} fill={BRAND_RED} />
                  <text
                    x={district.cx}
                    y={district.cy - 7}
                    textAnchor="middle"
                    fontSize={11}
                    fontWeight={700}
                    fill="#0B0F14"
                    stroke="#FFFFFF"
                    strokeWidth={3}
                    paintOrder="stroke"
                  >
                    {district.name}
                  </text>
                  <text
                    x={district.cx}
                    y={district.cy + 15}
                    textAnchor="middle"
                    fontSize={9.5}
                    fontWeight={600}
                    fill="#3F454C"
                    stroke="#FFFFFF"
                    strokeWidth={3}
                    paintOrder="stroke"
                  >
                    {region.count}
                  </text>
                </g>
              );
            })}

          {reachCityPins.map((city) => (
            <g key={city.name}>
              <circle
                cx={city.cx}
                cy={city.cy}
                r={4}
                fill={BRAND_RED}
                stroke="#fff"
                strokeWidth={1.4}
                tabIndex={0}
                role="button"
                aria-label={`${city.name}: ${city.count} projects`}
                onMouseEnter={() => setActive(city.name)}
                onMouseLeave={() => setActive((cur) => (cur === city.name ? null : cur))}
                onFocus={() => setActive(city.name)}
                onBlur={() => setActive((cur) => (cur === city.name ? null : cur))}
                onClick={() => setActive(city.name)}
                className="cursor-pointer outline-none"
              />
              <text
                x={city.cx + 8}
                y={city.cy + 4}
                fontSize={12}
                fontWeight={700}
                fill="#0B0F14"
                stroke="#FFFFFF"
                strokeWidth={3}
                paintOrder="stroke"
                className="pointer-events-none"
              >
                {city.name} ({city.count})
              </text>
            </g>
          ))}
        </svg>

        {active && activePin && (
          <div
            className="pointer-events-none absolute z-10 w-36 -translate-x-1/2 -translate-y-[calc(100%+14px)] overflow-hidden rounded-lg border border-brand-line bg-white shadow-[0_16px_32px_-12px_rgba(11,15,20,0.35)]"
            style={toPercent(activePin.cx, activePin.cy)}
          >
            <div
              className="aspect-[4/3]"
              style={{ background: placeholderGradient(activeProjects.length ? 0 : 3) }}
            />
            <div className="p-2">
              <p className="truncate text-[11px] font-bold text-brand-ink">{active}</p>
              <p className="text-[10px] font-semibold text-brand-red">
                {(activeRegion ?? activeCity)?.count} projects
              </p>
            </div>
            <span className="absolute left-1/2 top-full h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-brand-line bg-white" />
          </div>
        )}
      </div>

      {SHOW_DETAIL_PANEL && (
        <div className="min-h-[220px] rounded-xl border border-brand-line bg-brand-light p-6">
          {!active ? (
            <div className="flex h-full min-h-[180px] flex-col items-center justify-center text-center">
              <MapPin size={22} className="text-brand-red" />
              <p className="mt-3 text-sm font-semibold text-brand-ink">
                Hover or tap a district
              </p>
              <p className="mt-1 text-xs text-brand-muted">
                See how many CRE Solutions projects are completed there.
              </p>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-bold text-brand-ink">{active}</h3>
                <span className="rounded-full bg-brand-red-soft px-3 py-1 text-xs font-bold text-brand-red-dark">
                  {(activeRegion ?? activeCity)?.count} Projects
                </span>
              </div>

              {activeProjects.length > 0 ? (
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {activeProjects.map((project, i) => (
                    <div
                      key={project.slug}
                      className="overflow-hidden rounded-lg border border-brand-line bg-white"
                    >
                      <div
                        className="aspect-[4/3]"
                        style={{ background: placeholderGradient(i) }}
                      />
                      <div className="p-3">
                        <p className="text-xs font-bold text-brand-ink">{project.client}</p>
                        <p className="mt-1 flex items-center gap-1 text-[11px] text-brand-muted">
                          <Zap size={11} className="text-brand-red" />
                          {project.capacity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm text-brand-muted">
                  Sample project photos for {active} are coming soon — this district is part of
                  CRE Solutions&rsquo; islandwide service area.
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
