"use client";

import { useContent } from "@/components/admin/hooks";
import { AdminPageHeader, AdminInput, AdminTextarea, AdminToggle, AdminCard, SaveBar, LoadingSpinner, ToastDisplay } from "@/components/admin/ui";
import { CreditCard, Plus, Trash2 } from "lucide-react";

export default function AdminPaymentPage() {
  const { content, loading, saving, toast, save, update } = useContent();

  if (loading || !content) return <LoadingSpinner />;

  const p = content.payment;

  const updateMethod = (id: string, patch: any) => {
    update((c: any) => ({
      ...c,
      payment: {
        ...c.payment,
        methods: c.payment.methods.map((m: any) => (m.id === id ? { ...m, ...patch } : m)),
      },
    }));
  };

  const addMethod = () => {
    const id = `method-${Date.now()}`;
    update((c: any) => ({
      ...c,
      payment: {
        ...c.payment,
        methods: [...c.payment.methods, { id, name: "", enabled: true, instructions: "" }],
      },
    }));
  };

  const removeMethod = (id: string) => {
    update((c: any) => ({
      ...c,
      payment: { ...c.payment, methods: c.payment.methods.filter((m: any) => m.id !== id) },
    }));
  };

  return (
    <div>
      <ToastDisplay toast={toast} />
      <AdminPageHeader title="Payment Methods" description="Configure accepted payment methods and instructions" icon={<CreditCard className="w-5 h-5" />} />

      <div className="space-y-6">
        <AdminCard title="Payment Settings">
          <div className="space-y-5">
            <AdminToggle
              label="Enable Payment Section"
              value={p.enabled}
              onChange={(v) => update((c: any) => ({ ...c, payment: { ...c.payment, enabled: v } }))}
              hint="Show payment methods to customers"
            />
            <AdminTextarea
              label="Payment Note"
              value={p.note}
              onChange={(v) => update((c: any) => ({ ...c, payment: { ...c.payment, note: v } }))}
              rows={2}
              hint="General note shown with payment methods"
            />
          </div>
        </AdminCard>

        <AdminCard title="Payment Methods" description="Add, edit or remove payment options">
          <div className="space-y-4">
            {p.methods.map((m: any) => (
              <div key={m.id} className="border border-tricore-gray-200 rounded-xl p-4 space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AdminInput
                      label="Method Name"
                      value={m.name}
                      onChange={(v) => updateMethod(m.id, { name: v })}
                      placeholder="e.g. Bank Transfer"
                    />
                    <div className="flex items-end pb-1">
                      <AdminToggle
                        label="Enabled"
                        value={m.enabled}
                        onChange={(v) => updateMethod(m.id, { enabled: v })}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => removeMethod(m.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors mb-1"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <AdminTextarea
                  label="Instructions"
                  value={m.instructions}
                  onChange={(v) => updateMethod(m.id, { instructions: v })}
                  rows={2}
                  placeholder="How customers can use this payment method..."
                />
              </div>
            ))}
          </div>
          <button
            onClick={addMethod}
            className="mt-4 inline-flex items-center gap-2 border border-dashed border-tricore-gray-300 rounded-xl px-4 py-2.5 text-sm text-tricore-gray-600 hover:border-tricore-red hover:text-tricore-red transition-colors w-full justify-center"
          >
            <Plus className="w-4 h-4" />
            Add Payment Method
          </button>
        </AdminCard>

        <SaveBar onSave={() => save(content)} saving={saving} />
      </div>
    </div>
  );
}
