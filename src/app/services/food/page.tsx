import Link from "next/link";
import { Metadata } from "next";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import { getContent } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Food Ordering",
    description: "Order meals from your favourite restaurants and food vendors through Tricore.",
  };
}

const features = [
  "Order from your favourite restaurants and food vendors",
  "Browse by category — restaurants, fast food, local meals, snacks, drinks",
  "Breakfast, lunch, dinner and special requests",
  "Schedule delivery at your preferred time",
  "Track your food order status",
  "Rate and review your experience",
  "Architecture built for vendor directory, menus, cart and order placement",
];

const categories = [
  {
    name: "Food Categories",
    items: [
      "Restaurants",
      "Fast Food",
      "Local Meals",
      "Snacks",
      "Drinks",
      "Breakfast",
      "Lunch",
      "Dinner",
      "Special Requests",
    ],
  },
];

export default function FoodPage() {
  const content = getContent();
  const whatsapp = content.whatsapp || { number: "+234XXXXXXXXXX", message: "" };

  return (
    <>
      <ServicePageTemplate
        title="Food Service"
        headline="Order From Your Favourite Vendors"
        description="Tricore sources and orders food from restaurants and food vendors on your behalf. Whatever you are craving, we help you get it — conveniently and reliably."
        features={features}
        categories={categories}
        ctaText="Order Food"
        ctaHref="/request"
        whatsapp={whatsapp}
      />

      <section className="py-16 sm:py-20 bg-tricore-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-tricore-black mb-4">How Food Ordering Works</h2>
          <p className="text-tricore-gray-600 text-sm max-w-xl mx-auto mb-10">Tell us what you would like to eat and where to deliver it. We handle the rest.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { step: "1", title: "Tell Us", desc: "Select your food preference and share delivery details." },
              { step: "2", title: "We Source", desc: "Tricore orders from your preferred food vendor." },
              { step: "3", title: "You Enjoy", desc: "Your food is delivered to your location." },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-2xl p-6 border border-tricore-gray-200">
                <span className="text-tricore-red font-bold text-xs tracking-wider uppercase">Step {item.step}</span>
                <h3 className="font-bold text-tricore-black text-lg mt-1 mb-2">{item.title}</h3>
                <p className="text-tricore-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/request" className="inline-flex items-center gap-2 bg-tricore-red text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-tricore-red-dark transition-colors">
              Order Food Now
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-tricore-black mb-4">Future Features</h2>
          <p className="text-tricore-gray-600 text-sm mb-8">We are building toward a complete food ordering experience.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {["Vendor Directory", "Menus & Pricing", "Food Categories", "Shopping Cart", "Order Placement", "Order History", "Ratings & Reviews", "Customer Accounts", "Delivery Tracking"].map((feature) => (
              <div key={feature} className="bg-tricore-gray-50 rounded-xl p-4 border border-tricore-gray-200">
                <span className="text-tricore-gray-600 text-xs font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
