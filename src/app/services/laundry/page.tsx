import { Metadata } from "next";
import Link from "next/link";
import RequestForm from "@/components/RequestForm";

export const metadata: Metadata = {
  title: "Laundry Services",
  description:
    "Professional laundry care designed for convenience. Wash, dry, fold, ironing, pickup and delivery — handled by Tricore Laundry.",
};

const features = [
  "Professional wash, dry, fold and ironing services",
  "Laundry pickup from your location",
  "Laundry delivery to your door",
  "Individual laundry service",
  "Household laundry service",
  "Corporate and institutional laundry support",
  "Flexible scheduling",
  "Simple booking workflow",
];

const categories = [
  {
    name: "Services",
    items: [
      "Wash",
      "Dry",
      "Fold",
      "Ironing",
      "Laundry Pickup",
      "Laundry Delivery",
      "Full Service",
    ],
  },
  {
    name: "Customer Types",
    items: [
      "Individual",
      "Household",
      "Corporate",
      "Institutional",
    ],
  },
];

const bookingSteps = [
  { step: "01", title: "Select Service", desc: "Choose the laundry service you need." },
  { step: "02", title: "Enter Pickup Info", desc: "Provide your pickup location and details." },
  { step: "03", title: "Select Date/Time", desc: "Choose your preferred pickup date and time." },
  { step: "04", title: "Submit", desc: "Confirm your booking request." },
  { step: "05", title: "Confirmation", desc: "Receive booking confirmation from Tricore." },
  { step: "06", title: "Track Status", desc: "Monitor your laundry service progress." },
];

export default function LaundryPage() {
  return (
    <>
      <section className="bg-tricore-black pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-tricore-red font-semibold text-sm uppercase tracking-wider mb-3">
              Tricore Laundry
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
              Fresh Clothes. Less Stress.
            </h1>
            <p className="text-tricore-gray-400 text-lg leading-relaxed">
              Professional laundry care designed around your convenience. Wash,
              dry, fold, iron and delivery — all handled by Tricore.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link
                href="#laundry-booking"
                className="inline-flex items-center justify-center gap-2 bg-tricore-red text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-tricore-red-dark transition-colors"
              >
                Book Laundry
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Steps */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-tricore-black text-center mb-10">
            How It Works
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {bookingSteps.map((item) => (
              <div key={item.step} className="text-center">
                <span className="text-tricore-red font-bold text-xs tracking-wider uppercase">
                  Step {item.step}
                </span>
                <h3 className="font-bold text-tricore-black text-sm mt-1 mb-1">
                  {item.title}
                </h3>
                <p className="text-tricore-gray-600 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Laundry Services */}
      <section className="py-16 sm:py-20 bg-tricore-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-tricore-black mb-6">
                Our Laundry Services
              </h2>
              <div className="space-y-4">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-tricore-red rounded-full mt-2 shrink-0" />
                    <span className="text-tricore-gray-700 text-sm leading-relaxed">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              {categories.map((cat, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 border border-tricore-gray-200"
                >
                  <h3 className="font-bold text-tricore-black mb-3">
                    {cat.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item, j) => (
                      <span
                        key={j}
                        className="bg-tricore-gray-50 border border-tricore-gray-200 px-3 py-1.5 rounded-full text-xs text-tricore-gray-600"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section id="laundry-booking" className="py-16 sm:py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-tricore-black text-center mb-3">
            Book a Laundry Service
          </h2>
          <p className="text-tricore-gray-600 text-sm text-center mb-8">
            Select your service and provide pickup details.
          </p>
          <div className="bg-tricore-gray-50 rounded-2xl p-6 sm:p-8 border border-tricore-gray-200">
            <RequestForm />
          </div>
        </div>
      </section>
    </>
  );
}
