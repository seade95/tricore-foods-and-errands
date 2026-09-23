"use client";

import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  number: string;
  message: string;
}

export default function WhatsAppButton({ number, message }: WhatsAppButtonProps) {
  const url = `https://wa.me/${number.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
}
