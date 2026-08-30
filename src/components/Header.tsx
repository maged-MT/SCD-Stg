"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Menu, X, Home, Info, Newspaper, Mail, TrendingUp, HelpCircle } from "lucide-react";

const navLinks = [
  { href: "/evaluate", label: "Sell Your Car", cta: true },
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "News & Updates" },
  { href: "/contact", label: "Contact" },
];

const mobileLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/evaluate", label: "Evaluate Car", icon: TrendingUp },
  { href: "/about", label: "About Us", icon: Info },
  { href: "/blog", label: "Blog", icon: Newspaper },
  { href: "/faq", label: "FAQ", icon: HelpCircle },
  { href: "/contact", label: "Contact", icon: Mail },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] bg-white/96 backdrop-blur-xl flex items-center justify-between gap-5 px-6 py-2.5 transition-all duration-300 ${
          scrolled ? "shadow-[0_4px_20px_rgba(0,0,0,0.07)]" : "border-b border-blue/10"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="https://smartcardeals.net/blog/wp-content/uploads/2026/04/Logo-1.png"
            alt="Smart Car Deals"
            width={140}
            height={42}
            className="h-[42px] w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center bg-light-bg rounded-[40px] p-[5px] gap-0.5 border border-border flex-1 max-w-[580px] mx-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-5 py-[9px] rounded-[40px] font-semibold text-sm text-navy whitespace-nowrap transition-all duration-200 hover:bg-blue hover:text-white ${
                link.cta ? "bg-blue text-white shadow-[0_4px_12px_rgba(43,108,245,0.3)]" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <a
            href="tel:0522499708"
            className="hidden lg:flex items-center gap-2 font-semibold text-navy text-sm hover:text-blue transition-colors"
          >
            <Phone size={15} strokeWidth={2.5} />
            0522499708
          </a>
          <button
            className="lg:hidden p-1.5 text-blue"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} strokeWidth={2.5} />
          </button>
        </div>
      </header>

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-[rgba(15,37,87,0.6)] backdrop-blur-sm z-[1999]"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <nav
        className={`fixed top-0 right-0 h-full w-[300px] bg-white z-[2000] shadow-[-4px_0_30px_rgba(0,0,0,0.15)] flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div>
            <Image
              src="https://smartcardeals.net/blog/wp-content/uploads/2026/04/Logo-1-copy.png"
              alt="Smart Car Deals"
              width={120}
              height={36}
              className="h-9 w-auto object-contain"
            />
            <p className="text-[11px] font-extrabold text-navy/70 mt-1 tracking-widest uppercase">
              UAE&apos;s #1 Car Buyer
            </p>
          </div>
          <button onClick={() => setOpen(false)} className="p-2 text-navy" aria-label="Close menu">
            <X size={22} />
          </button>
        </div>

        {/* Links */}
        <div className="flex-1 overflow-y-auto py-4">
          {mobileLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-6 py-4 font-semibold text-navy border-b border-border hover:text-blue hover:bg-light-bg transition-colors"
            >
              <Icon size={18} className="text-blue" />
              {label}
            </Link>
          ))}
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3 px-6 py-4 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-blue flex items-center justify-center text-white">
              <Phone size={16} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-text font-bold">Call</p>
              <p className="text-sm font-bold text-navy">0522499708</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-blue flex items-center justify-center text-white text-base">
              🕐
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-text font-bold">Hours</p>
              <p className="text-sm font-bold text-navy">Sat–Thu 10–8PM</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="px-6 py-4 bg-light-bg border-t border-border">
          <Link
            href="/evaluate"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-br from-blue to-blue-dark text-white rounded-xl font-extrabold text-[15px] shadow-[0_8px_25px_rgba(43,108,245,0.3)]"
          >
            🚗 Sell Your Car
          </Link>
        </div>
      </nav>
    </>
  );
}
