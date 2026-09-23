import Link from "next/link";

interface FooterProps {
  site: { name: string; tagline: string };
  services: { id: string; title: string; href: string; enabled?: boolean }[];
  social: Record<string, string>;
  footer: {
    description: string;
    companyLinks: { label: string; href: string }[];
    supportLinks: { label: string; href: string }[];
  };
}

export default function Footer({ site, services, social, footer }: FooterProps) {
  const visibleServices = services.filter((s) => s.enabled !== false);
  const socialKeys = ["facebook", "instagram", "tiktok", "linkedin", "twitter", "youtube"];

  return (
    <footer className="bg-tricore-black text-white relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-tricore-red/5 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 bg-tricore-red rounded-xl flex items-center justify-center shadow-lg shadow-tricore-red/30">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="font-bold text-white text-lg tracking-tight">TRICORE</span>
            </Link>
            <p className="text-tricore-red font-medium text-sm mb-3">{site.tagline}</p>
            <p className="text-tricore-gray-500 text-sm leading-relaxed">{footer.description}</p>
          </div>

          <div>
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-5">Services</h3>
            <ul className="space-y-3">
              {visibleServices.map((service) => (
                <li key={service.id}>
                  <Link href={service.href} className="text-tricore-gray-400 text-sm hover:text-tricore-red transition-colors hover:translate-x-1 inline-block">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-5">Company</h3>
            <ul className="space-y-3">
              {footer.companyLinks.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-tricore-gray-400 text-sm hover:text-tricore-red transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-5">Support</h3>
            <ul className="space-y-3">
              {footer.supportLinks.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-tricore-gray-400 text-sm hover:text-tricore-red transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-3">Connect</h3>
              <div className="flex gap-2">
                {socialKeys
                  .filter((key) => social[key] && social[key] !== "#")
                  .map((key) => (
                    <a
                      key={key}
                      href={social[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-lg bg-tricore-gray-800 flex items-center justify-center text-tricore-gray-400 hover:bg-tricore-red hover:text-white transition-all text-xs capitalize"
                      aria-label={key}
                    >
                      {key.charAt(0).toUpperCase()}
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-tricore-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-tricore-gray-500 text-xs">&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="text-tricore-gray-600 text-xs">{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
