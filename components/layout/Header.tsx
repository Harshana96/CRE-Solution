"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import MobileMenu from "@/components/layout/MobileMenu";
import { cn } from "@/lib/utils";

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Solutions", href: "/solutions" },
  { label: "Projects", href: "/projects" },
  { label: "Technology", href: "/technology" },
  { label: "Why CRE", href: "/why-cre" },
  { label: "Contact", href: "/contact" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The homepage hero is a light background, same as the header's own
  // solid state, so nav text/logo no longer need a separate light-on-dark
  // treatment — only the header's own background/shadow changes on scroll.
  const atHeroTop = isHome && !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        atHeroTop
          ? "bg-transparent py-5"
          : "bg-white/95 py-3 shadow-[0_1px_0_var(--color-brand-line)] backdrop-blur"
      )}
    >
      <div className="container-cre flex items-center justify-between">
        <Logo
          tone="dark"
          showTagline={false}
          size={56}
          expandedSize={168}
          expanded={atHeroTop}
        />

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative text-sm font-semibold tracking-wide transition-colors hover:text-brand-red",
                  active ? "text-brand-red" : "text-brand-ink"
                )}
              >
                {item.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-brand-red transition-opacity",
                    active ? "opacity-100" : "opacity-0"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button href="/contact" variant="primary" className="px-6 py-3 text-xs">
            Get a Quote
          </Button>
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}
