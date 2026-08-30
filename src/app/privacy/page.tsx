import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Privacy Policy | CarMarketHub",
  description:
    "CarMarketHub's Privacy Policy — how we collect, use, and disclose information when you use our website and services.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <section className="max-w-[860px] mx-auto px-6 py-20">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ])}
      />
      <div className="mb-10 text-center">
        <span className="inline-block bg-blue/10 text-blue text-[11px] font-bold tracking-[2.5px] uppercase px-4 py-1.5 rounded-full border border-blue/15 mb-4">
          Legal
        </span>
        <h1 className="text-4xl font-black text-navy tracking-tight mb-4">Privacy Policy</h1>
      </div>

      <div className="mb-8 bg-light-bg border border-border rounded-2xl p-6">
        <p className="text-gray-text leading-8">
          At CarMarketHub, we value your privacy and are committed to protecting your personal
          information. This Privacy Policy explains how we collect, use, and disclose information
          when you use our website and services. By using CarMarketHub, you agree to the terms of
          this policy.
        </p>
      </div>

      <div className="space-y-6">
        <section className="bg-white border border-border rounded-2xl p-6 shadow-[0_2px_16px_rgba(43,108,245,0.06)]">
          <h2 className="text-xl font-extrabold text-navy mb-3">1. Information Collected</h2>
          <p className="text-gray-text leading-8">
            We may collect personal information including name, Emirates ID, phone number, email,
            vehicle registration details, VIN, photos, location data, and bank details (if
            required).
          </p>
        </section>

        <section className="bg-white border border-border rounded-2xl p-6 shadow-[0_2px_16px_rgba(43,108,245,0.06)]">
          <h2 className="text-xl font-extrabold text-navy mb-3">2. Purpose of Processing</h2>
          <p className="text-gray-text leading-8">
            Data is used for vehicle valuation, inspection scheduling, buyer circulation, title
            transfer facilitation, fraud prevention, and legal compliance.
          </p>
        </section>

        <section className="bg-white border border-border rounded-2xl p-6 shadow-[0_2px_16px_rgba(43,108,245,0.06)]">
          <h2 className="text-xl font-extrabold text-navy mb-3">3. Data Sharing</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-text leading-8">
            <li>
              Data may be shared with approved buyer network, transport authorities, finance
              providers, payment processors, or regulatory authorities where required.
            </li>
            <li>We do not sell personal data.</li>
          </ul>
        </section>

        <section className="bg-white border border-border rounded-2xl p-6 shadow-[0_2px_16px_rgba(43,108,245,0.06)]">
          <h2 className="text-xl font-extrabold text-navy mb-3">4. Data Retention</h2>
          <p className="text-gray-text leading-8">
            Data may be retained for up to 5 years for regulatory compliance, dispute resolution,
            and AML purposes.
          </p>
        </section>

        <section className="bg-white border border-border rounded-2xl p-6 shadow-[0_2px_16px_rgba(43,108,245,0.06)]">
          <h2 className="text-xl font-extrabold text-navy mb-3">5. Security</h2>
          <p className="text-gray-text leading-8">
            We implement encryption, access controls, and secure cloud infrastructure. No system
            is completely secure.
          </p>
        </section>

        <section className="bg-white border border-border rounded-2xl p-6 shadow-[0_2px_16px_rgba(43,108,245,0.06)]">
          <h2 className="text-xl font-extrabold text-navy mb-3">6. User Rights</h2>
          <p className="text-gray-text leading-8">
            Users may request access, correction, or deletion of their data subject to legal
            obligations.
          </p>
        </section>

        <section className="bg-white border border-border rounded-2xl p-6 shadow-[0_2px_16px_rgba(43,108,245,0.06)]">
          <h2 className="text-xl font-extrabold text-navy mb-3">7. Cookies</h2>
          <p className="text-gray-text leading-8">
            Cookies may be used for session management, analytics, and performance optimization.
            Users may disable cookies via browser settings.
          </p>
        </section>
      </div>

      <div className="mt-10 text-center">
        <Link href="/contact" className="text-blue font-semibold hover:underline">
          Questions about this policy? Contact us →
        </Link>
      </div>
    </section>
  );
}
