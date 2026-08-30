import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, faqJsonLd, type FaqItem } from "@/lib/schema";

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions | Smart Car Deals UAE",
  description:
    "Answers to common questions about selling your car with Smart Car Deals — how the process works, valuations, payment, ownership transfer, fees, and data security.",
  alternates: {
    canonical: "/faq",
  },
};

const faqs: FaqItem[] = [
  {
    question: "What is Smart Car Deals?",
    answer:
      "Smart Car Deals is a vehicle selling platform that connects car owners directly with a network of verified buyers. We facilitate inspection, price discovery, and title transfer.",
  },
  {
    question: "Do you buy my car?",
    answer:
      "Smart Car Deals works with a trusted network of licensed car buyers. We handle the inspection, valuation, and paperwork so your car is matched with the buyer offering the best price.",
  },
  {
    question: "How does the process work?",
    answer:
      "1. Submit your car details online. 2. Book an inspection (branch or home service). 3. We inspect and photograph the vehicle. 4. Your vehicle is shared with our buyer network. 5. We present the highest offer. 6. If accepted, title transfers directly to the buyer.",
  },
  {
    question: "Is the online valuation the final price?",
    answer:
      "No. The online valuation is an estimate based on market data. The final offer depends on physical inspection, vehicle condition, buyer demand, and market conditions.",
  },
  {
    question: "What happens during inspection?",
    answer:
      "Our team verifies vehicle details, takes professional photos, notes mechanical and cosmetic condition, and checks documentation. This is not a mechanical certification.",
  },
  {
    question: "Am I obligated to sell after inspection?",
    answer: "No. You are free to accept or reject any offer. There is no obligation to proceed.",
  },
  {
    question: "How long does it take to receive an offer?",
    answer: "30 minutes.",
  },
  {
    question: "Can I negotiate the offer?",
    answer:
      "Yes. If the offer is below expectation, we may re-circulate the vehicle to buyers. However, we cannot guarantee higher bids.",
  },
  {
    question: "Who pays me?",
    answer: "The buyer who purchases your car. Smart Car Deals facilitates the entire process.",
  },
  {
    question: "How is payment made?",
    answer: "Payment is typically done via bank transfer or cash at the time of title transfer.",
  },
  {
    question: "When is ownership transferred?",
    answer: "Ownership transfers directly from you to the buyer at the relevant transport authority (e.g., RTA).",
  },
  {
    question: "What if my car has a loan?",
    answer:
      "Outstanding loans must be cleared before transfer. We can assist in coordinating the process, but completion depends on settlement procedures.",
  },
  {
    question: "Is there a fee to use Smart Car Deals?",
    answer: "Our inspection and valuation tool is completely FREE.",
  },
  {
    question: "Are there hidden charges?",
    answer: "No. All charges are disclosed prior to confirmation of sale.",
  },
  {
    question: "Are you responsible for the condition of my car?",
    answer:
      "The Seller is responsible for ensuring that all vehicle information provided is accurate. Any disputes regarding vehicle condition are between the Seller and the buyer.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. We use secure systems and encryption to protect your data and only share information with relevant parties necessary to complete the transaction.",
  },
];

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ])}
      />
      <JsonLd data={faqJsonLd(faqs)} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#f0f7ff] via-[#e2eeff] to-[#f0f7ff] border-b border-blue/10 pt-24 pb-16 px-6 text-center">
        <div className="max-w-[800px] mx-auto">
          <span className="inline-block bg-blue/10 text-blue text-[11px] font-bold tracking-[2.5px] uppercase px-4 py-1.5 rounded-full border border-blue/15 mb-4">
            FAQ
          </span>
          <h1 className="text-4xl lg:text-5xl font-black text-navy tracking-[-2px] mb-4">
            Frequently Asked <span className="text-blue">Questions</span>
          </h1>
          <p className="text-gray-text text-lg leading-7">
            Everything you need to know about selling your car with Smart Car Deals.
          </p>
        </div>
      </section>

      {/* Q&A grid */}
      <section className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {faqs.map((item) => (
            <div
              key={item.question}
              className="bg-white rounded-2xl border border-border shadow-[0_4px_20px_rgba(15,37,87,0.05)] p-6"
            >
              <h3 className="text-base font-extrabold text-navy mb-2">{item.question}</h3>
              <p className="text-sm text-gray-text leading-7">{item.answer}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 bg-light-bg rounded-2xl border border-border p-10 text-center">
          <h2 className="text-2xl font-extrabold text-navy mb-2">Still have questions?</h2>
          <p className="text-gray-text mb-6">Our support team is here to help you with any inquiries you may have.</p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-br from-blue to-blue-dark text-white rounded-xl font-extrabold text-[15px] shadow-[0_8px_24px_rgba(43,108,245,0.4)] hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(43,108,245,0.5)] transition-all duration-200"
          >
            Contact Support
          </Link>
        </div>
      </section>
    </>
  );
}
