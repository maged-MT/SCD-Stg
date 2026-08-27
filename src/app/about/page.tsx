import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About Us – Smart Car Deals | 10+ Years Buying Cars in UAE",
  description:
    "Learn about Smart Car Deals — UAE's most trusted car buying service with 10+ years experience. We buy any car, any condition, same day cash payment across all Emirates.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about" },
        ])}
      />
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#f0f7ff] via-[#e2eeff] to-[#f0f7ff] border-b border-blue/10 pt-24 pb-16 px-6 text-center">
        <div className="max-w-[800px] mx-auto">
          <span className="inline-block bg-blue/10 text-blue text-[11px] font-bold tracking-[2.5px] uppercase px-4 py-1.5 rounded-full border border-blue/15 mb-4">
            About Smart Car Deals
          </span>
          <h1 className="text-4xl lg:text-5xl font-black text-navy tracking-[-2px] mb-4">
            UAE&apos;s Most <span className="text-blue">Trusted</span> Car Buyer
          </h1>
          <p className="text-gray-text text-lg leading-7">
            For over 10 years, we&apos;ve been the go-to car buying service for thousands of UAE
            residents. Fast, fair, and fully transparent.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-[1400px] mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div>
          <span className="inline-block bg-blue/10 text-blue text-[11px] font-bold tracking-[2.5px] uppercase px-4 py-1.5 rounded-full border border-blue/15 mb-5">
            Our Story
          </span>
          <h2 className="text-3xl font-extrabold text-navy tracking-tight mb-5">
            Built on Trust, Speed &amp; Fairness
          </h2>
          <p className="text-gray-text leading-7 mb-5">
            Smart Car Deals was founded with one simple mission: make selling a car in the UAE as
            easy as buying one. We saw how sellers were being shortchanged by dealers, wasting
            weekends on listings, and drowning in paperwork.
          </p>
          <p className="text-gray-text leading-7 mb-8">
            Today, with over 5,000 cars purchased and a 4.8-star rating from thousands of
            customers, we&apos;re proud to be the UAE&apos;s #1 direct car buyer — serving all 7
            Emirates with the same commitment to speed, fairness, and zero hassle.
          </p>
          <Link
            href="/evaluate"
            className="inline-flex items-center gap-2 px-7 py-4 bg-gradient-to-br from-blue to-blue-dark text-white rounded-xl font-bold shadow-[0_8px_24px_rgba(43,108,245,0.35)] hover:-translate-y-1 transition-all"
          >
            Sell My Car Now →
          </Link>
        </div>
        <div>
          <Image
            src="https://www.smartcardeals.net/blog/wp-content/uploads/2025/06/Whisk_02b9b75f21.jpg"
            alt="Smart Car Deals Team"
            width={600}
            height={420}
            className="w-full rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
          />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-navy py-16 px-6">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { num: "5,000+", label: "Cars Purchased" },
            { num: "10+ Yrs", label: "In Business" },
            { num: "7", label: "Emirates Served" },
            { num: "4.8★", label: "Customer Rating" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-4xl lg:text-5xl font-black text-white tracking-tight mb-2">{s.num}</div>
              <div className="text-sm text-white/60 font-semibold uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="max-w-[1400px] mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <span className="inline-block bg-blue/10 text-blue text-[11px] font-bold tracking-[2.5px] uppercase px-4 py-1.5 rounded-full border border-blue/15 mb-4">
            Our Values
          </span>
          <h2 className="text-3xl font-extrabold text-navy tracking-tight">
            What Sets Us Apart
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: "🎯", title: "100% Transparent", desc: "No hidden fees, no surprises. The price we quote is the price you receive — every time." },
            { icon: "⚡", title: "Lightning Fast", desc: "From inspection to cash in hand in as little as 30 minutes. We respect your time." },
            { icon: "🤝", title: "Fully Licensed", desc: "UAE licensed and RTA approved. We handle all transfer documentation, giving you complete peace of mind." },
          ].map((v) => (
            <div
              key={v.title}
              className="bg-light-bg border border-border rounded-2xl p-8 hover:border-blue hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(43,108,245,0.12)] transition-all duration-300"
            >
              <div className="text-4xl mb-4">{v.icon}</div>
              <h3 className="text-lg font-extrabold text-navy mb-2">{v.title}</h3>
              <p className="text-sm text-gray-text leading-7">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
