import { Metadata } from "next";
import { siteConfig } from "@/lib/config";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore all Tricore services — food ordering, grocery delivery, errands, delivery & logistics, laundry and business solutions.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-tricore-black pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">
            Our Services
          </h1>
          <p className="text-tricore-gray-400 text-lg max-w-2xl mx-auto">
            Tricore is a convenience ecosystem — one platform for multiple
            everyday needs. Explore what we can do for you.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteConfig.services.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.shortDescription}
                cta={service.cta}
                href={service.href}
                icon={service.icon}
              />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
