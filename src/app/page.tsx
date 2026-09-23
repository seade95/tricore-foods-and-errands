import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";
import FAQ from "@/components/FAQ";
import HeroSlideshow from "@/components/HeroSlideshow";
import { getContent } from "@/lib/store";
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

export const dynamic = "force-dynamic";

const iconMap: Record<string, React.ElementType> = {
  Zap,
  Shield,
  Handshake,
  Users,
  Cpu,
  MapPin,
  ClipboardList,
  Phone,
  Package,
  PartyPopper,
};

export default function Home() {
  const content = getContent();
  const hp = content.homepage;
  const whatsapp = content.whatsapp || { number: "+234XXXXXXXXXX", message: "" };
  const slides = (content.slides || []).filter((s: any) => s.enabled !== false);
  const services = (content.services || []).filter((s: any) => s.enabled !== false);
  const testimonials = (content.testimonials || []).filter((t: any) => t.enabled !== false);
  const faqItems = (content.faq || []).filter((f: any) => f.enabled !== false);
  const whyItems = (hp?.whyTricoreSection?.items || []).map((item: any) => ({
    icon: iconMap[item.icon] || Zap,
    title: item.title,
    description: item.description,
  }));
  const howSteps = (hp?.howItWorksSection?.steps || []).map((step: any) => ({
    icon: iconMap[step.icon] || ClipboardList,
    step: step.step,
    title: step.title,
    description: step.description,
  }));

  return (
    <>
      <HeroSlideshow slides={slides} />

      {/* Service Selector */}
      <section className="py-20 sm:py-24 bg-white relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-tricore-red/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-14">
            <p className="text-tricore-red font-semibold text-xs uppercase tracking-[0.25em] mb-3">{hp?.servicesSection?.tag || "Our Services"}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-tricore-black mb-4">{hp?.servicesSection?.heading || "What Can We Help You With?"}</h2>
            <p className="text-tricore-gray-600 text-base max-w-xl mx-auto leading-relaxed">{hp?.servicesSection?.description || "Select a service below to get started."}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service: any) => (
              <ServiceCard key={service.id} title={service.title} description={service.shortDescription} cta={service.cta} href={service.href} icon={service.icon} image={service.image} />
            ))}
          </div>
        </div>
      </section>

      {/* How Tricore Works */}
      <section className="py-20 sm:py-24 bg-tricore-gray-50 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-tricore-red/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-14">
            <p className="text-tricore-red font-semibold text-xs uppercase tracking-[0.25em] mb-3">{hp?.howItWorksSection?.tag || "Simple Process"}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-tricore-black mb-4">{hp?.howItWorksSection?.heading || "How Tricore Works"}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {howSteps.map((item: any, idx: number) => (
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
                <img src={hp?.foodSection?.image} alt="Delicious food" className="w-full h-[400px] object-cover" loading="lazy" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-tricore-red text-white rounded-2xl p-4 shadow-xl hidden sm:block">
                <p className="text-2xl font-bold">{hp?.foodSection?.badge?.value}</p>
                <p className="text-xs opacity-90">{hp?.foodSection?.badge?.label}</p>
              </div>
            </div>
            <div>
              <p className="text-tricore-red font-semibold text-xs uppercase tracking-[0.25em] mb-3">{hp?.foodSection?.tag}</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-tricore-black mb-5 leading-tight">{hp?.foodSection?.heading}</h2>
              <p className="text-tricore-gray-600 text-base leading-relaxed mb-6">{hp?.foodSection?.description}</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {(hp?.foodSection?.categories || []).map((cat: string) => (
                  <span key={cat} className="bg-tricore-gray-50 border border-tricore-gray-200 px-3 py-1.5 rounded-full text-xs text-tricore-gray-600 hover:border-tricore-red hover:text-tricore-red transition-colors cursor-default">{cat}</span>
                ))}
              </div>
              <Link href={hp?.foodSection?.ctaHref || "/services/food"} className="inline-flex items-center gap-2 bg-tricore-red text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-tricore-red-dark hover:shadow-lg hover:shadow-tricore-red/25 transition-all">
                {hp?.foodSection?.cta} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Groceries Section */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img src={hp?.groceriesSection?.image} alt="Fresh groceries" className="w-full h-[400px] object-cover" loading="lazy" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-tricore-red text-white rounded-2xl p-4 shadow-xl hidden sm:block">
                <p className="text-2xl font-bold">{hp?.groceriesSection?.badge?.value}</p>
                <p className="text-xs opacity-90">{hp?.groceriesSection?.badge?.label}</p>
              </div>
            </div>
            <div>
              <p className="text-tricore-red font-semibold text-xs uppercase tracking-[0.25em] mb-3">{hp?.groceriesSection?.tag}</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-tricore-black mb-5 leading-tight">{hp?.groceriesSection?.heading}</h2>
              <p className="text-tricore-gray-600 text-base leading-relaxed mb-6">{hp?.groceriesSection?.description}</p>
              <div className="space-y-3 mb-8">
                {(hp?.groceriesSection?.features || []).map((item: string, i: number) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-tricore-red shrink-0" />
                    <span className="text-tricore-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <Link href={hp?.groceriesSection?.ctaHref || "/services/groceries"} className="inline-flex items-center gap-2 bg-tricore-red text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-tricore-red-dark hover:shadow-lg hover:shadow-tricore-red/25 transition-all">
                {hp?.groceriesSection?.cta} <ArrowRight className="w-4 h-4" />
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
              <p className="text-tricore-red font-semibold text-xs uppercase tracking-[0.25em] mb-3">{hp?.errandsSection?.tag}</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-tricore-black mb-5 leading-tight">{hp?.errandsSection?.heading}</h2>
              <p className="text-tricore-gray-600 text-base leading-relaxed mb-8">{hp?.errandsSection?.description}</p>
              <Link href={hp?.errandsSection?.ctaHref || "/services/errands"} className="inline-flex items-center gap-2 bg-tricore-red text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-tricore-red-dark hover:shadow-lg hover:shadow-tricore-red/25 transition-all">
                {hp?.errandsSection?.cta} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img src={hp?.errandsSection?.image} alt="Errand handling" className="w-full h-[400px] object-cover" loading="lazy" />
              </div>
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
                <img src={hp?.deliverySection?.image} alt="Delivery logistics" className="w-full h-[400px] object-cover" loading="lazy" />
              </div>
            </div>
            <div>
              <p className="text-tricore-red font-semibold text-xs uppercase tracking-[0.25em] mb-3">{hp?.deliverySection?.tag}</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-tricore-black mb-5 leading-tight">{hp?.deliverySection?.heading}</h2>
              <p className="text-tricore-gray-600 text-base leading-relaxed mb-6">{hp?.deliverySection?.description}</p>
              <div className="space-y-3 mb-8">
                {(hp?.deliverySection?.features || []).map((item: string, i: number) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-tricore-red shrink-0" />
                    <span className="text-tricore-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href={hp?.deliverySection?.ctaHref || "/services/delivery"} className="inline-flex items-center gap-2 bg-tricore-red text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-tricore-red-dark hover:shadow-lg hover:shadow-tricore-red/25 transition-all">
                  {hp?.deliverySection?.cta} <ArrowRight className="w-4 h-4" />
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
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${hp?.laundrySection?.image})` }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <p className="text-white/70 font-semibold text-xs uppercase tracking-[0.25em] mb-3">{hp?.laundrySection?.tag}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">{hp?.laundrySection?.heading}</h2>
            <p className="text-white/70 text-base max-w-xl mx-auto">{hp?.laundrySection?.description}</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
            {(hp?.laundrySection?.services || []).map((service: string) => (
              <div key={service} className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20 hover:bg-white/20 transition-all cursor-default">
                <span className="text-white text-sm font-medium">{service}</span>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href={hp?.laundrySection?.ctaHref || "/services/laundry"} className="inline-flex items-center gap-2 bg-white text-tricore-red px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-white/90 hover:shadow-lg transition-all">
              {hp?.laundrySection?.cta} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Business Solutions */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <p className="text-tricore-red font-semibold text-xs uppercase tracking-[0.25em] mb-3">{hp?.businessSection?.tag}</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-tricore-black mb-5 leading-tight">{hp?.businessSection?.heading}</h2>
              <p className="text-tricore-gray-600 text-base leading-relaxed mb-8">{hp?.businessSection?.description}</p>
              <Link href={hp?.businessSection?.ctaHref || "/services/business"} className="inline-flex items-center gap-2 bg-tricore-red text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-tricore-red-dark hover:shadow-lg hover:shadow-tricore-red/25 transition-all">
                {hp?.businessSection?.cta} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img src={hp?.businessSection?.image} alt="Business solutions" className="w-full h-[400px] object-cover" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Tricore */}
      <section className="py-20 sm:py-24 bg-tricore-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-tricore-red font-semibold text-xs uppercase tracking-[0.25em] mb-3">{hp?.whyTricoreSection?.tag}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-tricore-black mb-4">{hp?.whyTricoreSection?.heading}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyItems.map((item: any) => (
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
            <p className="text-tricore-red font-semibold text-xs uppercase tracking-[0.25em] mb-3">{hp?.testimonialsSection?.tag}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-tricore-black mb-4">{hp?.testimonialsSection?.heading}</h2>
            <p className="text-tricore-gray-600 text-base max-w-xl mx-auto leading-relaxed">{hp?.testimonialsSection?.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t: any) => (
              <div key={t.id} className="bg-white rounded-2xl p-8 border border-tricore-gray-200 hover:border-tricore-red/30 hover:shadow-xl transition-all duration-300 relative">
                <div className="absolute top-6 right-6 text-tricore-red/10 text-6xl font-serif leading-none">&ldquo;</div>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_: any, i: number) => (
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
            <p className="text-tricore-red font-semibold text-xs uppercase tracking-[0.25em] mb-3">{hp?.faqSection?.tag}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-tricore-black mb-3">{hp?.faqSection?.heading}</h2>
          </div>
          <FAQ items={faqItems} />
        </div>
      </section>

      <CTASection
        whatsapp={whatsapp}
        heading={hp?.ctaSection?.heading}
        description={hp?.ctaSection?.description}
        image={hp?.ctaSection?.image}
        cta1={hp?.ctaSection?.cta1}
        cta1Href={hp?.ctaSection?.cta1Href}
      />
    </>
  );
}
