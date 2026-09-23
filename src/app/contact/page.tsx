import { Metadata } from "next";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import ContactForm from "@/components/ContactForm";
import { getContent } from "@/lib/store";
import type { Content, SocialKey } from "@/lib/types";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Contact Us",
    description: "Get in touch with Tricore Foods & Errands.",
  };
}

export default function ContactPage() {
  const content = getContent() as Content;
  const c = content.contact || ({} as Content["contact"]);
  const w = content.whatsapp || { number: "+234XXXXXXXXXX", message: "" };
  const so = content.social || {};
  const cp = content.contactPage || ({} as Content["contactPage"]);
  const socialKeys: SocialKey[] = ["facebook", "instagram", "tiktok", "linkedin", "twitter", "youtube"];

  return (
    <>
      <section className="bg-tricore-black pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-tricore-red font-semibold text-sm uppercase tracking-wider mb-3">
            {cp.heroTag || "Contact Us"}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">
            {cp.heroHeading || "Get in Touch"}
          </h1>
          <p className="text-tricore-gray-400 text-lg max-w-2xl mx-auto">
            {cp.heroDescription}
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-tricore-black mb-6">Contact Information</h2>
              <div className="space-y-5 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-tricore-red-light rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-tricore-red" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-tricore-black text-sm mb-0.5">Phone</h3>
                    <p className="text-tricore-gray-600 text-sm">{c.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#25D366]/10 rounded-xl flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-tricore-black text-sm mb-0.5">WhatsApp</h3>
                    <p className="text-tricore-gray-600 text-sm">{w.number}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-tricore-red-light rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-tricore-red" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-tricore-black text-sm mb-0.5">Email</h3>
                    <p className="text-tricore-gray-600 text-sm">{c.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-tricore-red-light rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-tricore-red" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-tricore-black text-sm mb-0.5">Location</h3>
                    <p className="text-tricore-gray-600 text-sm">{c.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-tricore-red-light rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-tricore-red" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-tricore-black text-sm mb-0.5">Business Hours</h3>
                    <p className="text-tricore-gray-600 text-sm">{c.hours}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <WhatsAppCTA number={w.number} message={w.message} />
              </div>

              <div className="mt-8">
                <h3 className="font-semibold text-tricore-black text-sm mb-3">Follow Us</h3>
                <div className="flex gap-3">
                  {socialKeys
                    .filter((key) => so[key] && so[key] !== "#")
                    .map((social) => (
                      <a
                        key={social}
                        href={so[social]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-tricore-gray-100 flex items-center justify-center text-tricore-gray-600 hover:bg-tricore-red hover:text-white transition-colors text-sm capitalize"
                        aria-label={social}
                      >
                        {social.charAt(0).toUpperCase()}
                      </a>
                    ))}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-tricore-black mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
