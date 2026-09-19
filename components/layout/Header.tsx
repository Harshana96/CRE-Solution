"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronDown, Sun, BatteryCharging, PlugZap, Zap } from "lucide-react";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import MobileMenu from "@/components/layout/MobileMenu";
import { solutions } from "@/data/solutions";
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

const solutionIconMap = { Sun, BatteryCharging, PlugZap, Zap };

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
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
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
          {navItems.map((item, i) => {
            const active = isActivePath(pathname, item.href);
            const hasDropdown = item.href === "/solutions";

            return (
              <motion.div
                key={item.href}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 + i * 0.05 }}
                className={cn("relative", hasDropdown && "group/dropdown")}
              >
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group relative flex items-center gap-1 text-sm font-semibold tracking-wide transition-colors hover:text-brand-red",
                    active ? "text-brand-red" : "text-brand-ink"
                  )}
                >
                  {item.label}
                  {hasDropdown && (
                    <ChevronDown
                      size={14}
                      className="transition-transform duration-300 group-hover/dropdown:rotate-180"
                    />
                  )}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -bottom-1.5 left-0 h-0.5 w-full origin-left rounded-full bg-brand-red transition-transform duration-300 ease-out",
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    )}
                  />
                </Link>

                {hasDropdown && (
                  <div className="absolute left-1/2 top-full z-10 w-64 -translate-x-1/2">
                    {/* Always-hoverable bridge covering the visual gap so
                        moving the pointer from the link down to the panel
                        doesn't close the dropdown partway through. */}
                    <div className="h-3 w-full" />
                    <div className="translate-y-1 opacity-0 transition-all duration-200 ease-out group-hover/dropdown:translate-y-0 group-hover/dropdown:opacity-100">
                      <div className="pointer-events-none overflow-hidden rounded-xl border border-brand-line bg-white p-2 shadow-[0_24px_48px_-16px_rgba(11,15,20,0.25)] group-hover/dropdown:pointer-events-auto">
                        {solutions.map((solution) => {
                          const Icon = solutionIconMap[solution.icon];
                          return (
                            <Link
                              key={solution.slug}
                              href={`/solutions/${solution.slug}`}
                              className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-brand-light"
                            >
                              <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-brand-red-soft">
                                <Icon size={17} className="text-brand-red" />
                              </span>
                              <span className="text-sm font-semibold text-brand-ink">
                                {solution.shortTitle}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </nav>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 + navItems.length * 0.05 }}
          className="hidden lg:block"
        >
          <Button href="/contact" variant="primary" className="px-6 py-3 text-xs">
            Get a Quote
          </Button>
        </motion.div>

        <MobileMenu />
      </div>
    </motion.header>
  );
}
