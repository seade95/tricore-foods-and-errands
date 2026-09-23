import { Metadata } from "next";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";
import { getContent } from "@/lib/store";
import type { Content, Service } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = getContent() as Content;
  return {
    title: "Services",
    description: content.servicesPage?.heroDescription || "Explore all Tricore services.",
  };
}

export default function ServicesPage() {
  const content = getContent() as Content;
  const services = (content.services || []).filter((s: Service) => s.enabled !== false);
  const sp = content.servicesPage || ({} as Content["servicesPage"]);
  const whatsapp = content.whatsapp || { number: "+234XXXXXXXXXX", message: "" };

  return (
    <>
      <section className="bg-tricore-black pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">
            {sp.heroHeading || "Our Services"}
          </h1>
          <p className="text-tricore-gray-400 text-lg max-w-2xl mx-auto">
            {sp.heroDescription}
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.shortDescription}
                cta={service.cta}
                href={service.href}
                icon={service.icon}
                image={service.image}
              />
            ))}
          </div>
        </div>
      </section>

      <CTASection whatsapp={whatsapp} />
    </>
  );
}
