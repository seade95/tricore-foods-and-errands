import Link from "next/link";
import Image from "next/image";
import {
  UtensilsCrossed,
  ShoppingBasket,
  ListChecks,
  Truck,
  Shirt,
  Building2,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  UtensilsCrossed,
  ShoppingBasket,
  ListChecks,
  Truck,
  Shirt,
  Building2,
};

interface ServiceCardProps {
  title: string;
  description: string;
  cta: string;
  href: string;
  icon: string;
  image?: string;
}

export default function ServiceCard({
  title,
  description,
  cta,
  href,
  icon,
  image,
}: ServiceCardProps) {
  const Icon = iconMap[icon] || UtensilsCrossed;

  return (
    <Link href={href} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden border border-tricore-gray-200 hover:border-tricore-red/30 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        <div className="relative h-44 overflow-hidden">
          <Image
            src={image || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80"}
            alt={title}
            width={800}
            height={440}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-4 left-4 w-10 h-10 bg-tricore-red rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Icon className="w-5 h-5 text-white" />
          </div>
        </div>
        <div className="p-6 flex flex-col flex-1">
          <h3 className="font-bold text-tricore-black text-lg mb-2">{title}</h3>
          <p className="text-tricore-gray-600 text-sm leading-relaxed mb-4 flex-1">{description}</p>
          <span className="inline-flex items-center text-tricore-red text-sm font-semibold group-hover:gap-2 transition-all">
            {cta}
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
