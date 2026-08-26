"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Info, TrendingUp, Newspaper, Phone } from "lucide-react";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: Info },
  { href: "/evaluate", label: "Evaluate\nCar", icon: TrendingUp, center: true },
  { href: "/blog", label: "Blog", icon: Newspaper },
  { href: "/contact", label: "Contact", icon: Phone },
];

export default function BottomNav() {
  const path = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full bg-white/95 backdrop-blur-xl border-t border-black/5 h-[70px] flex items-center justify-around z-[10000] pb-safe md:hidden">
      {items.map(({ href, label, icon: Icon, center }) => {
        const active = path === href;
        if (center) {
          return (
            <Link
              key={href}
              href={href}
              className="relative w-[70px] h-[70px] bg-gradient-to-br from-blue to-blue-dark rounded-[20px] -translate-y-6 rotate-45 flex items-center justify-center border-[5px] border-white shadow-[0_10px_30px_rgba(43,108,245,0.4)] transition-transform hover:scale-105"
              aria-label={label}
            >
              <div className="-rotate-45 text-white text-center">
                <Icon size={24} />
                <span className="text-[9px] font-extrabold block mt-0.5 leading-tight whitespace-pre-line">
                  {label}
                </span>
              </div>
            </Link>
          );
        }
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center justify-center gap-[3px] text-[11px] font-extrabold w-[60px] transition-colors ${
              active ? "text-blue" : "text-gray-text opacity-60"
            }`}
          >
            <Icon size={20} />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
