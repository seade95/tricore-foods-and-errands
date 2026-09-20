import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Tricore Foods & Errands — Nourishing Life. Simplifying Living.",
    template: "%s | Tricore Foods & Errands",
  },
  description:
    "Tricore Foods & Errands is an integrated Nigerian convenience and lifestyle service — food ordering, groceries, errands, delivery, logistics and laundry services designed to make everyday life easier.",
  keywords: [
    "Tricore Foods",
    "food delivery Nigeria",
    "errand services",
    "grocery delivery",
    "laundry services Nigeria",
    "delivery logistics",
    "convenience services",
    "Nigerian delivery service",
    "business logistics",
  ],
  openGraph: {
    title: "Tricore Foods & Errands — Nourishing Life. Simplifying Living.",
    description:
      "Food, errands, delivery, logistics and laundry services designed to make everyday life easier.",
    url: "https://tricorefoods.com",
    siteName: "Tricore Foods & Errands",
    locale: "en_NG",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
