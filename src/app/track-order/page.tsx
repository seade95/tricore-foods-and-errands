"use client";

import { useState } from "react";
import { Search, Package, Truck, CheckCircle, Clock } from "lucide-react";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) {
      setSearched(true);
    }
  };

  return (
    <>
      <section className="bg-tricore-black pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-tricore-red font-semibold text-sm uppercase tracking-wider mb-3">
            Track Order
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">
            Where Is My Order?
          </h1>
          <p className="text-tricore-gray-400 text-lg max-w-2xl mx-auto">
            Enter your order or request ID to check the current status of your
            service.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSearch} className="flex gap-3 mb-10">
            <input
              type="text"
              value={orderId}
              onChange={(e) => {
                setOrderId(e.target.value);
                setSearched(false);
              }}
              placeholder="Enter Order ID (e.g. TRC-00001)"
              className="flex-1 border border-tricore-gray-300 rounded-xl px-4 py-3.5 text-sm text-tricore-black focus:ring-2 focus:ring-tricore-red focus:border-tricore-red outline-none"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-tricore-red text-white px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-tricore-red-dark transition-colors shrink-0"
            >
              <Search className="w-4 h-4" />
              Track
            </button>
          </form>

          {searched && (
            <div className="bg-tricore-gray-50 rounded-2xl p-6 sm:p-8 border border-tricore-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <Package className="w-5 h-5 text-tricore-red" />
                <h2 className="font-bold text-tricore-black">
                  Order {orderId}
                </h2>
              </div>

              <div className="space-y-6">
                {/* Status Timeline */}
                <div className="space-y-0">
                  {[
                    {
                      icon: CheckCircle,
                      label: "Order Placed",
                      time: "Your request has been received",
                      status: "completed",
                    },
                    {
                      icon: Clock,
                      label: "Order Confirmed",
                      time: "Awaiting confirmation",
                      status: "pending",
                    },
                    {
                      icon: Truck,
                      label: "Out for Delivery",
                      time: "Rider assignment pending",
                      status: "pending",
                    },
                    {
                      icon: CheckCircle,
                      label: "Delivered",
                      time: "Completion pending",
                      status: "pending",
                    },
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                            step.status === "completed"
                              ? "bg-tricore-red text-white"
                              : "bg-tricore-gray-200 text-tricore-gray-400"
                          }`}
                        >
                          <step.icon className="w-4 h-4" />
                        </div>
                        {i < 3 && (
                          <div
                            className={`w-0.5 h-8 ${
                              step.status === "completed"
                                ? "bg-tricore-red"
                                : "bg-tricore-gray-200"
                            }`}
                          />
                        )}
                      </div>
                      <div className="pt-1">
                        <p
                          className={`font-medium text-sm ${
                            step.status === "completed"
                              ? "text-tricore-black"
                              : "text-tricore-gray-400"
                          }`}
                        >
                          {step.label}
                        </p>
                        <p className="text-tricore-gray-500 text-xs mt-0.5">
                          {step.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Details Placeholder */}
                <div className="border-t border-tricore-gray-200 pt-6 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-tricore-gray-500 text-xs">Service Type</p>
                    <p className="text-tricore-black font-medium">—</p>
                  </div>
                  <div>
                    <p className="text-tricore-gray-500 text-xs">Status</p>
                    <p className="text-tricore-red font-medium">
                      Awaiting Confirmation
                    </p>
                  </div>
                  <div>
                    <p className="text-tricore-gray-500 text-xs">
                      Pickup Location
                    </p>
                    <p className="text-tricore-black font-medium">—</p>
                  </div>
                  <div>
                    <p className="text-tricore-gray-500 text-xs">Destination</p>
                    <p className="text-tricore-black font-medium">—</p>
                  </div>
                  <div>
                    <p className="text-tricore-gray-500 text-xs">
                      Assigned Rider
                    </p>
                    <p className="text-tricore-black font-medium">—</p>
                  </div>
                  <div>
                    <p className="text-tricore-gray-500 text-xs">
                      Estimated Time
                    </p>
                    <p className="text-tricore-black font-medium">—</p>
                  </div>
                </div>
              </div>

              <p className="mt-6 text-tricore-gray-500 text-xs text-center">
                This is a UI demonstration. Live tracking will be connected when
                the backend system is implemented.
              </p>
            </div>
          )}

          {!searched && (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-tricore-gray-300 mx-auto mb-4" />
              <p className="text-tricore-gray-500 text-sm">
                Enter your order ID above to see the current status of your
                request.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
