import { Metadata } from "next";
import Link from "next/link";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import { CheckCircle } from "lucide-react";
import { getContent } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Business Solutions",
  description:
    "Convenience and logistics solutions for businesses and institutions. Food procurement, grocery supplies, errands, logistics and laundry support.",
};

const services = [
  "Food procurement and delivery",
  "Grocery and supplies sourcing",
  "Errands handling",
  "Document movement",
  "Local logistics support",
  "Laundry support",
  "Recurring delivery services",
  "Staff convenience services",
  "Event support",
  "Institutional requests",
];

const targetOrganisations = [
  "Offices",
  "Schools",
  "Hospitals",
  "NGOs",
  "Churches",
  "Small Businesses",
  "Corporate Organisations",
  "Event Organisers",
];

export default function BusinessPage() {
  const content = getContent();
  const whatsapp = content.whatsapp || { number: "+234XXXXXXXXXX", message: "" };

  return (
    <>
      <section className="bg-tricore-black pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-tricore-red font-semibold text-sm uppercase tracking-wider mb-3">
              Business Solutions
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
              Convenience Solutions for Businesses & Institutions
            </h1>
            <p className="text-tricore-gray-400 text-lg leading-relaxed">
              Tricore partners with organisations to handle food procurement,
              grocery supplies, errands, logistics and laundry support — so your
              team can focus on what matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link
                href="/request"
                className="inline-flex items-center justify-center gap-2 bg-tricore-red text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-tricore-red-dark transition-colors"
              >
                Partner With Tricore
              </Link>
              <WhatsAppCTA number={whatsapp.number} message={whatsapp.message} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-tricore-black mb-6">
                How We Support Organisations
              </h2>
              <div className="space-y-4">
                {services.map((service, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-tricore-red mt-0.5 shrink-0" />
                    <span className="text-tricore-gray-700 text-sm leading-relaxed">
                      {service}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-tricore-black mb-4">
                Who We Work With
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {targetOrganisations.map((org) => (
                  <div
                    key={org}
                    className="bg-tricore-gray-50 rounded-xl p-4 border border-tricore-gray-200 text-center"
                  >
                    <span className="text-tricore-gray-700 text-sm font-medium">
                      {org}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-tricore-black rounded-2xl p-6">
                <h3 className="font-bold text-white mb-2">
                  Get in Touch
                </h3>
                <p className="text-tricore-gray-400 text-sm mb-4">
                  Discuss your organisation&apos;s needs with us. We will create a
                  tailored convenience solution.
                </p>
                <div className="flex gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-tricore-red text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-tricore-red-dark transition-colors"
                  >
                    Contact Us
                  </Link>
                  <WhatsAppCTA number={whatsapp.number} message={whatsapp.message} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Form */}
      <section className="py-16 sm:py-20 bg-tricore-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-tricore-black text-center mb-3">
            Request a Partnership
          </h2>
          <p className="text-tricore-gray-600 text-sm text-center mb-8">
            Tell us about your organisation and we will be in touch.
          </p>
          <form className="space-y-5 bg-white rounded-2xl p-6 sm:p-8 border border-tricore-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-tricore-black mb-1.5">
                  Organisation Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full border border-tricore-gray-300 rounded-xl px-4 py-3 text-sm text-tricore-black focus:ring-2 focus:ring-tricore-red focus:border-tricore-red outline-none"
                  placeholder="Company or organisation name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-tricore-black mb-1.5">
                  Contact Person *
                </label>
                <input
                  type="text"
                  required
                  className="w-full border border-tricore-gray-300 rounded-xl px-4 py-3 text-sm text-tricore-black focus:ring-2 focus:ring-tricore-red focus:border-tricore-red outline-none"
                  placeholder="Full name"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-tricore-black mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  className="w-full border border-tricore-gray-300 rounded-xl px-4 py-3 text-sm text-tricore-black focus:ring-2 focus:ring-tricore-red focus:border-tricore-red outline-none"
                  placeholder="+234..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-tricore-black mb-1.5">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  className="w-full border border-tricore-gray-300 rounded-xl px-4 py-3 text-sm text-tricore-black focus:ring-2 focus:ring-tricore-red focus:border-tricore-red outline-none"
                  placeholder="email@organisation.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-tricore-black mb-1.5">
                Organisation Type
              </label>
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
              <label className="block text-sm font-medium text-tricore-black mb-1.5">
                Services Needed
              </label>
              <textarea
                rows={4}
                className="w-full border border-tricore-gray-300 rounded-xl px-4 py-3 text-sm text-tricore-black focus:ring-2 focus:ring-tricore-red focus:border-tricore-red outline-none resize-none"
                placeholder="Tell us what services your organisation needs..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-tricore-red text-white px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-tricore-red-dark transition-colors"
            >
              Submit Partnership Request
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
