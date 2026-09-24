import { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import { getContent } from "@/lib/store";
import type { Content, StepItem } from "@/lib/types";
import {
  ClipboardList,
  Phone,
  Package,
  PartyPopper,
  ArrowRight,
} from "lucide-react";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "How It Works",
    description: "Learn how Tricore works — a simple four-step process.",
  };
}

const stepIcons: Record<string, React.ElementType> = { ClipboardList, Phone, Package, PartyPopper };

export default async function HowItWorksPage() {
  const content = await getContent() as Content;
  const hiw = content.howItWorksPage || ({} as Content["howItWorksPage"]);
  const whatsapp = content.whatsapp || { number: "+234XXXXXXXXXX", message: "" };
  const steps = (hiw.steps || []).map((s: StepItem) => ({
    icon: stepIcons[s.icon] || ClipboardList,
    step: s.step,
    title: s.title,
    description: s.description,
  }));

  return (
    <>
      <section className="bg-tricore-black pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-tricore-red font-semibold text-sm uppercase tracking-wider mb-3">{hiw.heroTag}</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">{hiw.heroHeading}</h1>
          <p className="text-tricore-gray-400 text-lg max-w-2xl mx-auto">{hiw.heroDescription}</p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {steps.map((item, i) => (
              <div key={item.step} className={`flex flex-col sm:flex-row items-center gap-8 ${i % 2 === 1 ? "sm:flex-row-reverse" : ""}`}>
                <div className="flex-1">
                  <span className="text-tricore-red font-bold text-xs tracking-wider uppercase">Step {item.step}</span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-tricore-black mt-1 mb-3">{item.title}</h2>
                  <p className="text-tricore-gray-600 text-base leading-relaxed">{item.description}</p>
                </div>
                <div className="w-24 h-24 bg-tricore-red-light rounded-3xl flex items-center justify-center shrink-0">
                  <item.icon className="w-12 h-12 text-tricore-red" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-tricore-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-tricore-black text-center mb-10">{hiw.serviceProcessesHeading}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(hiw.serviceProcesses || []).map((service) => (
              <div key={service.title} className="bg-white rounded-2xl p-6 border border-tricore-gray-200">
                <h3 className="font-bold text-tricore-black mb-4">{service.title}</h3>
                <div className="space-y-3">
                  {(service.steps || []).map((step: string, j: number) => (
                    <div key={j} className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-tricore-red-light rounded-full flex items-center justify-center text-tricore-red text-xs font-bold shrink-0">{j + 1}</span>
                      <span className="text-tricore-gray-600 text-sm">{step}</span>
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
          <h2 className="text-2xl sm:text-3xl font-bold text-tricore-black mb-4">{hiw.ctaHeading}</h2>
          <p className="text-tricore-gray-600 text-base mb-8">{hiw.ctaText}</p>
          <Link href="/request" className="inline-flex items-center gap-2 bg-tricore-red text-white px-8 py-3.5 rounded-full text-base font-semibold hover:bg-tricore-red-dark transition-colors">
            {hiw.ctaButton}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <CTASection whatsapp={whatsapp} />
    </>
  );
}
