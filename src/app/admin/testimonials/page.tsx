"use client";

import { useContent } from "@/components/admin/hooks";
import { AdminPageHeader, AdminInput, AdminTextarea, AdminToggle, AdminCard, SaveBar, LoadingSpinner, ToastDisplay } from "@/components/admin/ui";
import { MessageSquareQuote, Plus, Trash2, Star } from "lucide-react";

export default function AdminTestimonialsPage() {
  const { content, loading, saving, toast, save, update } = useContent();

  if (loading || !content) return <LoadingSpinner />;

  const items = content.testimonials || [];

  const updateItem = (id: string, patch: any) => {
    update((c: any) => ({
      ...c,
      testimonials: c.testimonials.map((t: any) => (t.id === id ? { ...t, ...patch } : t)),
    }));
  };

  const addItem = () => {
    update((c: any) => ({
      ...c,
      testimonials: [
        ...c.testimonials,
        { id: `t-${Date.now()}`, name: "", role: "", quote: "", rating: 5, enabled: true },
      ],
    }));
  };

  const removeItem = (id: string) => {
    update((c: any) => ({ ...c, testimonials: c.testimonials.filter((t: any) => t.id !== id) }));
  };

  return (
    <div>
      <ToastDisplay toast={toast} />
      <AdminPageHeader title="Testimonials" description="Customer reviews shown on the homepage" icon={<MessageSquareQuote className="w-5 h-5" />} />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-tricore-gray-500">{items.length} testimonial{items.length !== 1 ? "s" : ""}</p>
          <button
            onClick={addItem}
            className="inline-flex items-center gap-2 bg-tricore-red text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-tricore-red-dark transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Testimonial
          </button>
        </div>

        {items.map((t: any) => (
          <AdminCard key={t.id} title={t.name || "New Testimonial"}>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <AdminToggle label={t.enabled ? "Visible" : "Hidden"} value={t.enabled} onChange={(v) => updateItem(t.id, { enabled: v })} />
                <button onClick={() => removeItem(t.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <AdminInput label="Name" value={t.name} onChange={(v) => updateItem(t.id, { name: v })} placeholder="Customer name" />
                <AdminInput label="Role" value={t.role} onChange={(v) => updateItem(t.id, { role: v })} placeholder="e.g. Working Mum" />
                <div>
                  <label className="block text-sm font-medium text-tricore-black mb-1.5">Rating</label>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        onClick={() => updateItem(t.id, { rating: n })}
                        className="p-1"
                      >
                        <Star
                          className={`w-6 h-6 transition-colors ${
                            n <= t.rating ? "fill-yellow-400 text-yellow-400" : "text-tricore-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <AdminTextarea label="Quote" value={t.quote} onChange={(v) => updateItem(t.id, { quote: v })} rows={3} />
            </div>
          </AdminCard>
        ))}

        <SaveBar onSave={() => save(content)} saving={saving} />
      </div>
    </div>
  );
}
