import { Metadata } from "next";
import RequestForm from "@/components/RequestForm";
import { getContent } from "@/lib/store";
import type { Content } from "@/lib/types";
import { CreditCard } from "lucide-react";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Order / Request a Service",
    description:
      "Submit a request for food, groceries, errands, delivery, laundry or business services. Tricore handles your everyday convenience needs.",
  };
}

export default function RequestPage() {
  const content = getContent() as Content;
  const payment = content.payment;
  const methods = payment?.enabled
    ? (payment.methods || []).filter((m) => m.enabled)
    : [];

  return (
    <>
      <section className="bg-tricore-black pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-tricore-red font-semibold text-sm uppercase tracking-wider mb-3">
            Order / Request
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">
            What Do You Need?
          </h1>
          <p className="text-tricore-gray-400 text-lg max-w-2xl mx-auto">
            Select a service type, provide the details and Tricore will handle
            the rest.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-tricore-gray-50 rounded-2xl p-6 sm:p-8 border border-tricore-gray-200">
            <RequestForm />
          </div>
          <p className="mt-6 text-tricore-gray-500 text-xs text-center">
            After submitting, our team will review your request and reach out to
            confirm details, availability and cost.
          </p>

          {methods.length > 0 && (
            <div className="mt-10 bg-white rounded-2xl border border-tricore-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-tricore-red" />
                <h2 className="font-bold text-tricore-black text-sm">
                  Payment Methods
                </h2>
              </div>
              {payment.note && (
                <p className="text-tricore-gray-500 text-xs mb-4">{payment.note}</p>
              )}
              <div className="space-y-3">
                {methods.map((m) => (
                  <div key={m.id} className="border border-tricore-gray-100 rounded-xl p-4">
                    <p className="font-semibold text-tricore-black text-sm mb-1">{m.name}</p>
                    <p className="text-tricore-gray-600 text-xs leading-relaxed">{m.instructions}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
