import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/evaluate", label: "Sell Your Car" },
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "News & Updates" },
  { href: "/contact", label: "Contact" },
  { href: "/policy", label: "Privacy Policy" },
];

export default function Footer() {
  return (
    <footer className="bg-[#070e1f] text-white pt-20 border-t-4 border-blue">
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-16">
        {/* Brand */}
        <div>
          <Image
            src="https://smartcardeals.net/blog/wp-content/uploads/2026/04/Logo-1-copy.png"
            alt="Smart Car Deals"
            width={140}
            height={50}
            className="h-[50px] w-auto object-contain"
          />
          <p className="text-white/70 text-sm leading-7 mt-5 max-w-[300px]">
            The UAE&apos;s most transparent car buying service. We prioritize trust, speed, and
            market-leading prices.
          </p>
          <div className="inline-flex items-center gap-2 mt-4 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm font-bold">
            🇦🇪 UAE&apos;s #1 Car Buying Service
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="text-[18px] font-extrabold mb-5">Quick Links</h5>
          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-white/70 text-sm font-semibold hover:text-blue transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="text-center flex flex-col items-center">
          <h5 className="text-[18px] font-extrabold mb-5">Contact Support</h5>
          <p className="text-xs text-white/60 mb-4 font-semibold tracking-wide uppercase">
            Sat – Thu: 10AM – 8PM
          </p>
          <a
            href="tel:0522499708"
            className="text-2xl font-extrabold text-white block mb-2 hover:text-blue transition-colors"
          >
            052 249 9708
          </a>
          <a
            href="tel:0581522281"
            className="text-2xl font-extrabold text-white block mb-4 hover:text-blue transition-colors"
          >
            058 152 2281
          </a>
          <div className="flex gap-4 mt-2">
            <a
              href="https://facebook.com/p/Smart-Car-Deals-61578775322634"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-blue hover:border-blue hover:-translate-y-1 transition-all"
              aria-label="Facebook"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a
              href="https://www.instagram.com/smartcar.deals/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-blue hover:border-blue hover:-translate-y-1 transition-all"
              aria-label="Instagram"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
          </div>
        </div>

        {/* Office */}
        <div>
          <h5 className="text-[18px] font-extrabold mb-5">Head Office</h5>
          <div className="flex items-start gap-3 mb-4">
            <MapPin size={18} className="text-blue shrink-0 mt-0.5" />
            <p className="text-white/70 text-sm leading-7">
              1st Floor, JAC Bldg, Al Safeena Street, Nr. Oasis Center Mall, Sheikh Zayed Rd, Dubai
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-blue font-bold text-sm hover:underline"
          >
            Find Us on Google Maps →
          </Link>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/[0.08] py-6 text-center text-xs text-white/40 max-w-[1400px] mx-auto px-6">
        © All Rights Reserved 2026 Smart Car Deals |{" "}
        <Link href="/policy" className="text-white/40 underline hover:text-white/70 transition-colors">
          Privacy Policy
        </Link>{" "}
        | Powered by Genius Business Club
      </div>

      {/* Spacer for mobile bottom nav */}
      <div className="h-[70px] md:hidden" />
    </footer>
  );
}
