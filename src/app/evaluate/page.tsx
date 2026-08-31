import type { Metadata } from "next";
import EvalForm from "@/components/EvalForm";
import JsonLd from "@/components/JsonLd";
import { BUSINESS, SITE_URL } from "@/lib/seo";
import { BUSINESS_ID, breadcrumbJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Evaluate Your Car | Smart Car Deals UAE",
  description:
    "Get an instant, free car valuation in the UAE. Fill in your car details and receive a fair market offer within minutes. Same-day cash payment guaranteed.",
  alternates: {
    canonical: "/evaluate",
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Car Buying & Vehicle Evaluation",
  name: "Instant Car Valuation & Same-Day Cash Purchase",
  description:
    "Free, instant car valuation in the UAE. Get a fair market-based offer and same-day cash payment, with all RTA transfer paperwork handled for you.",
  provider: { "@id": BUSINESS_ID },
  areaServed: BUSINESS.areaServed.map((name) => ({
    "@type": "AdministrativeArea",
    name,
  })),
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "AED",
    description: "Free car inspection and valuation",
  },
  url: `${SITE_URL}/evaluate`,
};

export default function EvaluatePage() {
  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Evaluate Your Car", path: "/evaluate" },
        ])}
      />
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#f0f7ff] via-[#e2eeff] to-[#f0f7ff] border-b border-blue/10 pt-24 pb-16 px-6">
        <div className="max-w-[1400px] mx-auto text-center mb-12">
          <span className="inline-block bg-blue/10 text-blue text-[11px] font-bold tracking-[2.5px] uppercase px-4 py-1.5 rounded-full border border-blue/15 mb-4">
            Free Instant Valuation
          </span>
          <h1 className="text-4xl lg:text-5xl font-black text-navy tracking-[-2px] mb-4">
            Get Your <span className="text-blue">Instant Offer</span>
          </h1>
          <p className="text-gray-text text-lg max-w-[600px] mx-auto leading-7">
            Fill in your car details below and our team will get back to you within 30 minutes with
            a fair, market-based offer.
          </p>
        </div>

        <div className="flex justify-center">
          <EvalForm />
        </div>
      </section>

      {/* Steps */}
      <section className="max-w-[1400px] mx-auto px-6 py-20">
        <h2 className="text-2xl font-extrabold text-navy text-center mb-10 tracking-tight">
          Sell Your Car in 3 Simple Steps
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { num: "01", icon: "📋", title: "Fill the Form", desc: "Enter your car details above — make, model, year, mileage, and your contact info. Takes under 30 seconds." },
            { num: "02", icon: "🔍", title: "Free Inspection", desc: "Our expert evaluator visits you at your location in Dubai or any UAE emirate — completely free, no commitment." },
            { num: "03", icon: "💰", title: "Get Paid Same Day", desc: "Accept our offer and receive instant bank transfer or cash. We handle all paperwork and RTA transfer on the spot." },
          ].map((s) => (
            <div key={s.num} className="text-center p-8 bg-light-bg rounded-2xl border border-border">
              <div className="text-[56px] font-black text-border leading-none mb-4 tracking-[-3px]">{s.num}</div>
              <div className="text-4xl mb-4">{s.icon}</div>
              <h4 className="text-lg font-extrabold text-navy mb-2">{s.title}</h4>
              <p className="text-sm text-gray-text leading-7">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-navy py-16 px-6">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-white mb-3">
            Why 10,000+ UAE Sellers Choose Us
          </h2>
          <p className="text-white/70 mb-8">Trusted by expats and locals across all 7 Emirates</p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              "✅ No Hidden Fees",
              "⚡ Same-Day Payment",
              "🚗 Free Inspection",
              "📄 We Handle Paperwork",
              "🇦🇪 Licensed Dealer UAE",
            ].map((b) => (
              <span
                key={b}
                className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-xl px-5 py-2.5 text-sm font-bold text-white"
              >
                {b}
              </span>
            ))}
          </div>
          <a
            href="#SELLMYCAR"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue text-white rounded-xl font-bold text-[15px] hover:-translate-y-1 transition-all"
          >
            ↑ Get My Free Offer Now
          </a>
        </div>
      </section>
    </>
  );
}
