import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  whatsapp: { number: string; message: string };
  heading?: string;
  description?: string;
  image?: string;
  cta1?: string;
  cta1Href?: string;
}

export default function CTASection({
  whatsapp,
  heading = "Ready to Simplify Your Day?",
  description = "Let Tricore handle your food, errands, delivery, groceries and laundry. One trusted platform for all your everyday convenience needs.",
  image = "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80",
  cta1 = "Order / Request a Service",
  cta1Href = "/request",
}: CTASectionProps) {
  const waUrl = `https://wa.me/${whatsapp.number.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(whatsapp.message)}`;

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-tricore-black via-tricore-gray-900 to-tricore-black" />
      <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: `url(${image})` }} />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-tricore-red/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-tricore-red/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5">
          {heading.includes("Your Day") ? (
            <>
              Ready to Simplify <span className="text-tricore-red">Your Day?</span>
            </>
          ) : (
            heading
          )}
        </h2>
        <p className="text-tricore-gray-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={cta1Href}
            className="inline-flex items-center gap-2 bg-tricore-red text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-tricore-red-dark transition-all hover:shadow-lg hover:shadow-tricore-red/25"
          >
            {cta1}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-[#20BD5A] transition-all hover:shadow-lg hover:shadow-[#25D366]/25"
          >
            Chat With Us
          </a>
        </div>
      </div>
    </section>
  );
}
