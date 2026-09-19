"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Sun, BatteryCharging, PlugZap, Zap } from "lucide-react";
import { navItems } from "@/components/layout/Header";
import Button from "@/components/ui/Button";
import { solutions } from "@/data/solutions";
import { cn } from "@/lib/utils";

const solutionIconMap = { Sun, BatteryCharging, PlugZap, Zap };

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function MobileMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [solutionsExpanded, setSolutionsExpanded] = useState(false);
  // `document` exists on both server and client, so `typeof document !==
  // "undefined"` is true on the client's very first (hydration) render —
  // but false during SSR — which made React see mismatched output at this
  // exact spot and log a hydration error. Deferring the portal to a
  // post-hydration effect keeps the first client render identical to the
  // server's (both skip it), then mounts it safely afterwards.
  const [canPortal, setCanPortal] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: this is the standard "mounted" gate for a client-only portal, not a data sync.
    setCanPortal(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
    setSolutionsExpanded(false);
  }

  const panel = (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex flex-col bg-brand-ink transition-all duration-300",
        open ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-full opacity-0"
      )}
    >
      <div className="flex items-center justify-end px-6 pt-6">
        <button
          type="button"
          aria-label="Close menu"
          onClick={closeMenu}
          className="flex h-10 w-10 items-center justify-center text-white"
        >
          <X size={26} />
        </button>
      </div>
      <nav className="flex flex-1 flex-col justify-center gap-2 overflow-y-auto px-8 py-6">
        {navItems.map((item, i) => {
          const active = isActivePath(pathname, item.href);
          const isSolutions = item.href === "/solutions";
          const itemDelay = { transitionDelay: open ? `${100 + i * 45}ms` : "0ms" };

          if (!isSolutions) {
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                aria-current={active ? "page" : undefined}
                style={itemDelay}
                className={cn(
                  "border-b py-4 text-2xl font-bold transition-all duration-300 ease-out hover:text-brand-red",
                  active ? "border-brand-red text-brand-red" : "border-white/10 text-white",
                  open ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                )}
              >
                {item.label}
              </Link>
            );
          }

          return (
            <div
              key={item.href}
              style={itemDelay}
              className={cn(
                "border-b border-white/10 transition-all duration-300 ease-out",
                open ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
              )}
            >
              <div className="flex items-center justify-between py-4">
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "text-2xl font-bold transition-colors hover:text-brand-red",
                    active ? "text-brand-red" : "text-white"
                  )}
                >
                  {item.label}
                </Link>
                <button
                  type="button"
                  aria-label={solutionsExpanded ? "Hide solutions" : "Show solutions"}
                  aria-expanded={solutionsExpanded}
                  onClick={() => setSolutionsExpanded((v) => !v)}
                  className="flex h-10 w-10 flex-none items-center justify-center text-white/60"
                >
                  <ChevronDown
                    size={22}
                    className={cn(
                      "transition-transform duration-300",
                      solutionsExpanded && "rotate-180"
                    )}
                  />
                </button>
              </div>
              <div
                className={cn(
                  "grid overflow-hidden transition-all duration-300 ease-out",
                  solutionsExpanded ? "grid-rows-[1fr] pb-4 opacity-100" : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="flex min-h-0 flex-col gap-1">
                  {solutions.map((solution) => {
                    const Icon = solutionIconMap[solution.icon];
                    return (
                      <Link
                        key={solution.slug}
                        href={`/solutions/${solution.slug}`}
                        onClick={closeMenu}
                        className="flex items-center gap-3 rounded-lg py-2.5 pl-2 text-base font-semibold text-white/75 transition-colors hover:text-brand-red"
                      >
                        <Icon size={16} className="text-brand-red" />
                        {solution.shortTitle}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </nav>
      <div className="px-8 pb-10">
        <Button href="/contact" variant="primary" className="w-full">
          Get a Quote
        </Button>
      </div>
    </div>
  );

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center rounded-md text-brand-ink transition-colors"
      >
        {open ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Rendered via a portal straight onto <body>, outside <header>, so it
          can never end up nested inside an ancestor with a CSS `filter` or
          `backdrop-filter` (the header gets `backdrop-blur` once scrolled).
          Chrome treats those as establishing a new containing block for
          `position: fixed` descendants — nested inside the header, this
          overlay would size itself to the header's own small box instead of
          the full viewport, letting the page underneath show through. */}
      {canPortal && createPortal(panel, document.body)}
    </div>
  );
}
