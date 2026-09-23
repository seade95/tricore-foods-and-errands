"use client";

import { useContent } from "@/components/admin/hooks";
import { AdminPageHeader, AdminInput, AdminTextarea, AdminCard, SaveBar, LoadingSpinner, ToastDisplay, ImageInput } from "@/components/admin/ui";
import { Settings } from "lucide-react";

export default function AdminSettingsPage() {
  const { content, loading, saving, toast, save, update } = useContent();

  if (loading || !content) return <LoadingSpinner />;

  const s = content.site;

  return (
    <div>
      <ToastDisplay toast={toast} />
      <AdminPageHeader title="Site Settings" description="Site name, tagline, description and branding" icon={<Settings className="w-5 h-5" />} />

      <div className="space-y-6">
        <AdminCard title="Basic Information" description="Core site identity and metadata">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <AdminInput label="Site Name" value={s.name} onChange={(v) => update((c) => ({ ...c, site: { ...c.site, name: v } }))} required />
            <AdminInput label="Short Name (Logo Text)" value={s.shortName} onChange={(v) => update((c) => ({ ...c, site: { ...c.site, shortName: v } }))} />
            <AdminInput label="Logo Subtitle" value={s.subtitle} onChange={(v) => update((c) => ({ ...c, site: { ...c.site, subtitle: v } }))} hint="Shown under the short name in the header" />
            <AdminInput label="Tagline" value={s.tagline} onChange={(v) => update((c) => ({ ...c, site: { ...c.site, tagline: v } }))} />
            <AdminInput label="Website URL" value={s.url} onChange={(v) => update((c) => ({ ...c, site: { ...c.site, url: v } }))} />
            <AdminInput label="Keywords (SEO)" value={s.keywords} onChange={(v) => update((c) => ({ ...c, site: { ...c.site, keywords: v } }))} hint="Comma-separated keywords for search engines" />
          </div>
          <div className="mt-5">
            <AdminTextarea label="Site Description (SEO)" value={s.description} onChange={(v) => update((c) => ({ ...c, site: { ...c.site, description: v } }))} rows={3} hint="Used for search engine results and social sharing" />
          </div>
        </AdminCard>

        <AdminCard title="Logo" description="Upload or paste a logo image URL. Leave empty to use the default 'T' logo.">
          <ImageInput
            label="Logo Image"
            value={content.site.logo || ""}
            onChange={(v) => update((c) => ({ ...c, site: { ...c.site, logo: v } }))}
            hint="Recommended: square PNG with transparent background, at least 200x200px"
          />
        </AdminCard>

        <SaveBar onSave={() => save(content)} saving={saving} />
      </div>
    </div>
  );
}
