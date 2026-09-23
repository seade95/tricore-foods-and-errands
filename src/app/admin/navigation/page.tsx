"use client";

import { useContent } from "@/components/admin/hooks";
import { AdminPageHeader, AdminInput, AdminCard, SaveBar, LoadingSpinner, ToastDisplay } from "@/components/admin/ui";
import { Navigation, Plus, Trash2 } from "lucide-react";

export default function AdminNavigationPage() {
  const { content, loading, saving, toast, save, update } = useContent();

  if (loading || !content) return <LoadingSpinner />;

  const navLinks = content.navLinks || [];
  const footer = content.footer;

  const updateLink = (index: number, patch: any) => {
    update((c: any) => ({
      ...c,
      navLinks: c.navLinks.map((l: any, i: number) => (i === index ? { ...l, ...patch } : l)),
    }));
  };

  const addNavLink = () => {
    update((c: any) => ({
      ...c,
      navLinks: [...c.navLinks, { label: "", href: "/", enabled: true }],
    }));
  };

  const removeNavLink = (index: number) => {
    update((c: any) => ({ ...c, navLinks: c.navLinks.filter((_: any, i: number) => i !== index) }));
  };

  const updateFooterLink = (group: "companyLinks" | "supportLinks", index: number, patch: any) => {
    update((c: any) => ({
      ...c,
      footer: {
        ...c.footer,
        [group]: c.footer[group].map((l: any, i: number) => (i === index ? { ...l, ...patch } : l)),
      },
    }));
  };

  const addFooterLink = (group: "companyLinks" | "supportLinks") => {
    update((c: any) => ({
      ...c,
      footer: { ...c.footer, [group]: [...c.footer[group], { label: "", href: "/" }] },
    }));
  };

  const removeFooterLink = (group: "companyLinks" | "supportLinks", index: number) => {
    update((c: any) => ({
      ...c,
      footer: { ...c.footer, [group]: c.footer[group].filter((_: any, i: number) => i !== index) },
    }));
  };

  return (
    <div>
      <ToastDisplay toast={toast} />
      <AdminPageHeader title="Navigation & Footer" description="Edit menu items and footer links" icon={<Navigation className="w-5 h-5" />} />

      <div className="space-y-6">
        <AdminCard title="Main Navigation" description="Links shown in the header menu">
          <div className="space-y-3">
            {navLinks.map((link: any, i: number) => (
              <div key={i} className="flex items-end gap-3">
                <div className="flex-1 grid grid-cols-2 gap-3">
                  <AdminInput label="Label" value={link.label} onChange={(v) => updateLink(i, { label: v })} placeholder="e.g. About" />
                  <AdminInput label="Link" value={link.href} onChange={(v) => updateLink(i, { href: v })} placeholder="/about" />
                </div>
                <button onClick={() => removeNavLink(i)} className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors mb-0.5">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={addNavLink}
            className="mt-4 inline-flex items-center gap-2 border border-dashed border-tricore-gray-300 rounded-xl px-4 py-2.5 text-sm text-tricore-gray-600 hover:border-tricore-red hover:text-tricore-red transition-colors w-full justify-center"
          >
            <Plus className="w-4 h-4" />
            Add Navigation Link
          </button>
        </AdminCard>

        <AdminCard title="Footer Settings">
          <AdminInput label="Footer Description" value={footer.description} onChange={(v) => update((c: any) => ({ ...c, footer: { ...c.footer, description: v } }))} />
        </AdminCard>

        <AdminCard title="Footer — Company Links">
          <div className="space-y-3">
            {footer.companyLinks.map((link: any, i: number) => (
              <div key={i} className="flex items-end gap-3">
                <div className="flex-1 grid grid-cols-2 gap-3">
                  <AdminInput label="Label" value={link.label} onChange={(v) => updateFooterLink("companyLinks", i, { label: v })} />
                  <AdminInput label="Link" value={link.href} onChange={(v) => updateFooterLink("companyLinks", i, { href: v })} />
                </div>
                <button onClick={() => removeFooterLink("companyLinks", i)} className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors mb-0.5">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <button onClick={() => addFooterLink("companyLinks")} className="mt-4 inline-flex items-center gap-2 border border-dashed border-tricore-gray-300 rounded-xl px-4 py-2.5 text-sm text-tricore-gray-600 hover:border-tricore-red hover:text-tricore-red transition-colors w-full justify-center">
            <Plus className="w-4 h-4" />
            Add Link
          </button>
        </AdminCard>

        <AdminCard title="Footer — Support Links">
          <div className="space-y-3">
            {footer.supportLinks.map((link: any, i: number) => (
              <div key={i} className="flex items-end gap-3">
                <div className="flex-1 grid grid-cols-2 gap-3">
                  <AdminInput label="Label" value={link.label} onChange={(v) => updateFooterLink("supportLinks", i, { label: v })} />
                  <AdminInput label="Link" value={link.href} onChange={(v) => updateFooterLink("supportLinks", i, { href: v })} />
                </div>
                <button onClick={() => removeFooterLink("supportLinks", i)} className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors mb-0.5">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <button onClick={() => addFooterLink("supportLinks")} className="mt-4 inline-flex items-center gap-2 border border-dashed border-tricore-gray-300 rounded-xl px-4 py-2.5 text-sm text-tricore-gray-600 hover:border-tricore-red hover:text-tricore-red transition-colors w-full justify-center">
            <Plus className="w-4 h-4" />
            Add Link
          </button>
        </AdminCard>

        <SaveBar onSave={() => save(content)} saving={saving} />
      </div>
    </div>
  );
}
