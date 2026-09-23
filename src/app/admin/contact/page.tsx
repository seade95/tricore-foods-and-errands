"use client";

import { useContent } from "@/components/admin/hooks";
import { AdminPageHeader, AdminInput, AdminTextarea, AdminCard, SaveBar, LoadingSpinner, ToastDisplay } from "@/components/admin/ui";
import { Contact, MessageCircle } from "lucide-react";
import type { SocialKey } from "@/lib/types";

export default function AdminContactPage() {
  const { content, loading, saving, toast, save, update } = useContent();

  if (loading || !content) return <LoadingSpinner />;

  const c = content.contact;
  const w = content.whatsapp;
  const so = content.social || {};

  const socialFields: { key: SocialKey; label: string }[] = [
    { key: "facebook", label: "Facebook URL" },
    { key: "instagram", label: "Instagram URL" },
    { key: "tiktok", label: "TikTok URL" },
    { key: "linkedin", label: "LinkedIn URL" },
    { key: "twitter", label: "X / Twitter URL" },
    { key: "youtube", label: "YouTube URL" },
  ];

  return (
    <div>
      <ToastDisplay toast={toast} />
      <AdminPageHeader title="Contact & Social" description="Contact details, WhatsApp and social media links" icon={<Contact className="w-5 h-5" />} />

      <div className="space-y-6">
        <AdminCard title="Contact Information" description="Shown on the Contact page, Footer and throughout the site">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <AdminInput label="Phone Number" value={c.phone} onChange={(v) => update((c2) => ({ ...c2, contact: { ...c2.contact, phone: v } }))} placeholder="+234..." required />
            <AdminInput label="Email Address" value={c.email} onChange={(v) => update((c2) => ({ ...c2, contact: { ...c2.contact, email: v } }))} type="email" required />
            <AdminInput label="Business Address" value={c.address} onChange={(v) => update((c2) => ({ ...c2, contact: { ...c2.contact, address: v } }))} />
            <AdminInput label="Business Hours" value={c.hours} onChange={(v) => update((c2) => ({ ...c2, contact: { ...c2.contact, hours: v } }))} />
          </div>
        </AdminCard>

        <AdminCard title="WhatsApp" description="Used for the floating WhatsApp button and chat CTAs" icon={<MessageCircle className="w-4 h-4" />}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <AdminInput label="WhatsApp Number" value={w.number} onChange={(v) => update((c2) => ({ ...c2, whatsapp: { ...c2.whatsapp, number: v } }))} hint="Include country code, e.g. +2348012345678" />
          </div>
          <div className="mt-5">
            <AdminTextarea label="Default WhatsApp Message" value={w.message} onChange={(v) => update((c2) => ({ ...c2, whatsapp: { ...c2.whatsapp, message: v } }))} rows={3} hint="Pre-filled when users click the WhatsApp button" />
          </div>
        </AdminCard>

        <AdminCard title="Social Media Links" description="Leave blank to hide a social link from the footer and contact page">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {socialFields.map((f) => (
              <AdminInput
                key={f.key}
                label={f.label}
                value={so[f.key] || ""}
                onChange={(v) => update((c2) => ({ ...c2, social: { ...c2.social, [f.key]: v } }))}
                placeholder="https://..."
              />
            ))}
          </div>
        </AdminCard>

        <SaveBar onSave={() => save(content)} saving={saving} />
      </div>
    </div>
  );
}
