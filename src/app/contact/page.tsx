import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact Us | Smart Car Deals UAE",
  description:
    "Get in touch with Smart Car Deals. Call, WhatsApp, or send us a message — our team responds within 30 minutes during business hours (Sat–Thu, 10AM–8PM).",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact Us", path: "/contact" },
        ])}
      />
      <ContactPageClient />
    </>
  );
}
