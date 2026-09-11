"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navItems } from "@/components/layout/Header";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
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
          onClick={() => setOpen(false)}
          className="flex h-10 w-10 items-center justify-center text-white"
        >
          <X size={26} />
        </button>
      </div>
      <nav className="flex flex-1 flex-col justify-center gap-2 px-8">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className="border-b border-white/10 py-4 text-2xl font-bold text-white transition-colors hover:text-brand-red"
          >
            {item.label}
          </Link>
        ))}
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
