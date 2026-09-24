import { Metadata } from "next";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import { getContent } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Groceries & Essentials",
    description: "Get groceries and everyday essentials sourced and delivered by Tricore.",
  };
}

const features = [
  "Fresh produce, pantry staples and household items",
  "Tell us your list — we source everything for you",
  "Same-day and scheduled delivery options",
  "Bulk and family-size orders supported",
  "Quality-checked items before delivery",
  "Affordable and transparent pricing",
];

const categories = [
  {
    name: "What We Source",
    items: ["Fresh Produce", "Pantry Staples", "Dairy & Eggs", "Snacks", "Beverages", "Household Items", "Personal Care", "Baby Supplies", "Cleaning Products"],
  },
];

export default async function GroceriesPage() {
  const content = await getContent();
  const whatsapp = content.whatsapp || { number: "+234XXXXXXXXXX", message: "" };

  return (
    <ServicePageTemplate
      title="Groceries & Essentials"
      headline="Get Your Groceries Delivered"
      description="Tell us what you need and Tricore will source it and deliver it to your door. Save time on routine shopping."
      features={features}
      categories={categories}
      ctaText="Get Groceries"
      ctaHref="/request"
      whatsapp={whatsapp}
    />
  );
}
