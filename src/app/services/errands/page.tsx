import { Metadata } from "next";
import Link from "next/link";
import RequestForm from "@/components/RequestForm";

export const metadata: Metadata = {
  title: "Errand Services",
  description:
    "Delegate your everyday tasks to Tricore. Pick-up, drop-off, shopping, document collection, local purchases and more.",
};

const errandTypes = [
  "Pick-up",
  "Drop-off",
  "Shopping",
  "Document Collection",
  "Item Delivery",
  "Grocery Purchase",
  "Food Collection",
  "Local Purchases",
  "Household Errands",
  "Business Errands",
];

export default function ErrandsPage() {
  return (
    <>
      {/* Hero with Image */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-tricore-black via-tricore-gray-900 to-tricore-black" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1600&q=80')] bg-cover bg-center opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <p className="text-tricore-red font-semibold text-xs uppercase tracking-[0.25em] mb-3">Errand Service</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">Too Busy? Let Tricore Handle It.</h1>
            <p className="text-tricore-gray-400 text-lg leading-relaxed">Delegate your everyday tasks to Tricore. From pick-ups and drop-offs to shopping and document collection.</p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link href="#errand-form" className="inline-flex items-center justify-center gap-2 bg-tricore-red text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-tricore-red-dark transition-colors">Request an Errand</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features with Image */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-tricore-black mb-6">What We Handle</h2>
              <div className="space-y-3">
                {errandTypes.map((type, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-tricore-red rounded-full shrink-0" />
                    <span className="text-tricore-gray-700 text-sm">{type}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80" alt="Person handling errands" className="w-full h-[400px] object-cover" loading="lazy" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-tricore-red text-white rounded-2xl p-4 shadow-xl hidden sm:block">
                <p className="text-2xl font-bold">Any Task</p>
                <p className="text-xs opacity-90">Handled Professionally</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Request Form */}
      <section id="errand-form" className="py-16 sm:py-20 bg-tricore-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-tricore-black text-center mb-3">Request an Errand</h2>
          <p className="text-tricore-gray-600 text-sm text-center mb-8">Fill in the details below and we will handle the rest.</p>
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-tricore-gray-200 shadow-lg">
            <RequestForm />
          </div>
        </div>
      </section>
    </>
  );
}
