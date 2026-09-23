"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  enabled?: boolean;
}

interface ServiceItem {
  id: string;
  title: string;
  href: string;
  enabled?: boolean;
}

interface HeaderProps {
  site?: { name: string; shortName: string; subtitle: string; logo?: string };
  navLinks: NavItem[];
  services: ServiceItem[];
}

export default function Header({ site, navLinks, services }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const visibleNav = navLinks.filter((l) => l.enabled !== false);
  const visibleServices = services.filter((s) => s.enabled !== false);
  const s = site || { name: "TRICORE", shortName: "TRICORE", subtitle: "Foods & Errands" };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-tricore-gray-100"
          : "bg-white border-b border-tricore-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2.5 group">
            {s.logo ? (
              <img src={s.logo} alt={s.name} className="h-10 w-auto" />
            ) : (
              <div className="w-10 h-10 bg-tricore-red rounded-xl flex items-center justify-center shadow-lg shadow-tricore-red/20 group-hover:shadow-tricore-red/40 transition-shadow">
                <span className="text-white font-bold text-xl">T</span>
              </div>
            )}
            <div className="flex flex-col leading-none">
              <span className="font-bold text-tricore-black text-lg tracking-tight">
                {s.shortName || "TRICORE"}
              </span>
              <span className="text-[10px] text-tricore-gray-500 tracking-[0.15em] uppercase hidden sm:block">
                {s.subtitle || "Foods & Errands"}
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {visibleNav.map((link) =>
              link.label === "Services" ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 px-3.5 py-2 text-sm font-medium text-tricore-gray-700 hover:text-tricore-red transition-colors rounded-lg hover:bg-tricore-gray-50"
                  >
                    {link.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                  </Link>
                  {servicesOpen && (
                    <div className="absolute top-full left-0 w-64 bg-white border border-tricore-gray-100 rounded-2xl shadow-xl py-2 z-50 mt-1">
                      {visibleServices.map((service) => (
                        <Link
                          key={service.id}
                          href={service.href}
                          className="block px-5 py-3 text-sm text-tricore-gray-700 hover:bg-tricore-red-light hover:text-tricore-red transition-colors mx-2 rounded-lg"
                        >
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3.5 py-2 text-sm font-medium text-tricore-gray-700 hover:text-tricore-red transition-colors rounded-lg hover:bg-tricore-gray-50"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/request"
              className="bg-tricore-red text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-tricore-red-dark transition-all hover:shadow-lg hover:shadow-tricore-red/25 inline-flex items-center gap-2"
            >
              Order / Request
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-tricore-gray-700 hover:text-tricore-red transition-colors rounded-lg hover:bg-tricore-gray-50"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-tricore-gray-100 bg-white/95 backdrop-blur-md animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {visibleNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-base font-medium text-tricore-gray-700 hover:text-tricore-red hover:bg-tricore-red-light rounded-xl transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-tricore-gray-100 mt-3">
              <p className="px-4 py-2 text-xs font-semibold text-tricore-gray-400 uppercase tracking-wider">Services</p>
              {visibleServices.map((service) => (
                <Link
                  key={service.id}
                  href={service.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 text-sm text-tricore-gray-600 hover:text-tricore-red hover:bg-tricore-red-light rounded-lg transition-colors"
                >
                  {service.title}
                </Link>
              ))}
            </div>
            <div className="pt-3">
              <Link
                href="/request"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center bg-tricore-red text-white px-5 py-3.5 rounded-full text-sm font-semibold hover:bg-tricore-red-dark transition-colors shadow-lg shadow-tricore-red/25"
              >
                Order / Request a Service
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
