"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  Contact,
  CreditCard,
  Images,
  Package,
  MessageSquareQuote,
  HelpCircle,
  FileText,
  Navigation,
  FolderOpen,
  KeyRound,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/settings", label: "Site Settings", icon: Settings },
  { href: "/admin/contact", label: "Contact & Social", icon: Contact },
  { href: "/admin/payment", label: "Payment Methods", icon: CreditCard },
  { href: "/admin/slideshow", label: "Hero Slideshow", icon: Images },
  { href: "/admin/services", label: "Services", icon: Package },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/faq", label: "FAQ", icon: HelpCircle },
  { href: "/admin/content", label: "Page Content", icon: FileText },
  { href: "/admin/navigation", label: "Navigation & Footer", icon: Navigation },
  { href: "/admin/media", label: "Media Library", icon: FolderOpen },
  { href: "/admin/password", label: "Change Password", icon: KeyRound },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-tricore-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-tricore-black text-white flex flex-col fixed inset-y-0 left-0 z-40 lg:relative lg:translate-x-0">
        <div className="p-5 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-tricore-red rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <div>
              <span className="font-bold text-white text-sm tracking-tight block leading-none">TRICORE</span>
              <span className="text-[10px] text-tricore-gray-500 uppercase tracking-wider">Admin Panel</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? "bg-tricore-red text-white"
                    : "text-tricore-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/10 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-tricore-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <FileText className="w-4 h-4" />
            View Website
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-tricore-gray-400 hover:text-red-400 hover:bg-white/5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 lg:ml-0 ml-64 min-h-screen">
        <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-tricore-gray-200 px-4 py-3">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-tricore-red rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">T</span>
            </div>
            <span className="font-bold text-tricore-black text-sm">Admin Panel</span>
          </Link>
        </div>
        <main className="p-4 sm:p-6 lg:p-8 max-w-6xl">{children}</main>
      </div>
    </div>
  );
}
