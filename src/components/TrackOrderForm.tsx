"use client";

import { useState } from "react";
import Link from "next/link";

export default function TrackOrderForm() {
  const [orderId, setOrderId] = useState("");

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        placeholder="Enter Order ID (e.g. TRC-00001)"
        className="flex-1 border border-tricore-gray-300 rounded-xl px-4 py-3 text-sm text-tricore-black focus:ring-2 focus:ring-tricore-red focus:border-tricore-red outline-none"
      />
      <Link
        href={orderId.trim() ? `/track-order?id=${encodeURIComponent(orderId.trim())}` : "/track-order"}
        className="inline-flex items-center justify-center gap-2 bg-tricore-red text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-tricore-red-dark transition-colors"
      >
        Track
      </Link>
    </div>
  );
}
