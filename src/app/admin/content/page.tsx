"use client";

import { useContent } from "@/components/admin/hooks";
import { AdminPageHeader, AdminInput, AdminTextarea, AdminCard, SaveBar, LoadingSpinner, ToastDisplay, ImageInput } from "@/components/admin/ui";
import { FileText } from "lucide-react";

export default function AdminContentPage() {
  const { content, loading, saving, toast, save, update } = useContent();

  if (loading || !content) return <LoadingSpinner />;

  const hp = content.homepage;

  const updateHP = (section: string, patch: any) => {
    update((c: any) => ({
      ...c,
      homepage: { ...c.homepage, [section]: { ...c.homepage[section], ...patch } },
    }));
  };

  const updateAbout = (patch: any) => {
    update((c: any) => ({ ...c, about: { ...c.about, ...patch } }));
  };

  const updateHIW = (patch: any) => {
    update((c: any) => ({ ...c, howItWorksPage: { ...c.howItWorksPage, ...patch } }));
  };

  return (
    <div>
      <ToastDisplay toast={toast} />
      <AdminPageHeader title="Page Content" description="Edit text, images and content for homepage and inner pages" icon={<FileText className="w-5 h-5" />} />

      <div className="space-y-8">
        {/* Services Section */}
        <AdminCard title="Homepage — Services Section" description="Heading for the services grid">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <AdminInput label="Tag" value={hp.servicesSection.tag} onChange={(v) => updateHP("servicesSection", { tag: v })} />
            <AdminInput label="Heading" value={hp.servicesSection.heading} onChange={(v) => updateHP("servicesSection", { heading: v })} />
          </div>
          <div className="mt-5">
            <AdminInput label="Description" value={hp.servicesSection.description} onChange={(v) => updateHP("servicesSection", { description: v })} />
          </div>
        </AdminCard>

        {/* How It Works Section */}
        <AdminCard title="Homepage — How It Works Section">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <AdminInput label="Tag" value={hp.howItWorksSection.tag} onChange={(v) => updateHP("howItWorksSection", { tag: v })} />
            <AdminInput label="Heading" value={hp.howItWorksSection.heading} onChange={(v) => updateHP("howItWorksSection", { heading: v })} />
          </div>
          <div className="mt-5 space-y-4">
            {(hp.howItWorksSection.steps || []).map((step: any, i: number) => (
              <div key={i} className="border border-tricore-gray-200 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-4 gap-4">
                <AdminInput label={`Step ${i + 1} Title`} value={step.title} onChange={(v) => {
                  update((c: any) => {
                    const steps = [...c.homepage.howItWorksSection.steps];
                    steps[i] = { ...steps[i], title: v };
                    return { ...c, homepage: { ...c.homepage, howItWorksSection: { ...c.homepage.howItWorksSection, steps } } };
                  });
                }} />
                <div className="sm:col-span-3">
                  <AdminInput label="Description" value={step.description} onChange={(v) => {
                    update((c: any) => {
                      const steps = [...c.homepage.howItWorksSection.steps];
                      steps[i] = { ...steps[i], description: v };
                      return { ...c, homepage: { ...c.homepage, howItWorksSection: { ...c.homepage.howItWorksSection, steps } } };
                    });
                  }} />
                </div>
              </div>
            ))}
          </div>
        </AdminCard>

        {/* Food Section */}
        <AdminCard title="Homepage — Food Section">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <AdminInput label="Tag" value={hp.foodSection.tag} onChange={(v) => updateHP("foodSection", { tag: v })} />
            <AdminInput label="Heading" value={hp.foodSection.heading} onChange={(v) => updateHP("foodSection", { heading: v })} />
          </div>
          <div className="mt-5">
            <AdminTextarea label="Description" value={hp.foodSection.description} onChange={(v) => updateHP("foodSection", { description: v })} rows={2} />
          </div>
          <div className="mt-5">
            <ImageInput label="Image" value={hp.foodSection.image} onChange={(v) => updateHP("foodSection", { image: v })} />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-5">
            <AdminInput label="Badge Value" value={hp.foodSection.badge?.value || ""} onChange={(v) => updateHP("foodSection", { badge: { ...hp.foodSection.badge, value: v } })} />
            <AdminInput label="Badge Label" value={hp.foodSection.badge?.label || ""} onChange={(v) => updateHP("foodSection", { badge: { ...hp.foodSection.badge, label: v } })} />
          </div>
          <div className="mt-5">
            <label className="block text-sm font-medium text-tricore-black mb-1.5">Category Tags (comma-separated)</label>
            <input
              type="text"
              value={(hp.foodSection.categories || []).join(", ")}
              onChange={(e) => updateHP("foodSection", { categories: e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean) })}
              className="w-full border border-tricore-gray-300 rounded-xl px-4 py-2.5 text-sm text-tricore-black bg-white focus:ring-2 focus:ring-tricore-red/30 focus:border-tricore-red outline-none"
            />
          </div>
        </AdminCard>

        {/* Groceries Section */}
        <AdminCard title="Homepage — Groceries Section">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <AdminInput label="Tag" value={hp.groceriesSection.tag} onChange={(v) => updateHP("groceriesSection", { tag: v })} />
            <AdminInput label="Heading" value={hp.groceriesSection.heading} onChange={(v) => updateHP("groceriesSection", { heading: v })} />
          </div>
          <div className="mt-5">
            <AdminTextarea label="Description" value={hp.groceriesSection.description} onChange={(v) => updateHP("groceriesSection", { description: v })} rows={2} />
          </div>
          <div className="mt-5">
            <ImageInput label="Image" value={hp.groceriesSection.image} onChange={(v) => updateHP("groceriesSection", { image: v })} />
          </div>
          <div className="mt-5">
            <label className="block text-sm font-medium text-tricore-black mb-1.5">Feature Bullet Points (one per line)</label>
            <textarea
              value={(hp.groceriesSection.features || []).join("\n")}
              onChange={(e) => updateHP("groceriesSection", { features: e.target.value.split("\n").filter(Boolean) })}
              rows={4}
              className="w-full border border-tricore-gray-300 rounded-xl px-4 py-2.5 text-sm text-tricore-black bg-white focus:ring-2 focus:ring-tricore-red/30 focus:border-tricore-red outline-none resize-y"
            />
          </div>
        </AdminCard>

        {/* Errands Section */}
        <AdminCard title="Homepage — Errands Section">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <AdminInput label="Tag" value={hp.errandsSection.tag} onChange={(v) => updateHP("errandsSection", { tag: v })} />
            <AdminInput label="Heading" value={hp.errandsSection.heading} onChange={(v) => updateHP("errandsSection", { heading: v })} />
          </div>
          <div className="mt-5">
            <AdminTextarea label="Description" value={hp.errandsSection.description} onChange={(v) => updateHP("errandsSection", { description: v })} rows={2} />
          </div>
          <div className="mt-5">
            <ImageInput label="Image" value={hp.errandsSection.image} onChange={(v) => updateHP("errandsSection", { image: v })} />
          </div>
        </AdminCard>

        {/* Delivery Section */}
        <AdminCard title="Homepage — Delivery Section">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <AdminInput label="Tag" value={hp.deliverySection.tag} onChange={(v) => updateHP("deliverySection", { tag: v })} />
            <AdminInput label="Heading" value={hp.deliverySection.heading} onChange={(v) => updateHP("deliverySection", { heading: v })} />
          </div>
          <div className="mt-5">
            <AdminTextarea label="Description" value={hp.deliverySection.description} onChange={(v) => updateHP("deliverySection", { description: v })} rows={2} />
          </div>
          <div className="mt-5">
            <ImageInput label="Image" value={hp.deliverySection.image} onChange={(v) => updateHP("deliverySection", { image: v })} />
          </div>
          <div className="mt-5">
            <label className="block text-sm font-medium text-tricore-black mb-1.5">Feature Bullet Points (one per line)</label>
            <textarea
              value={(hp.deliverySection.features || []).join("\n")}
              onChange={(e) => updateHP("deliverySection", { features: e.target.value.split("\n").filter(Boolean) })}
              rows={4}
              className="w-full border border-tricore-gray-300 rounded-xl px-4 py-2.5 text-sm text-tricore-black bg-white focus:ring-2 focus:ring-tricore-red/30 focus:border-tricore-red outline-none resize-y"
            />
          </div>
        </AdminCard>

        {/* Laundry Section */}
        <AdminCard title="Homepage — Laundry Section">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <AdminInput label="Tag" value={hp.laundrySection.tag} onChange={(v) => updateHP("laundrySection", { tag: v })} />
            <AdminInput label="Heading" value={hp.laundrySection.heading} onChange={(v) => updateHP("laundrySection", { heading: v })} />
          </div>
          <div className="mt-5">
            <AdminInput label="Description" value={hp.laundrySection.description} onChange={(v) => updateHP("laundrySection", { description: v })} />
          </div>
          <div className="mt-5">
            <ImageInput label="Background Image" value={hp.laundrySection.image} onChange={(v) => updateHP("laundrySection", { image: v })} />
          </div>
          <div className="mt-5">
            <label className="block text-sm font-medium text-tricore-black mb-1.5">Service Tags (comma-separated)</label>
            <input
              type="text"
              value={(hp.laundrySection.services || []).join(", ")}
              onChange={(e) => updateHP("laundrySection", { services: e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean) })}
              className="w-full border border-tricore-gray-300 rounded-xl px-4 py-2.5 text-sm text-tricore-black bg-white focus:ring-2 focus:ring-tricore-red/30 focus:border-tricore-red outline-none"
            />
          </div>
        </AdminCard>

        {/* Business Section */}
        <AdminCard title="Homepage — Business Section">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <AdminInput label="Tag" value={hp.businessSection.tag} onChange={(v) => updateHP("businessSection", { tag: v })} />
            <AdminInput label="Heading" value={hp.businessSection.heading} onChange={(v) => updateHP("businessSection", { heading: v })} />
          </div>
          <div className="mt-5">
            <AdminTextarea label="Description" value={hp.businessSection.description} onChange={(v) => updateHP("businessSection", { description: v })} rows={2} />
          </div>
          <div className="mt-5">
            <ImageInput label="Image" value={hp.businessSection.image} onChange={(v) => updateHP("businessSection", { image: v })} />
          </div>
        </AdminCard>

        {/* Why Tricore */}
        <AdminCard title="Homepage — Why Tricore Section">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <AdminInput label="Tag" value={hp.whyTricoreSection.tag} onChange={(v) => updateHP("whyTricoreSection", { tag: v })} />
            <AdminInput label="Heading" value={hp.whyTricoreSection.heading} onChange={(v) => updateHP("whyTricoreSection", { heading: v })} />
          </div>
          <div className="space-y-3">
            {(hp.whyTricoreSection.items || []).map((item: any, i: number) => (
              <div key={i} className="border border-tricore-gray-200 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                <AdminInput label="Title" value={item.title} onChange={(v) => {
                  update((c: any) => {
                    const items = [...c.homepage.whyTricoreSection.items];
                    items[i] = { ...items[i], title: v };
                    return { ...c, homepage: { ...c.homepage, whyTricoreSection: { ...c.homepage.whyTricoreSection, items } } };
                  });
                }} />
                <div className="sm:col-span-2">
                  <AdminInput label="Description" value={item.description} onChange={(v) => {
                    update((c: any) => {
                      const items = [...c.homepage.whyTricoreSection.items];
                      items[i] = { ...items[i], description: v };
                      return { ...c, homepage: { ...c.homepage, whyTricoreSection: { ...c.homepage.whyTricoreSection, items } } };
                    });
                  }} />
                </div>
              </div>
            ))}
          </div>
        </AdminCard>

        {/* Testimonials Section Heading */}
        <AdminCard title="Homepage — Testimonials Section Heading">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <AdminInput label="Tag" value={hp.testimonialsSection.tag} onChange={(v) => updateHP("testimonialsSection", { tag: v })} />
            <AdminInput label="Heading" value={hp.testimonialsSection.heading} onChange={(v) => updateHP("testimonialsSection", { heading: v })} />
          </div>
          <div className="mt-5">
            <AdminInput label="Description" value={hp.testimonialsSection.description} onChange={(v) => updateHP("testimonialsSection", { description: v })} />
          </div>
        </AdminCard>

        {/* FAQ Section Heading */}
        <AdminCard title="Homepage — FAQ Section Heading">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <AdminInput label="Tag" value={hp.faqSection.tag} onChange={(v) => updateHP("faqSection", { tag: v })} />
            <AdminInput label="Heading" value={hp.faqSection.heading} onChange={(v) => updateHP("faqSection", { heading: v })} />
          </div>
        </AdminCard>

        {/* CTA Section */}
        <AdminCard title="Homepage — Final CTA Section">
          <AdminInput label="Heading" value={hp.ctaSection.heading} onChange={(v) => updateHP("ctaSection", { heading: v })} />
          <div className="mt-5">
            <AdminTextarea label="Description" value={hp.ctaSection.description} onChange={(v) => updateHP("ctaSection", { description: v })} rows={2} />
          </div>
          <div className="mt-5">
            <ImageInput label="Background Image" value={hp.ctaSection.image} onChange={(v) => updateHP("ctaSection", { image: v })} />
          </div>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <AdminInput label="Primary Button Text" value={hp.ctaSection.cta1} onChange={(v) => updateHP("ctaSection", { cta1: v })} />
            <AdminInput label="Primary Button Link" value={hp.ctaSection.cta1Href} onChange={(v) => updateHP("ctaSection", { cta1Href: v })} />
          </div>
        </AdminCard>

        {/* About Page */}
        <AdminCard title="About Page Content">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <AdminInput label="Hero Tag" value={content.about.heroTag} onChange={(v) => updateAbout({ heroTag: v })} />
            <AdminInput label="Hero Heading" value={content.about.heroHeading} onChange={(v) => updateAbout({ heroHeading: v })} />
          </div>
          <div className="mt-5">
            <AdminTextarea label="Hero Description" value={content.about.heroDescription} onChange={(v) => updateAbout({ heroDescription: v })} rows={2} />
          </div>
          <div className="mt-5">
            <ImageInput label="Hero Image" value={content.about.heroImage} onChange={(v) => updateAbout({ heroImage: v })} />
          </div>

          <div className="mt-6 pt-6 border-t border-tricore-gray-200">
            <AdminInput label="Story Heading" value={content.about.storyHeading} onChange={(v) => updateAbout({ storyHeading: v })} />
            <div className="mt-5">
              <label className="block text-sm font-medium text-tricore-black mb-1.5">Story Paragraphs (one per line)</label>
              <textarea
                value={(content.about.storyParagraphs || []).join("\n")}
                onChange={(e) => updateAbout({ storyParagraphs: e.target.value.split("\n").filter(Boolean) })}
                rows={4}
                className="w-full border border-tricore-gray-300 rounded-xl px-4 py-2.5 text-sm text-tricore-black bg-white focus:ring-2 focus:ring-tricore-red/30 focus:border-tricore-red outline-none resize-y"
              />
            </div>
            <div className="mt-5">
              <ImageInput label="Story Image" value={content.about.storyImage} onChange={(v) => updateAbout({ storyImage: v })} />
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-tricore-gray-200">
            <AdminTextarea label="Mission" value={content.about.mission} onChange={(v) => updateAbout({ mission: v })} rows={2} />
            <div className="mt-5">
              <AdminTextarea label="Vision" value={content.about.vision} onChange={(v) => updateAbout({ vision: v })} rows={2} />
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-tricore-gray-200">
            <AdminInput label="Philosophy Tag" value={content.about.philosophyTag} onChange={(v) => updateAbout({ philosophyTag: v })} />
            <div className="mt-5">
              <AdminInput label="Philosophy Heading" value={content.about.philosophyHeading} onChange={(v) => updateAbout({ philosophyHeading: v })} />
            </div>
            <div className="mt-5">
              <AdminTextarea label="Philosophy Description" value={content.about.philosophyDescription} onChange={(v) => updateAbout({ philosophyDescription: v })} rows={2} />
            </div>
            <div className="mt-5">
              <ImageInput label="Philosophy Image" value={content.about.philosophyImage} onChange={(v) => updateAbout({ philosophyImage: v })} />
            </div>
            <div className="mt-5">
              <label className="block text-sm font-medium text-tricore-black mb-1.5">Pillars (comma-separated)</label>
              <input
                type="text"
                value={(content.about.philosophyPillars || []).join(", ")}
                onChange={(e) => updateAbout({ philosophyPillars: e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean) })}
                className="w-full border border-tricore-gray-300 rounded-xl px-4 py-2.5 text-sm text-tricore-black bg-white focus:ring-2 focus:ring-tricore-red/30 focus:border-tricore-red outline-none"
              />
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-tricore-gray-200">
            <AdminInput label="Leadership Heading" value={content.about.leadershipHeading} onChange={(v) => updateAbout({ leadershipHeading: v })} />
            <div className="mt-5">
              <AdminTextarea label="Leadership Text" value={content.about.leadershipText} onChange={(v) => updateAbout({ leadershipText: v })} rows={2} />
            </div>
          </div>
        </AdminCard>

        {/* How It Works Page */}
        <AdminCard title="How It Works Page Content">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <AdminInput label="Hero Tag" value={content.howItWorksPage.heroTag} onChange={(v) => updateHIW({ heroTag: v })} />
            <AdminInput label="Hero Heading" value={content.howItWorksPage.heroHeading} onChange={(v) => updateHIW({ heroHeading: v })} />
          </div>
          <div className="mt-5">
            <AdminTextarea label="Hero Description" value={content.howItWorksPage.heroDescription} onChange={(v) => updateHIW({ heroDescription: v })} rows={2} />
          </div>

          <div className="mt-6 pt-6 border-t border-tricore-gray-200">
            <AdminInput label="CTA Heading" value={content.howItWorksPage.ctaHeading} onChange={(v) => updateHIW({ ctaHeading: v })} />
            <div className="mt-5">
              <AdminInput label="CTA Text" value={content.howItWorksPage.ctaText} onChange={(v) => updateHIW({ ctaText: v })} />
            </div>
          </div>
        </AdminCard>

        {/* Contact Page */}
        <AdminCard title="Contact Page Content">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <AdminInput label="Hero Tag" value={content.contactPage.heroTag} onChange={(v) => update((c: any) => ({ ...c, contactPage: { ...c.contactPage, heroTag: v } }))} />
            <AdminInput label="Hero Heading" value={content.contactPage.heroHeading} onChange={(v) => update((c: any) => ({ ...c, contactPage: { ...c.contactPage, heroHeading: v } }))} />
          </div>
          <div className="mt-5">
            <AdminTextarea label="Hero Description" value={content.contactPage.heroDescription} onChange={(v) => update((c: any) => ({ ...c, contactPage: { ...c.contactPage, heroDescription: v } }))} rows={2} />
          </div>
        </AdminCard>

        {/* Services Page */}
        <AdminCard title="Services Page Content">
          <AdminInput label="Hero Heading" value={content.servicesPage.heroHeading} onChange={(v) => update((c: any) => ({ ...c, servicesPage: { ...c.servicesPage, heroHeading: v } }))} />
          <div className="mt-5">
            <AdminTextarea label="Hero Description" value={content.servicesPage.heroDescription} onChange={(v) => update((c: any) => ({ ...c, servicesPage: { ...c.servicesPage, heroDescription: v } }))} rows={2} />
          </div>
        </AdminCard>

        <SaveBar onSave={() => save(content)} saving={saving} />
      </div>
    </div>
  );
}
