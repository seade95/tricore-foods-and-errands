"use client";

import { useContent } from "@/components/admin/hooks";
import { AdminPageHeader, AdminInput, AdminTextarea, AdminToggle, AdminCard, SaveBar, LoadingSpinner, ToastDisplay, ImageInput } from "@/components/admin/ui";
import { Images, Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import type { Slide } from "@/lib/types";

export default function AdminSlideshowPage() {
  const { content, loading, saving, toast, save, update } = useContent();

  if (loading || !content) return <LoadingSpinner />;

  const slides = content.slides || [];

  const updateSlide = (index: number, patch: Partial<Slide>) => {
    update((c) => ({
      ...c,
      slides: (c.slides || []).map((s, i) => (i === index ? { ...s, ...patch } : s)),
    }));
  };

  const addSlide = () => {
    update((c) => ({
      ...c,
      slides: [
        ...(c.slides || []),
        {
          id: `slide-${Date.now()}`,
          image: "",
          headline: "",
          sub: "",
          description: "",
          cta: "",
          ctaHref: "/services",
          enabled: true,
        },
      ],
    }));
  };

  const removeSlide = (index: number) => {
    update((c) => ({ ...c, slides: (c.slides || []).filter((_, i) => i !== index) }));
  };

  const moveSlide = (index: number, dir: -1 | 1) => {
    update((c) => {
      const arr = [...(c.slides || [])];
      const target = index + dir;
      if (target < 0 || target >= arr.length) return c;
      [arr[index], arr[target]] = [arr[target], arr[index]];
      return { ...c, slides: arr };
    });
  };

  return (
    <div>
      <ToastDisplay toast={toast} />
      <AdminPageHeader title="Hero Slideshow" description="Manage the rotating homepage hero slides" icon={<Images className="w-5 h-5" />} />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-tricore-gray-500">
            {slides.length} slide{slides.length !== 1 ? "s" : ""} — drag order matters
          </p>
          <button
            onClick={addSlide}
            className="inline-flex items-center gap-2 bg-tricore-red text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-tricore-red-dark transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Slide
          </button>
        </div>

        {slides.map((slide, i) => (
          <AdminCard key={slide.id || i} title={`Slide ${i + 1}`}>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <AdminToggle
                  label={slide.enabled ? "Visible" : "Hidden"}
                  value={slide.enabled !== false}
                  onChange={(v) => updateSlide(i, { enabled: v })}
                />
                <div className="flex items-center gap-1">
                  <button onClick={() => moveSlide(i, -1)} disabled={i === 0} className="p-2 text-tricore-gray-400 hover:text-tricore-black disabled:opacity-30 transition-colors" title="Move up">
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button onClick={() => moveSlide(i, 1)} disabled={i === slides.length - 1} className="p-2 text-tricore-gray-400 hover:text-tricore-black disabled:opacity-30 transition-colors" title="Move down">
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button onClick={() => removeSlide(i)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Remove">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <ImageInput label="Slide Image" value={slide.image} onChange={(v) => updateSlide(i, { image: v })} hint="Recommended: 1600x900px" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <AdminInput label="Headline" value={slide.headline} onChange={(v) => updateSlide(i, { headline: v })} placeholder="e.g. Nourishing Life." />
                <AdminInput label="Sub Headline (red text)" value={slide.sub} onChange={(v) => updateSlide(i, { sub: v })} placeholder="e.g. Simplifying Living." />
              </div>

              <AdminTextarea label="Description" value={slide.description} onChange={(v) => updateSlide(i, { description: v })} rows={2} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <AdminInput label="Button Text" value={slide.cta} onChange={(v) => updateSlide(i, { cta: v })} placeholder="e.g. Order Food" />
                <AdminInput label="Button Link" value={slide.ctaHref} onChange={(v) => updateSlide(i, { ctaHref: v })} placeholder="/services/food" />
              </div>
            </div>
          </AdminCard>
        ))}

        <SaveBar onSave={() => save(content)} saving={saving} />
      </div>
    </div>
  );
}
