import { Metadata } from "next";
import Link from "next/link";
import ServicePageTemplate from "@/components/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Grocery Delivery",
  description:
    "Get groceries and everyday essentials sourced and delivered by Tricore. Foodstuff, beverages, household essentials and more.",
};

const features = [
  "Groceries and everyday essentials sourced for you",
  "Foodstuff, beverages, household and personal care",
  "Baby essentials, office essentials and more",
  "Tell us what you need — we source and deliver",
  "Flexible delivery scheduling",
  "Convenient for busy professionals, families and individuals",
];

const categories = [
  {
    name: "What We Can Source",
    items: [
      "Foodstuff",
      "Beverages",
      "Household Essentials",
      "Personal Care",
      "Baby Essentials",
      "Office Essentials",
      "Other Requested Items",
    ],
  },
];

export default function GroceriesPage() {
  return (
    <>
      <ServicePageTemplate
        title="Groceries & Essentials"
        headline="Get Your Groceries Delivered"
        description="Tell us what you need and Tricore will source and deliver your groceries and everyday essentials. No stress, no queues — just convenience."
        features={features}
        categories={categories}
        ctaText="Get Groceries"
        ctaHref="/request"
      />

      <section className="py-16 sm:py-20 bg-tricore-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-tricore-black text-center mb-8">
            Tell Us What You Need
          </h2>
          <form className="space-y-5 bg-white rounded-2xl p-6 sm:p-8 border border-tricore-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-tricore-black mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full border border-tricore-gray-300 rounded-xl px-4 py-3 text-sm text-tricore-black focus:ring-2 focus:ring-tricore-red focus:border-tricore-red outline-none"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-tricore-black mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  className="w-full border border-tricore-gray-300 rounded-xl px-4 py-3 text-sm text-tricore-black focus:ring-2 focus:ring-tricore-red focus:border-tricore-red outline-none"
                  placeholder="+234..."
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-tricore-black mb-1.5">
                Delivery Location *
              </label>
              <input
                type="text"
                required
                className="w-full border border-tricore-gray-300 rounded-xl px-4 py-3 text-sm text-tricore-black focus:ring-2 focus:ring-tricore-red focus:border-tricore-red outline-none"
                placeholder="Your address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-tricore-black mb-1.5">
                Items Required *
              </label>
              <textarea
                rows={4}
                required
                className="w-full border border-tricore-gray-300 rounded-xl px-4 py-3 text-sm text-tricore-black focus:ring-2 focus:ring-tricore-red focus:border-tricore-red outline-none resize-none"
                placeholder="List the groceries or items you need, with quantities where possible..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-tricore-black mb-1.5">
                Preferred Delivery Time
              </label>
              <input
                type="text"
                className="w-full border border-tricore-gray-300 rounded-xl px-4 py-3 text-sm text-tricore-black focus:ring-2 focus:ring-tricore-red focus:border-tricore-red outline-none"
                placeholder="e.g. Today 4pm, Tomorrow morning"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-tricore-black mb-1.5">
                Additional Instructions
              </label>
              <textarea
                rows={2}
                className="w-full border border-tricore-gray-300 rounded-xl px-4 py-3 text-sm text-tricore-black focus:ring-2 focus:ring-tricore-red focus:border-tricore-red outline-none resize-none"
                placeholder="Any special instructions..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-tricore-red text-white px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-tricore-red-dark transition-colors"
            >
              Submit Grocery Request
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
