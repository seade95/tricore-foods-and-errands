import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import WhatsAppCTA from "./WhatsAppCTA";

interface ServicePageTemplateProps {
  title: string;
  headline: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
  categories?: { name: string; items: string[] }[];
  children?: React.ReactNode;
}

export default function ServicePageTemplate({
  title,
  headline,
  description,
  features,
  ctaText,
  ctaHref,
  categories,
  children,
}: ServicePageTemplateProps) {
  return (
    <>
      <section className="bg-tricore-black pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-tricore-red font-semibold text-sm uppercase tracking-wider mb-3">
              {title}
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
              {headline}
            </h1>
            <p className="text-tricore-gray-400 text-lg leading-relaxed">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link
                href={ctaHref}
                className="inline-flex items-center justify-center gap-2 bg-tricore-red text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-tricore-red-dark transition-colors"
              >
                {ctaText}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <WhatsAppCTA />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-tricore-black mb-6">
                What We Offer
              </h2>
              <div className="space-y-4">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-tricore-red mt-0.5 shrink-0" />
                    <span className="text-tricore-gray-700 text-sm leading-relaxed">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {categories && categories.length > 0 && (
              <div className="space-y-6">
                {categories.map((cat, i) => (
                  <div
                    key={i}
                    className="bg-tricore-gray-50 rounded-2xl p-6 border border-tricore-gray-200"
                  >
                    <h3 className="font-bold text-tricore-black mb-3">
                      {cat.name}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {cat.items.map((item, j) => (
                        <span
                          key={j}
                          className="bg-white border border-tricore-gray-200 px-3 py-1.5 rounded-full text-xs text-tricore-gray-600"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {children}
    </>
  );
}
