"use client";

import { useContent } from "@/components/admin/hooks";
import { AdminPageHeader, AdminInput, AdminTextarea, AdminToggle, AdminCard, SaveBar, LoadingSpinner, ToastDisplay, ImageInput } from "@/components/admin/ui";
import { Package } from "lucide-react";

const iconOptions = [
  "UtensilsCrossed",
  "ShoppingBasket",
  "ListChecks",
  "Truck",
  "Shirt",
  "Building2",
  "ShoppingCart",
  "Bike",
  "Home",
  "Briefcase",
];

export default function AdminServicesPage() {
  const { content, loading, saving, toast, save, update } = useContent();

  if (loading || !content) return <LoadingSpinner />;

  const services = content.services || [];

  const updateService = (id: string, patch: any) => {
    update((c: any) => ({
      ...c,
      services: c.services.map((s: any) => (s.id === id ? { ...s, ...patch } : s)),
    }));
  };

  return (
    <div>
      <ToastDisplay toast={toast} />
      <AdminPageHeader title="Services" description="Edit service cards, descriptions, icons and images" icon={<Package className="w-5 h-5" />} />

      <div className="space-y-6">
        {services.map((svc: any) => (
          <AdminCard key={svc.id} title={svc.title || svc.id}>
            <div className="space-y-5">
              <AdminToggle
                label={svc.enabled ? "Shown on site" : "Hidden"}
                value={svc.enabled}
                onChange={(v) => updateService(svc.id, { enabled: v })}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <AdminInput label="Title" value={svc.title} onChange={(v) => updateService(svc.id, { title: v })} />
                <AdminInput label="CTA Button Text" value={svc.cta} onChange={(v) => updateService(svc.id, { cta: v })} />
                <AdminInput label="Link (href)" value={svc.href} onChange={(v) => updateService(svc.id, { href: v })} />
                <div>
                  <label className="block text-sm font-medium text-tricore-black mb-1.5">Icon</label>
                  <select
                    value={svc.icon}
                    onChange={(e) => updateService(svc.id, { icon: e.target.value })}
                    className="w-full border border-tricore-gray-300 rounded-xl px-4 py-2.5 text-sm text-tricore-black bg-white focus:ring-2 focus:ring-tricore-red/30 focus:border-tricore-red outline-none"
                  >
                    {iconOptions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <AdminTextarea label="Short Description" value={svc.shortDescription} onChange={(v) => updateService(svc.id, { shortDescription: v })} rows={2} />

              <ImageInput label="Card Image" value={svc.image} onChange={(v) => updateService(svc.id, { image: v })} hint="Shown on service cards and homepage" />
            </div>
          </AdminCard>
        ))}

        <SaveBar onSave={() => save(content)} saving={saving} />
      </div>
    </div>
  );
}
