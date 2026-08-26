import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Privacy Policy | Smart Car Deals UAE",
  description: "Read the privacy policy for Smart Car Deals — how we collect, use, and protect your data.",
  alternates: {
    canonical: "/policy",
  },
};

export default function PolicyPage() {
  return (
    <section className="max-w-[860px] mx-auto px-6 py-20">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/policy" },
        ])}
      />
      <div className="mb-10">
        <span className="inline-block bg-blue/10 text-blue text-[11px] font-bold tracking-[2.5px] uppercase px-4 py-1.5 rounded-full border border-blue/15 mb-4">
          Legal
        </span>
        <h1 className="text-4xl font-black text-navy tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-gray-text text-sm">Last updated: August 2026</p>
      </div>

      <div className="prose prose-lg max-w-none text-gray-text leading-8 space-y-8">
        <section>
          <h2 className="text-xl font-extrabold text-navy mb-3">1. Information We Collect</h2>
          <p>
            When you use Smart Car Deals, we collect information you provide directly to us, such as
            your name, phone number, email address, and vehicle details (make, model, year, mileage).
            We also collect information automatically when you visit our website, including IP address,
            browser type, and pages visited.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-extrabold text-navy mb-3">2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>Process your car valuation request and provide you with an offer</li>
            <li>Contact you regarding your inquiry via phone, WhatsApp, or email</li>
            <li>Improve our services and website experience</li>
            <li>Send you relevant updates (you may opt out at any time)</li>
            <li>Comply with legal obligations in the UAE</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-extrabold text-navy mb-3">3. Information Sharing</h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. We may share
            your information with trusted service providers who assist us in operating our website and
            conducting our business, provided they agree to keep this information confidential.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-extrabold text-navy mb-3">4. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information against
            unauthorized access, alteration, disclosure, or destruction. All form submissions are
            transmitted over HTTPS.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-extrabold text-navy mb-3">5. Cookies</h2>
          <p>
            We use cookies to enhance your experience on our website. You may choose to disable cookies
            through your browser settings, though this may affect some functionality of the site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-extrabold text-navy mb-3">6. Your Rights</h2>
          <p>
            You have the right to access, update, or delete your personal information at any time. To
            exercise these rights, please contact us at the details below.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-extrabold text-navy mb-3">7. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <div className="bg-light-bg border border-border rounded-xl p-5 mt-4 space-y-2">
            <p className="font-bold text-navy">Smart Car Deals</p>
            <p>1st Floor, JAC Bldg, Al Safeena Street, Sheikh Zayed Rd, Dubai, UAE</p>
            <p>
              <a href="tel:0522499708" className="text-blue font-semibold hover:underline">052 249 9708</a>
            </p>
            <p>
              <Link href="/contact" className="text-blue font-semibold hover:underline">Contact Form →</Link>
            </p>
          </div>
        </section>
      </div>
    </section>
  );
}
