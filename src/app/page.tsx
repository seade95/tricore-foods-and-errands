import Link from "next/link";
import { siteConfig } from "@/lib/config";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";
import FAQ from "@/components/FAQ";
import HeroSlideshow from "@/components/HeroSlideshow";
import {
  ArrowRight,
  CheckCircle,
  ClipboardList,
  Phone,
  Package,
  PartyPopper,
  Zap,
  Shield,
  Handshake,
  Users,
  Cpu,
  MapPin,
  Star,
} from "lucide-react";

const howItWorks = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Request",
    description: "Tell us what you need.",
  },
  {
    icon: Phone,
    step: "02",
    title: "Confirm",
    description: "We confirm details and cost.",
  },
  {
    icon: Package,
    step: "03",
    title: "Process",
    description: "Tricore handles your request.",
  },
  {
    icon: PartyPopper,
    step: "04",
    title: "Deliver & Enjoy",
    description: "Your service is completed.",
  },
];

const whyTricore = [
  { icon: Zap, title: "Convenience", description: "One platform for multiple everyday needs." },
  { icon: Shield, title: "Reliability", description: "Clear communication and structured processes." },
  { icon: Handshake, title: "Flexibility", description: "Different services from a single platform." },
  { icon: Users, title: "Customer Focus", description: "Services designed around real customer needs." },
  { icon: Cpu, title: "Technology", description: "Technology-enabled ordering and service management." },
  { icon: MapPin, title: "Local Understanding", description: "Built for Nigerian customers and communities." },
];

const faqItems = [
  { question: "How do I order food?", answer: "Select the Food service, tell us what you need and where you are, and we will source and deliver your food from your preferred vendors." },
  { question: "What kinds of errands can Tricore handle?", answer: "Tricore can handle pick-up, drop-off, shopping, document collection, item delivery, local purchases, household errands and business-related tasks." },
  { question: "How does delivery work?", answer: "Submit a delivery request with your pickup and destination details. We confirm the logistics, assign a rider and complete the delivery." },
  { question: "How do I book laundry?", answer: "Select the Laundry service, choose what you need, provide your pickup information and preferred time, and we will handle the rest." },
  { question: "How can I pay?", answer: "We are preparing multiple payment options including card, bank transfer and USSD. Payment details will be confirmed for each request." },
  { question: "How do I track my request?", answer: "Use the Track Order page with your order or request ID to check the current status of your service." },
  { question: "Can organisations use Tricore?", answer: "Yes. Tricore offers Business Solutions for offices, schools, hospitals, NGOs, churches, corporate organisations and other institutions." },
  { question: "Where does Tricore currently operate?", answer: "Tricore currently operates within its confirmed service areas. Please contact us for the latest coverage information." },
];

export default function Home() {
  return (
    <>
      <HeroSlideshow />

      {/* Service Selector */}
      <section className="py-20 sm:py-24 bg-white relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-tricore-red/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-14">
            <p className="text-tricore-red font-semibold text-xs uppercase tracking-[0.25em] mb-3">Our Services</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-tricore-black mb-4">What Can We Help You With?</h2>
            <p className="text-tricore-gray-600 text-base max-w-xl mx-auto leading-relaxed">Select a service below to get started.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteConfig.services.map((service) => (
              <ServiceCard key={service.id} title={service.title} description={service.shortDescription} cta={service.cta} href={service.href} icon={service.icon} />
            ))}
          </div>
        </div>
      </section>

      {/* How Tricore Works */}
      <section className="py-20 sm:py-24 bg-tricore-gray-50 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-tricore-red/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-14">
            <p className="text-tricore-red font-semibold text-xs uppercase tracking-[0.25em] mb-3">Simple Process</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-tricore-black mb-4">How Tricore Works</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, idx) => (
              <div key={item.step} className="relative text-center group">
                {idx < 3 && <div className="hidden lg:block absolute top-7 left-[60%] w-[80%] h-px bg-tricore-gray-200" />}
                <div className="w-14 h-14 bg-tricore-red-light rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-tricore-red group-hover:scale-110 transition-all duration-300">
                  <item.icon className="w-7 h-7 text-tricore-red group-hover:text-white transition-colors" />
                </div>
                <span className="text-tricore-red font-bold text-xs tracking-wider uppercase">Step {item.step}</span>
                <h3 className="font-bold text-tricore-black text-lg mt-1 mb-2">{item.title}</h3>
                <p className="text-tricore-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Food Section */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80" alt="Delicious food" className="w-full h-[400px] object-cover" loading="lazy" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-tricore-red text-white rounded-2xl p-4 shadow-xl hidden sm:block">
                <p className="text-2xl font-bold">100%</p>
                <p className="text-xs opacity-90">Fresh Meals</p>
              </div>
            </div>
            <div>
              <p className="text-tricore-red font-semibold text-xs uppercase tracking-[0.25em] mb-3">Food Service</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-tricore-black mb-5 leading-tight">Order From Your Favourite Vendors</h2>
              <p className="text-tricore-gray-600 text-base leading-relaxed mb-6">Tricore sources and orders food from restaurants and food vendors on your behalf. Whatever you are craving, we help you get it.</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {["Restaurants", "Fast Food", "Local Meals", "Snacks", "Drinks", "Breakfast", "Lunch", "Dinner"].map((cat) => (
                  <span key={cat} className="bg-tricore-gray-50 border border-tricore-gray-200 px-3 py-1.5 rounded-full text-xs text-tricore-gray-600 hover:border-tricore-red hover:text-tricore-red transition-colors cursor-default">{cat}</span>
                ))}
              </div>
              <Link href="/services/food" className="inline-flex items-center gap-2 bg-tricore-red text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-tricore-red-dark hover:shadow-lg hover:shadow-tricore-red/25 transition-all">
                Order Food <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Errands Section */}
      <section className="py-20 sm:py-24 bg-tricore-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <p className="text-tricore-red font-semibold text-xs uppercase tracking-[0.25em] mb-3">Errand Service</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-tricore-black mb-5 leading-tight">Too Busy? Let Tricore Handle It.</h2>
              <p className="text-tricore-gray-600 text-base leading-relaxed mb-8">Delegate your everyday tasks to Tricore. From pick-ups and drop-offs to shopping and document collection.</p>
              <Link href="/services/errands" className="inline-flex items-center gap-2 bg-tricore-red text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-tricore-red-dark hover:shadow-lg hover:shadow-tricore-red/25 transition-all">
                Request an Errand <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80" alt="Errand handling" className="w-full h-[400px] object-cover" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Groceries & Essentials */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80" alt="Fresh groceries" className="w-full h-[400px] object-cover" loading="lazy" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-tricore-red text-white rounded-2xl p-4 shadow-xl hidden sm:block">
                <p className="text-2xl font-bold">Fast</p>
                <p className="text-xs opacity-90">Delivery</p>
              </div>
            </div>
            <div>
              <p className="text-tricore-red font-semibold text-xs uppercase tracking-[0.25em] mb-3">Groceries & Essentials</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-tricore-black mb-5 leading-tight">Sourced & Delivered To Your Door</h2>
              <p className="text-tricore-gray-600 text-base leading-relaxed mb-6">Everyday groceries and household essentials — tell us what you need and we will source and deliver them to you.</p>
              <div className="space-y-3 mb-8">
                {["Fresh produce & pantry staples", "Household & personal care items", "Bulk & family-size orders", "Scheduled or same-day delivery"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-tricore-red shrink-0" />
                    <span className="text-tricore-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/services/groceries" className="inline-flex items-center gap-2 bg-tricore-red text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-tricore-red-dark hover:shadow-lg hover:shadow-tricore-red/25 transition-all">
                Get Groceries <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery & Logistics */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1616432043562-3671ea2e5242?w=800&q=80" alt="Delivery logistics" className="w-full h-[400px] object-cover" loading="lazy" />
              </div>
            </div>
            <div>
              <p className="text-tricore-red font-semibold text-xs uppercase tracking-[0.25em] mb-3">Delivery & Logistics</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-tricore-black mb-5 leading-tight">Move Items From Point A to Point B</h2>
              <p className="text-tricore-gray-600 text-base leading-relaxed mb-6">Your local delivery and convenience logistics partner. We move items efficiently with care and professionalism.</p>
              <div className="space-y-3 mb-8">
                {["Same-day delivery where available", "Scheduled delivery", "Business deliveries", "Order tracking support"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-tricore-red shrink-0" />
                    <span className="text-tricore-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/services/delivery" className="inline-flex items-center gap-2 bg-tricore-red text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-tricore-red-dark hover:shadow-lg hover:shadow-tricore-red/25 transition-all">
                  Request Delivery <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/track-order" className="inline-flex items-center gap-2 border border-tricore-gray-300 text-tricore-black px-6 py-3 rounded-full text-sm font-semibold hover:border-tricore-red hover:text-tricore-red transition-all">
                  Track Order
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tricore Laundry */}
      <section className="py-20 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-tricore-red via-tricore-red-dark to-tricore-black" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=1600&q=80')] bg-cover bg-center opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <p className="text-white/70 font-semibold text-xs uppercase tracking-[0.25em] mb-3">Tricore Laundry</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Fresh Clothes. Less Stress.</h2>
            <p className="text-white/70 text-base max-w-xl mx-auto">Professional laundry care designed around your convenience.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
            {["Wash", "Dry", "Fold", "Ironing", "Pickup", "Delivery"].map((service) => (
              <div key={service} className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20 hover:bg-white/20 transition-all cursor-default">
                <span className="text-white text-sm font-medium">{service}</span>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/services/laundry" className="inline-flex items-center gap-2 bg-white text-tricore-red px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-white/90 hover:shadow-lg transition-all">
              Book Laundry Service <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Business Solutions */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <p className="text-tricore-red font-semibold text-xs uppercase tracking-[0.25em] mb-3">Business Solutions</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-tricore-black mb-5 leading-tight">Convenience for Businesses & Institutions</h2>
              <p className="text-tricore-gray-600 text-base leading-relaxed mb-8">Tricore partners with organisations to handle food, groceries, errands, logistics and laundry support.</p>
              <Link href="/services/business" className="inline-flex items-center gap-2 bg-tricore-red text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-tricore-red-dark hover:shadow-lg hover:shadow-tricore-red/25 transition-all">
                Partner With Tricore <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" alt="Business solutions" className="w-full h-[400px] object-cover" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Tricore */}
      <section className="py-20 sm:py-24 bg-tricore-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-tricore-red font-semibold text-xs uppercase tracking-[0.25em] mb-3">Why Choose Us</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-tricore-black mb-4">Why Tricore?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyTricore.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-7 border border-tricore-gray-200 hover:border-tricore-red/30 hover:shadow-xl transition-all duration-300 group">
                <div className="w-12 h-12 bg-tricore-red-light rounded-xl flex items-center justify-center mb-5 group-hover:bg-tricore-red group-hover:scale-110 transition-all duration-300">
                  <item.icon className="w-6 h-6 text-tricore-red group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-tricore-black text-lg mb-2">{item.title}</h3>
                <p className="text-tricore-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 sm:py-24 bg-tricore-gray-50 relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-tricore-red/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-14">
            <p className="text-tricore-red font-semibold text-xs uppercase tracking-[0.25em] mb-3">What People Say</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-tricore-black mb-4">Trusted by Customers</h2>
            <p className="text-tricore-gray-600 text-base max-w-xl mx-auto leading-relaxed">Real feedback from people who use Tricore every day.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Adaeze O.",
                role: "Working Mum",
                quote: "Tricore has been a lifesaver. I order food, send someone to pick up items from the market, and even have my laundry handled — all from one platform. It saves me hours every week.",
                rating: 5,
              },
              {
                name: "Tunde M.",
                role: "Business Owner",
                quote: "We use Tricore for our office errands and deliveries. The team is professional, communication is clear, and the business solutions package is exactly what we needed.",
                rating: 5,
              },
              {
                name: "Chidinma E.",
                role: "University Student",
                quote: "I used the grocery delivery service and was impressed. What would have taken me a whole afternoon at the market was done in less than two hours. Highly recommend.",
                rating: 5,
              },
            ].map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-8 border border-tricore-gray-200 hover:border-tricore-red/30 hover:shadow-xl transition-all duration-300 relative">
                <div className="absolute top-6 right-6 text-tricore-red/10 text-6xl font-serif leading-none">&ldquo;</div>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-tricore-gray-600 text-sm leading-relaxed mb-6 relative z-10">{t.quote}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-tricore-red-light flex items-center justify-center text-tricore-red font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-tricore-black text-sm">{t.name}</p>
                    <p className="text-tricore-gray-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-tricore-red font-semibold text-xs uppercase tracking-[0.25em] mb-3">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-tricore-black mb-3">Frequently Asked Questions</h2>
          </div>
          <FAQ items={faqItems} />
        </div>
      </section>

      <CTASection />
    </>
  );
}
