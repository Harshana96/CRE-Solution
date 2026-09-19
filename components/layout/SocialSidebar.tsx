import type { SVGProps } from "react";
import { MessageCircle } from "lucide-react";
import { contact } from "@/data/contact";

// lucide-react dropped brand/logo icons a while back, so these four are
// small custom glyphs (simple, generic renditions of each platform's mark)
// instead — keeps the sidebar from depending on an icon set that doesn't
// ship them.
function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M15 8.5h2V5.2c-.35-.05-1.55-.15-2.95-.15-2.92 0-4.92 1.83-4.92 5.2V13H6.5v3.7h3.63V22h3.7v-5.3h3.5l.55-3.7h-4.05v-2.4c0-1.07.29-1.8 1.67-1.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" fill="currentColor" fillOpacity="0" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="7.5" cy="8" r="1.3" fill="currentColor" />
      <path d="M7.5 11v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="M11.5 17v-3.3c0-1.5.9-2.4 2-2.4s1.8.9 1.8 2.4V17"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M11.5 11v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function YouTubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="2.5" y="6" width="19" height="12" rx="4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10.5 9.3v5.4l4.8-2.7-4.8-2.7Z" fill="currentColor" />
    </svg>
  );
}

// Placeholder links per client request — real Facebook/Instagram/LinkedIn/
// YouTube URLs aren't confirmed yet, so those are "#" for now. Swap each
// href for the real page once the client provides it. WhatsApp already has
// a verified number (data/contact.ts) so it's wired up for real.
const links = [
  { name: "Facebook", href: "#", Icon: FacebookIcon },
  { name: "Instagram", href: "#", Icon: InstagramIcon },
  { name: "LinkedIn", href: "#", Icon: LinkedInIcon },
  { name: "YouTube", href: "#", Icon: YouTubeIcon },
  {
    name: "WhatsApp",
    href: `https://wa.me/${contact.phones[0].replace(/\D/g, "").replace(/^0/, "94")}`,
    Icon: MessageCircle,
    live: true,
  },
] as const;

export default function SocialSidebar() {
  return (
    <div className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
      <div className="flex flex-col overflow-hidden rounded-l-2xl border border-r-0 border-white/10 bg-brand-ink shadow-[0_16px_40px_-16px_rgba(11,15,20,0.5)]">
        <span className="h-1 w-full bg-brand-red" aria-hidden />
        {links.map(({ name, href, Icon, ...rest }) => {
          const isLive = "live" in rest && rest.live;
          return (
            <a
              key={name}
              href={href}
              target={isLive ? "_blank" : undefined}
              rel={isLive ? "noreferrer" : undefined}
              aria-label={name}
              title={name}
              className="group relative flex h-11 w-11 items-center justify-center text-white/70 transition-all duration-200 hover:w-14 hover:bg-brand-red hover:text-white"
            >
              <Icon width={17} height={17} className="transition-transform duration-200 group-hover:scale-110" />
              {isLive && (
                <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 animate-ping rounded-full bg-emerald-400" />
              )}
              {isLive && (
                <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400" />
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}
