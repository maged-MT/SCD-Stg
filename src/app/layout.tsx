import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import JsonLd from "@/components/JsonLd";
import { BUSINESS, SITE_DESCRIPTION, SITE_LOGO, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/seo";
import { BUSINESS_ID } from "@/lib/schema";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const dm = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "sell my car UAE",
    "sell car Dubai",
    "car valuation UAE",
    "car buyer Dubai",
    "cash for cars UAE",
    "instant car evaluation",
    "sell car same day cash",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Automotive",
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    locale: "en_AE",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f2557",
};

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "AutomotiveBusiness",
  "@id": BUSINESS_ID,
  name: BUSINESS.name,
  slogan: BUSINESS.slogan,
  url: SITE_URL,
  logo: SITE_LOGO,
  image: SITE_LOGO,
  telephone: BUSINESS.telephone,
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.address.streetAddress,
    addressLocality: BUSINESS.address.addressLocality,
    addressCountry: BUSINESS.address.addressCountry,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: BUSINESS.geo.latitude,
    longitude: BUSINESS.geo.longitude,
  },
  hasMap: `https://www.google.com/maps?q=${BUSINESS.geo.latitude},${BUSINESS.geo.longitude}`,
  openingHours: BUSINESS.openingHours,
  sameAs: BUSINESS.sameAs,
  areaServed: BUSINESS.areaServed.map((name) => ({
    "@type": "AdministrativeArea",
    name,
  })),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${dm.variable}`}>
      <body className="font-[family-name:var(--font-jakarta)] antialiased">
        <JsonLd data={businessJsonLd} />
        <Header />
        <main>{children}</main>
        <Footer />
        <BottomNav />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
