"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="w-16 h-16 text-tricore-red mx-auto mb-4" />
        <h3 className="text-xl font-bold text-tricore-black mb-2">Message Sent</h3>
        <p className="text-tricore-gray-600 text-sm">
          Thank you! We have received your message and will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-tricore-black mb-1.5">Full Name *</label>
          <input type="text" required className="w-full border border-tricore-gray-300 rounded-xl px-4 py-3 text-sm text-tricore-black focus:ring-2 focus:ring-tricore-red focus:border-tricore-red outline-none" placeholder="Your name" />
        </div>
        <div>
          <label className="block text-sm font-medium text-tricore-black mb-1.5">Phone Number *</label>
          <input type="tel" required className="w-full border border-tricore-gray-300 rounded-xl px-4 py-3 text-sm text-tricore-black focus:ring-2 focus:ring-tricore-red focus:border-tricore-red outline-none" placeholder="+234..." />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-tricore-black mb-1.5">Email Address</label>
        <input type="email" className="w-full border border-tricore-gray-300 rounded-xl px-4 py-3 text-sm text-tricore-black focus:ring-2 focus:ring-tricore-red focus:border-tricore-red outline-none" placeholder="your@email.com" />
      </div>
      <div>
        <label className="block text-sm font-medium text-tricore-black mb-1.5">Subject</label>
        <select className="w-full border border-tricore-gray-300 rounded-xl px-4 py-3 text-sm text-tricore-black focus:ring-2 focus:ring-tricore-red focus:border-tricore-red outline-none">
          <option value="">Select a topic</option>
          <option value="general">General Enquiry</option>
          <option value="food">Food Service</option>
          <option value="errand">Errand Service</option>
          <option value="delivery">Delivery & Logistics</option>
          <option value="laundry">Laundry Service</option>
          <option value="business">Business Partnership</option>
          <option value="support">Customer Support</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-tricore-black mb-1.5">Message *</label>
        <textarea rows={5} required className="w-full border border-tricore-gray-300 rounded-xl px-4 py-3 text-sm text-tricore-black focus:ring-2 focus:ring-tricore-red focus:border-tricore-red outline-none resize-none" placeholder="How can we help you?" />
      </div>
      <button type="submit" className="w-full bg-tricore-red text-white px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-tricore-red-dark transition-colors">
        Send Message
      </button>
    </form>
  );
}
