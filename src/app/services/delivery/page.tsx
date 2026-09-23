import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Delivery & Logistics",
  description:
    "Local delivery and convenience logistics service. Pickup requests, scheduled delivery, same-day delivery and order tracking.",
};

const features = [
  "Pickup and delivery requests",
  "Scheduled delivery",
  "Same-day delivery where available",
  "Business deliveries",
  "Document delivery",
  "Food and grocery delivery",
  "Errand-related delivery",
  "Order tracking architecture",
];

const categories = [
  {
    name: "Delivery Types",
    items: [
      "Pickup Requests",
      "Delivery Requests",
      "Scheduled Delivery",
      "Same-day Delivery",
      "Business Deliveries",
      "Document Delivery",
      "Food Delivery",
      "Grocery Delivery",
    ],
  },
];

export default function DeliveryPage() {
  return (
    <>
      {/* Hero with Image */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-tricore-black via-tricore-gray-900 to-tricore-black" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1616432043562-3671ea2e5242?w=1600&q=80')] bg-cover bg-center opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <p className="text-tricore-red font-semibold text-xs uppercase tracking-[0.25em] mb-3">Delivery & Logistics</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">Move Items From Point A to Point B</h1>
            <p className="text-tricore-gray-400 text-lg leading-relaxed">Tricore is your local delivery and convenience logistics partner. We move items efficiently from one location to another with care and professionalism.</p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link href="/request" className="inline-flex items-center justify-center gap-2 bg-tricore-red text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-tricore-red-dark transition-colors">Request Delivery</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features with Image */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1616432043562-3671ea2e5242?w=800&q=80" alt="Delivery rider on motorcycle" className="w-full h-[400px] object-cover" loading="lazy" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-tricore-red text-white rounded-2xl p-4 shadow-xl hidden sm:block">
                <p className="text-2xl font-bold">Fast</p>
                <p className="text-xs opacity-90">Reliable Delivery</p>
              </div>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-tricore-black mb-6">What We Offer</h2>
              <div className="space-y-3">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-tricore-red rounded-full shrink-0" />
                    <span className="text-tricore-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Types */}
      <section className="py-16 sm:py-20 bg-tricore-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-tricore-black mb-3">Delivery Types</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {categories[0].items.map((item) => (
              <span key={item} className="bg-white border border-tricore-gray-200 px-5 py-2.5 rounded-full text-sm text-tricore-gray-700 hover:border-tricore-red hover:text-tricore-red transition-colors">{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Track Order Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-tricore-black text-center mb-4">Track Your Order</h2>
          <p className="text-tricore-gray-600 text-sm text-center mb-8">Enter your order or request ID to check the current status.</p>
          <div className="bg-tricore-gray-50 rounded-2xl p-6 sm:p-8 border border-tricore-gray-200">
            <div className="flex flex-col sm:flex-row gap-3">
              <input type="text" placeholder="Enter Order ID (e.g. TRC-00001)" className="flex-1 border border-tricore-gray-300 rounded-xl px-4 py-3 text-sm text-tricore-black focus:ring-2 focus:ring-tricore-red focus:border-tricore-red outline-none" />
              <Link href="/track-order" className="inline-flex items-center justify-center gap-2 bg-tricore-red text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-tricore-red-dark transition-colors">Track</Link>
            </div>
            <div className="mt-8 space-y-4">
              {["Order placed", "Order confirmed", "Out for delivery", "Delivered"].map((step, i) => (
                <div key={i} className="flex items-center gap-3 text-tricore-gray-400 text-sm">
                  <div className="w-3 h-3 rounded-full bg-tricore-gray-300" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-tricore-gray-500 text-xs text-center">Live tracking will be connected when the backend system is implemented.</p>
          </div>
        </div>
      </section>
    </>
  );
}
