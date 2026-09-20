"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="border border-tricore-gray-200 rounded-xl overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between px-5 py-4 text-left"
          >
            <span className="font-medium text-tricore-black text-sm pr-4">
              {item.question}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-tricore-gray-500 shrink-0 transition-transform duration-200 ${
                openIndex === i ? "rotate-180" : ""
              }`}
            />
          </button>
          {openIndex === i && (
            <div className="px-5 pb-4">
              <p className="text-tricore-gray-600 text-sm leading-relaxed">
                {item.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
