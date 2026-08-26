import type { Metadata } from "next";
import Link from "next/link";
import { Home } from "lucide-react";

export const metadata: Metadata = {
  title: "Submission Received | Smart Car Deals UAE",
  description: "Thank you for contacting Smart Car Deals. Our team will be in touch shortly.",
  robots: { index: false, follow: true },
};

export default function ThankYouPage() {
  return (
    <>
      {/* ===== HERO — dark gradient ===== */}
      <section className="bg-gradient-to-b from-[#0d1f57] to-[#1a3aad] min-h-[calc(100vh-68px)] flex items-center justify-center px-6 py-16">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-[28px] p-10 max-w-[560px] w-full text-center shadow-[0_24px_80px_rgba(0,0,0,0.3)]">
          {/* Check icon */}
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-7 shadow-[0_8px_32px_rgba(43,108,245,0.25)]">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2B6CF5" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tight mb-4">
            Submission Received!
          </h1>
          <p className="text-white/80 text-base leading-7 mb-8">
            Your vehicle details were sent successfully. Our evaluation engine is processing your
            data and a specialist will contact you with an offer within{" "}
            <strong className="text-white">30 minutes</strong>.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-navy rounded-xl font-bold text-sm hover:-translate-y-0.5 transition-all shadow-[0_4px_16px_rgba(0,0,0,0.15)]"
            >
              <Home size={16} />
              Return Home
            </Link>
            <a
              href="https://wa.me/971522499708"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-transparent border-2 border-white/60 text-white rounded-xl font-bold text-sm hover:bg-white/10 hover:border-white transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Chat with Expert
            </a>
          </div>
        </div>
      </section>

      {/* ===== WHAT HAPPENS NEXT ===== */}
      <section className="bg-white pt-14 pb-20 px-6">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-navy tracking-tight mb-3">
            What Happens Next?
          </h2>
          <p className="text-gray-text text-base mb-12">
            Here is how we ensure you get the best market value for your car today.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                title: "Pro Evaluation",
                desc: "Our market experts check current auction and retail data to calculate your car's highest possible value.",
              },
              {
                num: "02",
                title: "Expert Call",
                desc: "We'll call you to confirm details and provide an initial offer over the phone. No obligation needed.",
              },
              {
                num: "03",
                title: "Instant Payment",
                desc: "Once you accept, we handle all RTA paperwork and pay you in cash or bank transfer the same day.",
              },
            ].map((s) => (
              <div
                key={s.num}
                className="border border-border rounded-2xl p-8 text-center hover:border-blue hover:shadow-[0_8px_40px_rgba(43,108,245,0.10)] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center mx-auto mb-5 text-sm font-black text-gray-text">
                  {s.num}
                </div>
                <h3 className="text-lg font-extrabold text-navy mb-3">{s.title}</h3>
                <p className="text-sm text-gray-text leading-7">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp float */}
      <a
        href="https://wa.me/971522499708"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 md:bottom-8 right-5 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform z-50"
        aria-label="Chat on WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
      </a>
    </>
  );
}
