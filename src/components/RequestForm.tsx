"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

const serviceTypes = [
  { value: "food", label: "Food" },
  { value: "groceries", label: "Groceries" },
  { value: "errand", label: "Errand" },
  { value: "delivery", label: "Delivery" },
  { value: "laundry", label: "Laundry" },
  { value: "business", label: "Business Service" },
  { value: "other", label: "Other" },
];

export default function RequestForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serviceType, setServiceType] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="w-16 h-16 text-tricore-red mx-auto mb-4" />
        <h3 className="text-xl font-bold text-tricore-black mb-2">
          Request Submitted
        </h3>
        <p className="text-tricore-gray-600 text-sm">
          Thank you! We have received your request and will get back to you
          shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="serviceType"
          className="block text-sm font-medium text-tricore-black mb-1.5"
        >
          What do you need? *
        </label>
        <select
          id="serviceType"
          required
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
          className="w-full border border-tricore-gray-300 rounded-xl px-4 py-3 text-sm text-tricore-black focus:ring-2 focus:ring-tricore-red focus:border-tricore-red outline-none transition-colors"
        >
          <option value="">Select a service</option>
          {serviceTypes.map((st) => (
            <option key={st.value} value={st.value}>
              {st.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-tricore-black mb-1.5"
          >
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            required
            className="w-full border border-tricore-gray-300 rounded-xl px-4 py-3 text-sm text-tricore-black focus:ring-2 focus:ring-tricore-red focus:border-tricore-red outline-none transition-colors"
            placeholder="Your name"
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-tricore-black mb-1.5"
          >
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            required
            className="w-full border border-tricore-gray-300 rounded-xl px-4 py-3 text-sm text-tricore-black focus:ring-2 focus:ring-tricore-red focus:border-tricore-red outline-none transition-colors"
            placeholder="+234..."
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-tricore-black mb-1.5"
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          className="w-full border border-tricore-gray-300 rounded-xl px-4 py-3 text-sm text-tricore-black focus:ring-2 focus:ring-tricore-red focus:border-tricore-red outline-none transition-colors"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium text-tricore-black mb-1.5"
        >
          Location / Address *
        </label>
        <input
          type="text"
          id="location"
          required
          className="w-full border border-tricore-gray-300 rounded-xl px-4 py-3 text-sm text-tricore-black focus:ring-2 focus:ring-tricore-red focus:border-tricore-red outline-none transition-colors"
          placeholder="Your location"
        />
      </div>

      {serviceType === "errand" && (
        <div>
          <label
            htmlFor="errandDetails"
            className="block text-sm font-medium text-tricore-black mb-1.5"
          >
            Errand Details *
          </label>
          <input
            type="text"
            id="errandDetails"
            required
            className="w-full border border-tricore-gray-300 rounded-xl px-4 py-3 text-sm text-tricore-black focus:ring-2 focus:ring-tricore-red focus:border-tricore-red outline-none transition-colors"
            placeholder="Pick-up, drop-off, shopping, document collection..."
          />
        </div>
      )}

      {serviceType === "delivery" && (
        <>
          <div>
            <label
              htmlFor="pickup"
              className="block text-sm font-medium text-tricore-black mb-1.5"
            >
              Pickup Location *
            </label>
            <input
              type="text"
              id="pickup"
              required
              className="w-full border border-tricore-gray-300 rounded-xl px-4 py-3 text-sm text-tricore-black focus:ring-2 focus:ring-tricore-red focus:border-tricore-red outline-none transition-colors"
              placeholder="Pickup address"
            />
          </div>
          <div>
            <label
              htmlFor="destination"
              className="block text-sm font-medium text-tricore-black mb-1.5"
            >
              Destination *
            </label>
            <input
              type="text"
              id="destination"
              required
              className="w-full border border-tricore-gray-300 rounded-xl px-4 py-3 text-sm text-tricore-black focus:ring-2 focus:ring-tricore-red focus:border-tricore-red outline-none transition-colors"
              placeholder="Delivery address"
            />
          </div>
        </>
      )}

      {serviceType === "laundry" && (
        <div>
          <label
            htmlFor="laundryService"
            className="block text-sm font-medium text-tricore-black mb-1.5"
          >
            Laundry Service Needed *
          </label>
          <select
            id="laundryService"
            required
            className="w-full border border-tricore-gray-300 rounded-xl px-4 py-3 text-sm text-tricore-black focus:ring-2 focus:ring-tricore-red focus:border-tricore-red outline-none transition-colors"
          >
            <option value="">Select service</option>
            <option value="wash">Wash</option>
            <option value="dry">Dry</option>
            <option value="fold">Fold</option>
            <option value="ironing">Ironing</option>
            <option value="full">Full Service (Wash, Dry, Fold & Iron)</option>
          </select>
        </div>
      )}

      <div>
        <label
          htmlFor="details"
          className="block text-sm font-medium text-tricore-black mb-1.5"
        >
          Additional Details / Instructions
        </label>
        <textarea
          id="details"
          rows={4}
          className="w-full border border-tricore-gray-300 rounded-xl px-4 py-3 text-sm text-tricore-black focus:ring-2 focus:ring-tricore-red focus:border-tricore-red outline-none transition-colors resize-none"
          placeholder="Tell us more about what you need..."
        />
      </div>

      <div>
        <label
          htmlFor="preferredTime"
          className="block text-sm font-medium text-tricore-black mb-1.5"
        >
          Preferred Date / Time
        </label>
        <input
          type="text"
          id="preferredTime"
          className="w-full border border-tricore-gray-300 rounded-xl px-4 py-3 text-sm text-tricore-black focus:ring-2 focus:ring-tricore-red focus:border-tricore-red outline-none transition-colors"
          placeholder="e.g. Today 3pm, Tomorrow morning"
        />
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-tricore-red text-white px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-tricore-red-dark transition-colors"
      >
        <Send className="w-4 h-4" />
        Submit Request
      </button>
    </form>
  );
}
