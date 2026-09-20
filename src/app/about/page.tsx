import { Metadata } from "next";
import CTASection from "@/components/CTASection";
import { Target, Eye, Heart, Lightbulb, Users, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Tricore Foods and Errands - our mission, vision, values and the story behind Nigeria's integrated convenience ecosystem.",
};

const values = [
  { icon: Heart, title: "Service Excellence", description: "We are committed to delivering quality service in every interaction." },
  { icon: Lightbulb, title: "Innovation", description: "We leverage technology to make everyday life simpler and more efficient." },
  { icon: Users, title: "Customer Centricity", description: "Every service is designed around real customer needs and realities." },
  { icon: MapPin, title: "Local Focus", description: "We understand and serve the unique needs of Nigerian communities." },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-tricore-black via-tricore-gray-900 to-tricore-black" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80')] bg-cover bg-center opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <p className="text-tricore-red font-semibold text-xs uppercase tracking-[0.25em] mb-3">About Us</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">The Story of Tricore</h1>
            <p className="text-tricore-gray-400 text-lg leading-relaxed">Tricore Foods and Errands was established to simplify everyday living by providing an integrated platform for food ordering, errands, groceries, delivery and related convenience services.</p>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-tricore-black mb-6">Nourishing Life. Simplifying Living.</h2>
              <p className="text-tricore-gray-600 text-base leading-relaxed mb-5">Tricore is designed around a simple philosophy - making everyday life easier for individuals, families, professionals, businesses and institutions.</p>
              <p className="text-tricore-gray-600 text-base leading-relaxed mb-5">We are not merely a food delivery company. Tricore is a convenience ecosystem built around helping customers obtain what they need and get tasks handled efficiently.</p>
              <p className="text-tricore-gray-600 text-base leading-relaxed">From food and groceries to errands, delivery, logistics and laundry - Tricore is your one trusted place for everyday convenience.</p>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" alt="Team collaboration" className="w-full h-[450px] object-cover" loading="lazy" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl border border-tricore-gray-100 hidden sm:block">
                <p className="text-tricore-red text-3xl font-bold">1</p>
                <p className="text-tricore-gray-600 text-xs">Trusted Platform</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-tricore-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-tricore-gray-200 hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-tricore-red-light rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-tricore-red" />
              </div>
              <h3 className="font-bold text-tricore-black text-xl mb-3">Our Mission</h3>
              <p className="text-tricore-gray-600 text-sm leading-relaxed">To simplify everyday living by providing reliable, convenient and technology-enabled food, errand, delivery, logistics and household services.</p>
            </div>
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-tricore-gray-200 hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-tricore-red-light rounded-2xl flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-tricore-red" />
              </div>
              <h3 className="font-bold text-tricore-black text-xl mb-3">Our Vision</h3>
              <p className="text-tricore-gray-600 text-sm leading-relaxed">To build an interconnected convenience ecosystem that serves as the go-to platform for everyday needs in Nigerian communities.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-tricore-red font-semibold text-xs uppercase tracking-[0.25em] mb-3">Our Values</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-tricore-black">Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="bg-tricore-gray-50 rounded-2xl p-7 border border-tricore-gray-200 hover:border-tricore-red/30 hover:shadow-lg transition-all duration-300 group text-center">
                <div className="w-14 h-14 bg-tricore-red-light rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-tricore-red group-hover:scale-110 transition-all duration-300">
                  <value.icon className="w-7 h-7 text-tricore-red group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-tricore-black mb-2">{value.title}</h3>
                <p className="text-tricore-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-tricore-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80" alt="Service philosophy" className="w-full h-[400px] object-cover" loading="lazy" />
              </div>
            </div>
            <div>
              <p className="text-tricore-red font-semibold text-xs uppercase tracking-[0.25em] mb-3">Service Philosophy</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-tricore-black mb-6">We Believe in Simplicity</h2>
              <p className="text-tricore-gray-600 text-base leading-relaxed mb-8">Everyday tasks should not consume your day. Tricore exists so that individuals, families and organisations can delegate routine tasks and focus on what matters most to them.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {["Trust", "Convenience", "Speed", "Simplicity", "Professionalism", "Local Relevance"].map((pillar) => (
                  <div key={pillar} className="bg-white rounded-xl p-4 border border-tricore-gray-200 text-center">
                    <span className="font-semibold text-tricore-black text-sm">{pillar}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-tricore-black mb-4">Leadership</h2>
          <p className="text-tricore-gray-600 text-sm">Information about the Tricore leadership team will be shared here once available.</p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
