"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

export default function BusinessForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="w-16 h-16 text-tricore-red mx-auto mb-4" />
        <h3 className="text-xl font-bold text-tricore-black mb-2">Request Submitted</h3>
        <p className="text-tricore-gray-600 text-sm">
          Thank you! We have received your partnership request and will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white rounded-2xl p-6 sm:p-8 border border-tricore-gray-200 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-tricore-black mb-1.5">Organisation Name *</label>
          <input type="text" required className="w-full border border-tricore-gray-300 rounded-xl px-4 py-3 text-sm text-tricore-black focus:ring-2 focus:ring-tricore-red focus:border-tricore-red outline-none" placeholder="Company or organisation name" />
        </div>
        <div>
          <label className="block text-sm font-medium text-tricore-black mb-1.5">Contact Person *</label>
          <input type="text" required className="w-full border border-tricore-gray-300 rounded-xl px-4 py-3 text-sm text-tricore-black focus:ring-2 focus:ring-tricore-red focus:border-tricore-red outline-none" placeholder="Full name" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-tricore-black mb-1.5">Phone Number *</label>
          <input type="tel" required className="w-full border border-tricore-gray-300 rounded-xl px-4 py-3 text-sm text-tricore-black focus:ring-2 focus:ring-tricore-red focus:border-tricore-red outline-none" placeholder="+234..." />
        </div>
        <div>
          <label className="block text-sm font-medium text-tricore-black mb-1.5">Email *</label>
          <input type="email" required className="w-full border border-tricore-gray-300 rounded-xl px-4 py-3 text-sm text-tricore-black focus:ring-2 focus:ring-tricore-red focus:border-tricore-red outline-none" placeholder="email@organisation.com" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-tricore-black mb-1.5">Organisation Type</label>
        <select className="w-full border border-tricore-gray-300 rounded-xl px-4 py-3 text-sm text-tricore-black focus:ring-2 focus:ring-tricore-red focus:border-tricore-red outline-none">
          <option value="">Select type</option>
          <option value="office">Office</option>
          <option value="school">School</option>
          <option value="hospital">Hospital</option>
          <option value="ngo">NGO</option>
          <option value="church">Church</option>
          <option value="business">Small Business</option>
          <option value="corporate">Corporate Organisation</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-tricore-black mb-1.5">Services Needed</label>
        <textarea rows={4} className="w-full border border-tricore-gray-300 rounded-xl px-4 py-3 text-sm text-tricore-black focus:ring-2 focus:ring-tricore-red focus:border-tricore-red outline-none resize-none" placeholder="Tell us what services your organisation needs..." />
      </div>
      <button type="submit" className="w-full bg-tricore-red text-white px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-tricore-red-dark transition-colors">
        Submit Partnership Request
      </button>
    </form>
  );
}
