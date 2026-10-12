import Image from "next/image";
import { contact } from "@/data/contact";

// Placeholder links per client request — real Facebook/Instagram/LinkedIn/
// YouTube URLs aren't confirmed yet, so those are "#" for now. Swap each
// href for the real page once the client provides it. WhatsApp already has
// a verified number (data/contact.ts) so it's wired up for real.
const links = [
  { name: "Facebook", href: "#", src: "/images/social/facebook.png" },
  { name: "Instagram", href: "#", src: "/images/social/instagram.png" },
  { name: "LinkedIn", href: "#", src: "/images/social/linkedin.png" },
  { name: "YouTube", href: "#", src: "/images/social/youtube.png" },
  {
    name: "WhatsApp",
    href: `https://wa.me/${contact.phones[0].replace(/\D/g, "").replace(/^0/, "94")}`,
    src: "/images/social/whatsapp.png",
    live: true,
  },
] as const;

export default function SocialSidebar() {
  return (
    <div className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
      <div className="flex flex-col overflow-hidden rounded-l-2xl border border-r-0 border-brand-line bg-white shadow-[0_16px_40px_-16px_rgba(11,15,20,0.25)]">
        <span className="h-1 w-full bg-brand-red" aria-hidden />
        {links.map(({ name, href, src, ...rest }) => {
          const isLive = "live" in rest && rest.live;
          return (
            <a
              key={name}
              href={href}
              target={isLive ? "_blank" : undefined}
              rel={isLive ? "noreferrer" : undefined}
              aria-label={name}
              title={name}
              className="group relative flex h-16 w-16 items-center justify-center border-b border-brand-line transition-all duration-200 last:border-b-0 hover:w-[4.5rem] hover:bg-brand-light"
            >
              <Image
                src={src}
                alt={name}
                width={30}
                height={30}
                className="transition-transform duration-200 group-hover:scale-110"
              />
              {isLive && (
                <span className="absolute right-2 top-2 h-2 w-2 animate-ping rounded-full bg-emerald-400" />
              )}
              {isLive && (
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-emerald-400" />
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}
