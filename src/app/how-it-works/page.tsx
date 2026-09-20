import { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import {
  ClipboardList,
  Phone,
  Package,
  PartyPopper,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Learn how Tricore works — a simple four-step process to get your food, errands, delivery, groceries and laundry handled.",
};

const steps = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Request",
    description:
      "Tell us what you need. Select a service — food, groceries, errand, delivery, laundry or business — and provide the details.",
  },
  {
    icon: Phone,
    step: "02",
    title: "Confirm",
    description:
      "We confirm availability, cost and delivery or service details. You know exactly what to expect.",
  },
  {
    icon: Package,
    step: "03",
    title: "Process",
    description:
      "Tricore handles your request with care. Our team coordinates the sourcing, pickup, processing or delivery.",
  },
  {
    icon: PartyPopper,
    step: "04",
    title: "Deliver & Enjoy",
    description:
      "Your order or service is completed. You save time and get on with your day.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="bg-tricore-black pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-tricore-red font-semibold text-sm uppercase tracking-wider mb-3">
            How It Works
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">
            Simple. Convenient. Reliable.
          </h1>
          <p className="text-tricore-gray-400 text-lg max-w-2xl mx-auto">
            Getting started with Tricore is easy. Here is how we handle your
            requests from start to finish.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {steps.map((item, i) => (
              <div
                key={item.step}
                className={`flex flex-col sm:flex-row items-center gap-8 ${
                  i % 2 === 1 ? "sm:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-1">
                  <span className="text-tricore-red font-bold text-xs tracking-wider uppercase">
                    Step {item.step}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-tricore-black mt-1 mb-3">
                    {item.title}
                  </h2>
                  <p className="text-tricore-gray-600 text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="w-24 h-24 bg-tricore-red-light rounded-3xl flex items-center justify-center shrink-0">
                  <item.icon className="w-12 h-12 text-tricore-red" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Process */}
      <section className="py-16 sm:py-20 bg-tricore-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-tricore-black text-center mb-10">
            Service-Specific Processes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Food Ordering",
                steps: [
                  "Select food preference",
                  "Share delivery details",
                  "We source from vendor",
                  "Food delivered to you",
                ],
              },
              {
                title: "Errands",
                steps: [
                  "Describe the errand",
                  "Provide pickup/drop details",
                  "We confirm and process",
                  "Errand completed",
                ],
              },
              {
                title: "Delivery",
                steps: [
                  "Enter pickup location",
                  "Enter destination",
                  "We assign a rider",
                  "Item delivered safely",
                ],
              },
              {
                title: "Groceries",
                steps: [
                  "List your items",
                  "Share delivery location",
                  "We source and deliver",
                  "Receive your groceries",
                ],
              },
              {
                title: "Laundry",
                steps: [
                  "Select laundry service",
                  "Provide pickup info",
                  "We collect and process",
                  "Clean clothes delivered",
                ],
              },
              {
                title: "Business Services",
                steps: [
                  "Share your needs",
                  "We create a proposal",
                  "Agree on terms",
                  "Ongoing service delivery",
                ],
              },
            ].map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-2xl p-6 border border-tricore-gray-200"
              >
                <h3 className="font-bold text-tricore-black mb-4">
                  {service.title}
                </h3>
                <div className="space-y-3">
                  {service.steps.map((step, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-tricore-red-light rounded-full flex items-center justify-center text-tricore-red text-xs font-bold shrink-0">
                        {j + 1}
                      </span>
                      <span className="text-tricore-gray-600 text-sm">
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-tricore-black mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-tricore-gray-600 text-base mb-8">
            Tell us what you need and we will handle the rest.
          </p>
          <Link
            href="/request"
            className="inline-flex items-center gap-2 bg-tricore-red text-white px-8 py-3.5 rounded-full text-base font-semibold hover:bg-tricore-red-dark transition-colors"
          >
            Order / Request a Service
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <CTASection />
    </>
  );
}
