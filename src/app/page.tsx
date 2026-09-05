import Image from "next/image";
import Link from "next/link";
import EvalForm from "@/components/EvalForm";
import GoogleReviewsSection from "@/components/GoogleReviewsSection";
import JsonLd from "@/components/JsonLd";
import { GOOGLE_RATING_SNAPSHOT } from "@/lib/googleReviews";
import { BUSINESS_ID } from "@/lib/schema";

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Sell Your Car with Smart Car Deals",
  description:
    "Sell your car in the UAE in 3 steps: book a free inspection, get an instant market-based offer, and receive cash the same day.",
  totalTime: "PT30M",
  provider: { "@id": BUSINESS_ID },
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Book a Free Inspection",
      text: "Schedule online in seconds — or call us directly. We come to you or you come to us. Our experts inspect your car thoroughly, at absolutely zero cost.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Instant Market-Based Offer",
      text: "Based on live UAE market data and your car's condition, we give you a real, fair offer on the spot. No lowballing, no pressure — just transparency.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Cash & Done in 30 Minutes",
      text: "Happy with the offer? We handle all paperwork, RTA transfers, and bank clearance for you. Walk away with cash — usually within 30 minutes.",
    },
  ],
};

export default function Home() {
  return (
    <>
      <JsonLd data={howToJsonLd} />
      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-br from-[#f0f7ff] via-[#e2eeff] to-[#f0f7ff] border-b border-blue/10 rounded-b-[40px] lg:rounded-b-[60px] overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 pt-24 pb-16 lg:py-24 flex flex-col lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:items-stretch">
          {/* Left */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left mb-8 lg:mb-0">

            {/* Car Image */}
            <div className="max-w-[480px] lg:max-w-full w-full mb-8">
              <Image
                src="https://www.smartcardeals.net/blog/wp-content/uploads/2025/05/Lamborghini.png"
                alt="Sell Your Car Fast"
                width={560}
                height={340}
                className="w-full h-auto car-float"
                priority
              />
            </div>

            {/* Headline */}
            <h1 className="text-4xl lg:text-[76px] font-black text-navy leading-[1.1] tracking-[-3px] lg:tracking-[-4px] mb-5">
              Sell Your <span className="text-blue">CAR</span> In{" "}
              <span className="whitespace-nowrap">3 Easy Steps</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base lg:text-xl text-gray-text max-w-[640px] leading-7 mb-10">
              Experience the fastest, most transparent car buying service in the UAE. Get a fair
              instant offer, same-day payment, and zero hassle.
            </p>

            {/* Stats */}
            <div className="flex gap-8 lg:gap-12 justify-center lg:justify-start">
              <div className="text-center lg:text-left">
                <strong className="block text-2xl font-black text-navy tracking-tight">30 Min</strong>
                <small className="text-xs text-gray-text font-semibold uppercase tracking-wide">Average Deal</small>
              </div>
              <div className="text-center lg:text-left">
                <strong className="block text-2xl font-black text-navy tracking-tight">100%</strong>
                <small className="text-xs text-gray-text font-semibold uppercase tracking-wide">Free Service</small>
              </div>
              <div className="text-center lg:text-left">
                <strong className="block text-2xl font-black text-navy tracking-tight">10+ Yrs</strong>
                <small className="text-xs text-gray-text font-semibold uppercase tracking-wide">Experience</small>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="flex items-center justify-center lg:justify-end">
            <EvalForm />
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="max-w-[1400px] mx-auto px-6 py-20 lg:py-24">
        <div className="text-center mb-14">
          <span className="inline-block bg-blue/10 text-blue text-[11px] font-bold tracking-[2.5px] uppercase px-4 py-1.5 rounded-full border border-blue/15 mb-4">
            The Process
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-navy tracking-tight mb-3">
            How Smart Car Deals Works
          </h2>
          <p className="text-gray-text max-w-[540px] mx-auto leading-7">
            From inspection to cash in hand — we&apos;ve made selling your car the simplest thing
            you&apos;ll do today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {[
            {
              num: "01",
              icon: "📅",
              title: "Book a Free Inspection",
              desc: "Schedule online in seconds — or call us directly. We come to you or you come to us. Our experts inspect your car thoroughly, at absolutely zero cost.",
            },
            {
              num: "02",
              icon: "📋",
              title: "Instant Market-Based Offer",
              desc: "Based on live UAE market data and your car's condition, we give you a real, fair offer on the spot. No lowballing, no pressure — just transparency.",
            },
            {
              num: "03",
              icon: "💵",
              title: "Cash & Done in 30 Minutes",
              desc: "Happy with the offer? We handle all paperwork, RTA transfers, and bank clearance for you. Walk away with cash — usually within 30 minutes.",
            },
          ].map((step) => (
            <div
              key={step.num}
              className="bg-white rounded-[20px] p-9 border-[1.5px] border-border hover:border-blue hover:-translate-y-1.5 hover:shadow-[0_8px_40px_rgba(43,108,245,0.12)] transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue to-[#6EA8FE] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              <div className="text-[64px] font-black text-border leading-none mb-4 tracking-[-3px]">
                {step.num}
              </div>
              <div className="w-[60px] h-[60px] rounded-2xl bg-light-bg border-[1.5px] border-border flex items-center justify-center text-2xl mb-5 group-hover:bg-blue group-hover:border-blue group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                {step.icon}
              </div>
              <h4 className="text-[17px] font-extrabold text-navy mb-2.5">{step.title}</h4>
              <p className="text-sm text-gray-text leading-7">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mb-14">
          <Link
            href="/evaluate"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-br from-blue to-blue-dark text-white rounded-xl font-bold text-[15px] shadow-[0_8px_24px_rgba(43,108,245,0.35)] hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(43,108,245,0.45)] transition-all duration-200"
          >
            Sell My Car Now
          </Link>
        </div>

        {/* Split Banner */}
        <div className="rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(43,108,245,0.12)]">
          <div className="hidden lg:grid grid-cols-2 bg-[#0a1628] min-h-[520px]">
            <div className="flex flex-col justify-center px-16 py-16 text-white">
              <span className="inline-block bg-blue text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide mb-6 w-fit">
                Limited Time Offer
              </span>
              <h3 className="text-[42px] font-extrabold leading-[1.1] mb-5 tracking-[-1.5px]">
                Turn Your Car Into <span className="text-blue">Cash</span> Instantly
              </h3>
              <p className="text-[17px] text-white/80 leading-7 mb-8">
                Why wait for weeks? We buy any car in the UAE within 30 minutes. Get an expert
                valuation, same-day payment, and a stress-free RTA transfer today.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {["✅ 100% Free Inspection", "✅ No Hidden Paperwork", "✅ Highest Market Prices"].map(
                  (f) => (
                    <span
                      key={f}
                      className="flex items-center gap-2 text-sm font-bold bg-white/10 px-3 py-1.5 rounded-lg"
                    >
                      {f}
                    </span>
                  )
                )}
              </div>
              <Link
                href="/evaluate"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-br from-blue to-blue-dark text-white rounded-xl font-bold text-[15px] shadow-[0_8px_24px_rgba(43,108,245,0.35)] hover:-translate-y-1 transition-all w-fit"
              >
                Sell My Car Now
              </Link>
            </div>
            <div className="flex items-center justify-center bg-white">
              <Image
                src="https://www.smartcardeals.net/blog/wp-content/uploads/2025/06/Whisk_02b9b75f21.jpg"
                alt="Smart Car Deals Team"
                width={640}
                height={520}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          {/* Mobile version */}
          <div className="lg:hidden">
            <Image
              src="https://www.smartcardeals.net/blog/wp-content/uploads/2025/06/Whisk_02b9b75f21.jpg"
              alt="Smart Car Deals Team"
              width={640}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* ===== FEATURES STRIP ===== */}
      <div className="bg-navy py-16 px-6 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: "💳",
              title: "Instant Cash Offers",
              desc: "Get a competitive cash offer immediately. No endless negotiations, no waiting. You could have cash in hand the very same day.",
            },
            {
              icon: "🔄",
              title: "Hassle-Free Process",
              desc: "Skip the paperwork and long waits. Bring your car in, get inspected, accept the offer — and you&apos;re done. That simple.",
            },
            {
              icon: "🔒",
              title: "Secure & Transparent",
              desc: "100% transparent transactions with no hidden fees. Our team guides you every step, ensuring complete clarity and confidence.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="flex items-start gap-5 bg-white/5 border border-white/10 rounded-[20px] p-8 hover:bg-blue hover:border-blue hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(43,108,245,0.4)] transition-all duration-300 backdrop-blur-sm cursor-pointer"
            >
              <div className="text-[38px] shrink-0 min-w-[48px]">{f.icon}</div>
              <div>
                <h3 className="text-[17px] font-extrabold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-white/70 leading-[1.65]">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="bg-gradient-to-br from-[#f0f6ff] via-[#e8f0ff] to-[#f5f9ff] py-20 lg:py-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-blue/10 text-blue text-[11px] font-bold tracking-[2.5px] uppercase px-4 py-1.5 rounded-full border border-blue/15 mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-navy tracking-tight mb-3">
              Ready to sell your <span className="text-blue">CAR?</span>
            </h2>
            <p className="text-gray-text max-w-[540px] mx-auto leading-7">
              Trusted by thousands of UAE car owners. Here&apos;s why we stand out from every competitor.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            {/* Left: Expect list */}
            <div>
              <Image
                src="https://smartcardeals.net/blog/wp-content/uploads/2022/10/bedoctor-icon2.svg"
                alt=""
                width={52}
                height={52}
                className="mb-5"
              />
              <h3 className="text-2xl font-extrabold text-navy mb-2 tracking-tight">
                What You Can Expect
              </h3>
              <p className="text-gray-text text-sm mb-6">
                Everything designed to give you the best deal, fastest.
              </p>
              <div className="space-y-0">
                {[
                  { icon: "🎯", title: "No Fees, Ever", desc: "Our inspection, valuation, and service are 100% free. No strings attached." },
                  { icon: "⚡", title: "Speed & Transparency", desc: "From quote to payment, everything is clear, fast, and efficient." },
                  { icon: "📄", title: "We Handle It All", desc: "Paperwork, RTA processes, and mortgage clearance — all handled by us." },
                  { icon: "🏆", title: "10+ Years Experience", desc: "Trusted by thousands of UAE car owners. We know how to get you the best value." },
                  { icon: "✅", title: "Guaranteed Buyers", desc: "We buy cars daily. We don't just make offers — we close deals." },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 py-4 border-b border-border last:border-0"
                  >
                    <div className="w-9 h-9 bg-gradient-to-br from-blue to-[#4C8BF7] rounded-[10px] flex items-center justify-center text-base shadow-[0_4px_12px_rgba(43,108,245,0.3)] shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-navy mb-0.5">{item.title}</h5>
                      <p className="text-xs text-gray-text">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Stats showcase */}
            <div>
              <div className="bg-white rounded-2xl p-9 shadow-[0_8px_40px_rgba(43,108,245,0.12)] border border-border">
                <div className="text-sm font-bold text-navy mb-6 tracking-wide">
                  🏅 Our Track Record
                </div>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { num: "5,000+", label: "Cars Purchased" },
                    { num: "30 Min", label: "Avg. Deal Time" },
                    { num: "7 UAE", label: "Emirates Served" },
                    { num: "4.8★", label: "Customer Rating" },
                  ].map((s) => (
                    <div key={s.label} className="bg-light-bg rounded-xl p-4 border border-border">
                      <div className="text-3xl font-black text-navy tracking-tight mb-1">{s.num}</div>
                      <div className="text-xs text-gray-text font-semibold uppercase tracking-wide">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-gray-text text-sm leading-7 mb-7">
                  At <strong className="text-navy">Smart Car Deals</strong>, we bring over a decade of
                  professional car buying experience to give you the most reliable, efficient, and
                  rewarding way to sell your car in the UAE.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/evaluate"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-br from-blue to-blue-dark text-white rounded-xl font-bold text-sm shadow-[0_8px_24px_rgba(43,108,245,0.35)] hover:-translate-y-1 transition-all"
                  >
                    Get Free Offer →
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-transparent text-blue rounded-xl font-bold text-sm border-2 border-blue hover:bg-blue hover:text-white hover:-translate-y-0.5 transition-all"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CUSTOMER REVIEWS (Google) ===== */}
      <GoogleReviewsSection />

      {/* ===== REVIEWS / TRUST ===== */}
      <section className="max-w-[1400px] mx-auto px-6 py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        {/* Left: Image + rating badge */}
        <div className="relative mb-10 lg:mb-0">
          <Image
            src="https://www.smartcardeals.net/blog/wp-content/uploads/2025/05/545454-1.png"
            alt="Smart Car Deals"
            width={520}
            height={380}
            className="w-full rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
          />
          <a
            href="#reviews"
            className="absolute -bottom-7 left-6 bg-white rounded-2xl px-5 py-4 shadow-[0_12px_32px_rgba(0,0,0,0.15)] flex items-center gap-3 hover:-translate-y-1 transition-transform duration-200"
          >
            <div className="w-12 h-12 bg-[#FFE8DA] rounded-full flex items-center justify-center text-2xl shrink-0">
              ⭐
            </div>
            <div>
              <div className="text-lg font-black text-navy leading-none">
                {GOOGLE_RATING_SNAPSHOT.rating.toFixed(1)}{" "}
                <span className="text-sm font-semibold text-gray-text">/ 5</span>
              </div>
              <div className="text-xs text-gray-text font-semibold mt-1">
                {GOOGLE_RATING_SNAPSHOT.total}+ Google Reviews
              </div>
            </div>
          </a>
        </div>

        {/* Right: Content */}
        <div>
          <Image
            src="https://smartcardeals.net/blog/wp-content/uploads/2022/10/bedoctor-icon2.svg"
            alt=""
            width={48}
            height={48}
            className="mb-4"
          />
          <h3 className="text-3xl lg:text-4xl font-extrabold text-navy tracking-tight mb-4">
            Sell your car today &amp; get cash fast!
          </h3>
          <p className="text-gray-text leading-7 mb-6">
            Our team handles everything from inspection to payment. Experience the fastest and most
            reliable car selling service in the UAE.
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {["🇦🇪 UAE Licensed", "🔒 Secure Payment", "⚡ Same Day Cash"].map((badge) => (
              <span
                key={badge}
                className="flex items-center gap-1 bg-light-bg border border-border rounded-xl px-4 py-2 text-sm font-semibold text-navy"
              >
                {badge}
              </span>
            ))}
          </div>
          <Link
            href="/evaluate"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-br from-blue to-blue-dark text-white rounded-xl font-bold text-[15px] shadow-[0_8px_24px_rgba(43,108,245,0.35)] hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(43,108,245,0.45)] transition-all duration-200"
          >
            Get Cash For Your Car →
          </Link>
        </div>
      </section>
    </>
  );
}
