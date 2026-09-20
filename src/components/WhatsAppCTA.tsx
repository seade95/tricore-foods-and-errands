import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { MessageCircle } from "lucide-react";

export default function WhatsAppCTA({ className = "" }: { className?: string }) {
  const url = `https://wa.me/${siteConfig.whatsapp.number.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(siteConfig.whatsapp.message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-3 rounded-full text-sm font-semibold hover:bg-[#20BD5A] transition-colors ${className}`}
    >
      <MessageCircle className="w-4 h-4" />
      Chat With Us
    </a>
  );
}
