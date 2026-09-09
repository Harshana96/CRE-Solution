"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navItems } from "@/components/layout/Header";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function MobileMenu({ transparent }: { transparent: boolean }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-md transition-colors",
          transparent ? "text-white" : "text-brand-ink"
        )}
      >
        {open ? <X size={26} /> : <Menu size={26} />}
      </button>

      <div
        className={cn(
          "fixed inset-0 top-0 z-40 flex flex-col bg-brand-ink transition-all duration-300",
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
    </div>
  );
}
