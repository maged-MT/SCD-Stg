import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Terms and Conditions | CarMarketHub",
  description:
    "CarMarketHub's Terms and Conditions — the rules governing use of our marketplace facilitation platform.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <section className="max-w-[860px] mx-auto px-6 py-20">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Terms and Conditions", path: "/terms" },
        ])}
      />
      <div className="mb-10 text-center">
        <span className="inline-block bg-blue/10 text-blue text-[11px] font-bold tracking-[2.5px] uppercase px-4 py-1.5 rounded-full border border-blue/15 mb-4">
          Legal
        </span>
        <h1 className="text-4xl font-black text-navy tracking-tight mb-4">Terms and Conditions</h1>
      </div>

      <div className="mb-8 bg-light-bg border border-border rounded-2xl p-6">
        <p className="text-gray-text leading-8">
          CarMarketHub operates as a disclosed agent and facilitator. By accessing or using our
          website, you agree to be bound by these Terms and Conditions. Please read them
          carefully.
        </p>
      </div>

      <div className="space-y-6">
        <section className="bg-white border border-border rounded-2xl p-6 shadow-[0_2px_16px_rgba(43,108,245,0.06)]">
          <h2 className="text-xl font-extrabold text-navy mb-3">1. Definitions</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-text leading-8">
            <li>
              <strong className="text-navy">&quot;Platform&quot;</strong> means CarMarketHub and
              the website https://carmarkethub.com/.
            </li>
            <li>
              <strong className="text-navy">&quot;Company&quot;</strong> means CarMarketHub acting
              solely as a disclosed agent and facilitator.
            </li>
            <li>
              <strong className="text-navy">&quot;Seller&quot;</strong> means the individual or
              entity submitting a vehicle for valuation or sale.
            </li>
            <li>
              <strong className="text-navy">&quot;Buyer&quot;</strong> means an approved
              third-party buyer within CarMarketHub&apos;s dealer network.
            </li>
            <li>
              <strong className="text-navy">&quot;Vehicle&quot;</strong> means the motor vehicle
              submitted for valuation and sale.
            </li>
          </ul>
        </section>

        <section className="bg-white border border-border rounded-2xl p-6 shadow-[0_2px_16px_rgba(43,108,245,0.06)]">
          <h2 className="text-xl font-extrabold text-navy mb-3">2. Nature of Service</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-text leading-8">
            <li>
              CarMarketHub operates strictly as a technology-enabled marketplace facilitator and
              service provider.
            </li>
            <li>
              The Company does NOT purchase vehicles, does NOT take ownership or title, and does
              NOT act as an undisclosed agent.
            </li>
            <li>
              CarMarketHub acts solely as a disclosed intermediary between Seller and Buyer. The
              final transaction is concluded directly between Seller and Buyer.
            </li>
          </ul>
        </section>

        <section className="bg-white border border-border rounded-2xl p-6 shadow-[0_2px_16px_rgba(43,108,245,0.06)]">
          <h2 className="text-xl font-extrabold text-navy mb-3">3. Valuation Disclaimer</h2>
          <p className="text-gray-text leading-8">
            Online valuation tools are algorithmic estimates only, non-binding, and subject to
            physical inspection. Final pricing is determined exclusively by the Buyer.
          </p>
        </section>

        <section className="bg-white border border-border rounded-2xl p-6 shadow-[0_2px_16px_rgba(43,108,245,0.06)]">
          <h2 className="text-xl font-extrabold text-navy mb-3">
            4. Inspection &amp; Vehicle Condition
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-text leading-8">
            <li>
              Seller confirms legal ownership and accuracy of vehicle information including
              accidents, finance, and liens.
            </li>
            <li>
              CarMarketHub conducts inspection for information gathering only and does not certify
              mechanical condition.
            </li>
            <li>Any dispute regarding condition is strictly between Seller and Buyer.</li>
          </ul>
        </section>

        <section className="bg-white border border-border rounded-2xl p-6 shadow-[0_2px_16px_rgba(43,108,245,0.06)]">
          <h2 className="text-xl font-extrabold text-navy mb-3">5. Offer Process</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-text leading-8">
            <li>
              Vehicle details are circulated to Buyer network. Buyers submit offers. The highest
              offer may be presented to Seller.
            </li>
            <li>Acceptance creates a direct binding agreement between Seller and Buyer.</li>
            <li>CarMarketHub is not a party to the sale contract.</li>
          </ul>
        </section>

        <section className="bg-white border border-border rounded-2xl p-6 shadow-[0_2px_16px_rgba(43,108,245,0.06)]">
          <h2 className="text-xl font-extrabold text-navy mb-3">6. Title Transfer</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-text leading-8">
            <li>Title transfers directly from Seller to Buyer. CarMarketHub never appears as owner.</li>
            <li>
              Seller is responsible for clearing loans, fines, Salik, and liabilities prior to
              transfer.
            </li>
          </ul>
        </section>

        <section className="bg-white border border-border rounded-2xl p-6 shadow-[0_2px_16px_rgba(43,108,245,0.06)]">
          <h2 className="text-xl font-extrabold text-navy mb-3">7. Documentation</h2>
          <p className="text-gray-text leading-8">
            Upon acceptance, documentation may include a Purchase Agreement under Seller&apos;s
            name and an invoice to Buyer. Documents are generated in facilitator capacity only.
          </p>
        </section>

        <section className="bg-white border border-border rounded-2xl p-6 shadow-[0_2px_16px_rgba(43,108,245,0.06)]">
          <h2 className="text-xl font-extrabold text-navy mb-3">8. Fees</h2>
          <p className="text-gray-text leading-8">
            CarMarketHub may charge Buyer commission or deduct a disclosed service fee. All fees
            will be disclosed prior to transaction confirmation.
          </p>
        </section>

        <section className="bg-white border border-border rounded-2xl p-6 shadow-[0_2px_16px_rgba(43,108,245,0.06)]">
          <h2 className="text-xl font-extrabold text-navy mb-3">9. Limitation of Liability</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-text leading-8">
            <li>
              CarMarketHub is not liable for mechanical defects, hidden damages, title disputes,
              financing issues, payment delays, or third-party acts.
            </li>
            <li>Liability is limited to service fees received.</li>
            <li>No consequential or indirect damages shall be recoverable.</li>
          </ul>
        </section>

        <section className="bg-white border border-border rounded-2xl p-6 shadow-[0_2px_16px_rgba(43,108,245,0.06)]">
          <h2 className="text-xl font-extrabold text-navy mb-3">10. Indemnity</h2>
          <p className="text-gray-text leading-8">
            Seller and Buyer agree to indemnify CarMarketHub against claims arising from
            misrepresentation, fraud, title disputes, or regulatory non-compliance.
          </p>
        </section>

        <section className="bg-white border border-border rounded-2xl p-6 shadow-[0_2px_16px_rgba(43,108,245,0.06)]">
          <h2 className="text-xl font-extrabold text-navy mb-3">11. Governing Law</h2>
          <p className="text-gray-text leading-8">
            These Terms are governed by the laws of the United Arab Emirates. Disputes shall be
            subject to UAE courts.
          </p>
        </section>
      </div>

      <div className="mt-10 text-center">
        <Link href="/contact" className="text-blue font-semibold hover:underline">
          Questions about these terms? Contact us →
        </Link>
      </div>
    </section>
  );
}
