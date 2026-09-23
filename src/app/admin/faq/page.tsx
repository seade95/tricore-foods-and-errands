"use client";

import { useContent } from "@/components/admin/hooks";
import { AdminPageHeader, AdminTextarea, AdminInput, AdminToggle, AdminCard, SaveBar, LoadingSpinner, ToastDisplay } from "@/components/admin/ui";
import { HelpCircle, Plus, Trash2 } from "lucide-react";
import type { FaqItem } from "@/lib/types";

export default function AdminFAQPage() {
  const { content, loading, saving, toast, save, update } = useContent();

  if (loading || !content) return <LoadingSpinner />;

  const items = content.faq || [];

  const updateItem = (id: string, patch: Partial<FaqItem>) => {
    update((c) => ({
      ...c,
      faq: (c.faq || []).map((f) => (f.id === id ? { ...f, ...patch } : f)),
    }));
  };

  const addItem = () => {
    update((c) => ({
      ...c,
      faq: [...(c.faq || []), { id: `f-${Date.now()}`, question: "", answer: "", enabled: true }],
    }));
  };

  const removeItem = (id: string) => {
    update((c) => ({ ...c, faq: (c.faq || []).filter((f) => f.id !== id) }));
  };

  const move = (index: number, dir: -1 | 1) => {
    update((c) => {
      const arr = [...(c.faq || [])];
      const target = index + dir;
      if (target < 0 || target >= arr.length) return c;
      [arr[index], arr[target]] = [arr[target], arr[index]];
      return { ...c, faq: arr };
    });
  };

  return (
    <div>
      <ToastDisplay toast={toast} />
      <AdminPageHeader title="FAQ" description="Frequently asked questions shown on the homepage" icon={<HelpCircle className="w-5 h-5" />} />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-tricore-gray-500">{items.length} question{items.length !== 1 ? "s" : ""}</p>
          <button
            onClick={addItem}
            className="inline-flex items-center gap-2 bg-tricore-red text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-tricore-red-dark transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Question
          </button>
        </div>

        {items.map((item, i) => (
          <AdminCard key={item.id} title={`Q${i + 1}`}>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <AdminToggle label={item.enabled ? "Visible" : "Hidden"} value={item.enabled !== false} onChange={(v) => updateItem(item.id, { enabled: v })} />
                <div className="flex items-center gap-1">
                  <button onClick={() => move(i, -1)} disabled={i === 0} className="px-2 py-1 text-xs text-tricore-gray-500 hover:text-tricore-black disabled:opacity-30">↑</button>
                  <button onClick={() => move(i, 1)} disabled={i === items.length - 1} className="px-2 py-1 text-xs text-tricore-gray-500 hover:text-tricore-black disabled:opacity-30">↓</button>
                  <button onClick={() => removeItem(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <AdminInput label="Question" value={item.question} onChange={(v) => updateItem(item.id, { question: v })} placeholder="e.g. How do I order food?" />
              <AdminTextarea label="Answer" value={item.answer} onChange={(v) => updateItem(item.id, { answer: v })} rows={3} />
            </div>
          </AdminCard>
        ))}

        <SaveBar onSave={() => save(content)} saving={saving} />
      </div>
    </div>
  );
}
