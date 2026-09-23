"use client";

import { useContent } from "@/components/admin/hooks";
import { AdminPageHeader, LoadingSpinner, ToastDisplay } from "@/components/admin/ui";
import {
  LayoutDashboard,
  Images,
  Package,
  MessageSquareQuote,
  HelpCircle,
  FileText,
  FolderOpen,
} from "lucide-react";
import Link from "next/link";

const quickLinks = [
  { href: "/admin/slideshow", label: "Hero Slideshow", icon: Images, desc: "Manage homepage slides" },
  { href: "/admin/services", label: "Services", icon: Package, desc: "Edit service cards & images" },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote, desc: "Customer reviews" },
  { href: "/admin/faq", label: "FAQ", icon: HelpCircle, desc: "Manage questions" },
  { href: "/admin/content", label: "Page Content", icon: FileText, desc: "Edit homepage text" },
  { href: "/admin/media", label: "Media Library", icon: FolderOpen, desc: "Upload images & videos" },
];

export default function AdminDashboard() {
  const { content, loading, toast } = useContent();

  if (loading) return <LoadingSpinner />;

  const stats = content
    ? [
        { label: "Hero Slides", value: content.slides?.length || 0, href: "/admin/slideshow" },
        { label: "Services", value: content.services?.length || 0, href: "/admin/services" },
        { label: "Testimonials", value: content.testimonials?.length || 0, href: "/admin/testimonials" },
        { label: "FAQ Items", value: content.faq?.length || 0, href: "/admin/faq" },
      ]
    : [];

  return (
    <div>
      <ToastDisplay toast={toast} />
      <AdminPageHeader
        title="Dashboard"
        description="Overview of your website content"
        icon={<LayoutDashboard className="w-5 h-5" />}
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="bg-white rounded-2xl border border-tricore-gray-200 p-5 hover:border-tricore-red/30 hover:shadow-md transition-all"
          >
            <p className="text-3xl font-bold text-tricore-red">{s.value}</p>
            <p className="text-sm text-tricore-gray-500 mt-1">{s.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <h2 className="text-sm font-semibold text-tricore-gray-500 uppercase tracking-wider mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickLinks.map((q) => (
          <Link
            key={q.href}
            href={q.href}
            className="bg-white rounded-2xl border border-tricore-gray-200 p-5 hover:border-tricore-red/30 hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 bg-tricore-red-light rounded-xl flex items-center justify-center text-tricore-red mb-3 group-hover:bg-tricore-red group-hover:text-white transition-all">
              <q.icon className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-tricore-black text-sm">{q.label}</h3>
            <p className="text-tricore-gray-500 text-xs mt-0.5">{q.desc}</p>
          </Link>
        ))}
      </div>

      {/* Site Info */}
      {content?.site && (
        <div className="mt-8 bg-white rounded-2xl border border-tricore-gray-200 p-6">
          <h2 className="text-sm font-semibold text-tricore-gray-500 uppercase tracking-wider mb-4">Site Info</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-tricore-gray-500">Name:</span>{" "}
              <span className="text-tricore-black font-medium">{content.site.name}</span>
            </div>
            <div>
              <span className="text-tricore-gray-500">Tagline:</span>{" "}
              <span className="text-tricore-black font-medium">{content.site.tagline}</span>
            </div>
            <div>
              <span className="text-tricore-gray-500">URL:</span>{" "}
              <span className="text-tricore-black font-medium">{content.site.url}</span>
            </div>
            <div>
              <span className="text-tricore-gray-500">Phone:</span>{" "}
              <span className="text-tricore-black font-medium">{content.contact?.phone}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
