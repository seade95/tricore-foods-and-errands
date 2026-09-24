import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getContent } from "@/lib/store";

export const dynamic = "force-dynamic";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  const site = content.site || {};

  return {
    title: {
      default: `${site.name || "Tricore Foods & Errands"} — ${site.tagline || "Nourishing Life. Simplifying Living."}`,
      template: `%s | ${site.name || "Tricore Foods & Errands"}`,
    },
    description: site.description || "",
    keywords: site.keywords || "",
    openGraph: {
      title: `${site.name || "Tricore Foods & Errands"} — ${site.tagline || ""}`,
      description: site.description || "",
      url: site.url || "",
      siteName: site.name || "",
      locale: "en_NG",
      type: "website",
    },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = await getContent();
  const site = content.site || { name: "Tricore Foods & Errands", shortName: "TRICORE", subtitle: "Foods & Errands", tagline: "" };
  const whatsapp = content.whatsapp || { number: "+234XXXXXXXXXX", message: "" };

  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Header
          site={site}
          navLinks={content.navLinks || []}
          services={content.services || []}
        />
        <main className="flex-1">{children}</main>
        <Footer
          site={site}
          services={content.services || []}
          social={content.social || {}}
          footer={content.footer || { description: "", companyLinks: [], supportLinks: [] }}
        />
        <WhatsAppButton number={whatsapp.number} message={whatsapp.message} />
      </body>
    </html>
  );
}
