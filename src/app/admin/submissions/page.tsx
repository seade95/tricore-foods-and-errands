"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminPageHeader, LoadingSpinner, ToastDisplay } from "@/components/admin/ui";
import type { Toast } from "@/components/admin/hooks";
import { Inbox } from "lucide-react";
import type { Submission } from "@/lib/types";

export default function AdminSubmissionsPage() {
  const [items, setItems] = useState<Submission[] | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/submissions")
      .then(async (r) => {
        if (r.status === 401) {
          if (!cancelled) router.replace("/admin/login");
          return;
        }
        const data = await r.json();
        if (!cancelled) setItems(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!cancelled) {
          setToast({ type: "error", message: "Failed to load submissions" });
          setItems([]);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [router]);

  if (items === null) return <LoadingSpinner />;

  return (
    <div>
      <ToastDisplay toast={toast} />
      <AdminPageHeader
        title="Submissions"
        description="Contact, request and partnership form submissions"
        icon={<Inbox className="w-5 h-5" />}
      />

      {items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-tricore-gray-200 p-10 text-center text-tricore-gray-500 text-sm">
          No submissions yet.
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((s) => (
            <div key={s.id} className="bg-white rounded-2xl border border-tricore-gray-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-tricore-red-light text-tricore-red capitalize">
                  {s.type}
                </span>
                <span className="text-xs text-tricore-gray-400">
                  {new Date(s.receivedAt).toLocaleString()}
                </span>
              </div>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                {Object.entries(s.data)
                  .filter(([k]) => k !== "type")
                  .map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-tricore-gray-500 text-xs capitalize">{k}</dt>
                      <dd className="text-tricore-black break-words">{v}</dd>
                    </div>
                  ))}
              </dl>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
