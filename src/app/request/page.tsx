import { Metadata } from "next";
import RequestForm from "@/components/RequestForm";

export const metadata: Metadata = {
  title: "Order / Request a Service",
  description:
    "Submit a request for food, groceries, errands, delivery, laundry or business services. Tricore handles your everyday convenience needs.",
};

export default function RequestPage() {
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
        </div>
      </section>
    </>
  );
}
