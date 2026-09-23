export interface SiteSettings {
  name: string;
  shortName: string;
  subtitle: string;
  tagline: string;
  description: string;
  url: string;
  keywords: string;
  logo?: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  hours: string;
}

export interface WhatsAppConfig {
  number: string;
  message: string;
}

export type SocialKey =
  | "facebook"
  | "instagram"
  | "tiktok"
  | "linkedin"
  | "twitter"
  | "youtube";

export type SocialLinks = Partial<Record<SocialKey, string>>;

export interface PaymentMethod {
  id: string;
  name: string;
  enabled: boolean;
  instructions: string;
}

export interface PaymentConfig {
  enabled: boolean;
  note: string;
  methods: PaymentMethod[];
}

export interface Slide {
  id?: string;
  image: string;
  headline: string;
  sub: string;
  description: string;
  cta: string;
  ctaHref: string;
  enabled?: boolean;
}

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  cta: string;
  href: string;
  icon: string;
  image?: string;
  enabled?: boolean;
}

export interface NavLink {
  label: string;
  href: string;
  enabled?: boolean;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterConfig {
  description: string;
  companyLinks: FooterLink[];
  supportLinks: FooterLink[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  enabled?: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  enabled?: boolean;
}

export interface IconTextItem {
  icon: string;
  title: string;
  description: string;
}

export interface StepItem {
  icon: string;
  step: string;
  title: string;
  description: string;
}

export interface Badge {
  value: string;
  label: string;
}

export interface ImageCtaSection {
  tag: string;
  heading: string;
  description: string;
  image: string;
  cta?: string;
  ctaHref?: string;
  badge?: Badge;
}

export interface HomepageContent {
  servicesSection: { tag: string; heading: string; description: string };
  howItWorksSection: { tag: string; heading: string; steps: StepItem[] };
  foodSection: ImageCtaSection & {
    categories: string[];
    cta: string;
    ctaHref: string;
    badge: Badge;
  };
  groceriesSection: ImageCtaSection & {
    features: string[];
    cta: string;
    ctaHref: string;
    badge: Badge;
  };
  errandsSection: ImageCtaSection & { cta: string; ctaHref: string };
  deliverySection: ImageCtaSection & {
    features: string[];
    cta: string;
    ctaHref: string;
  };
  laundrySection: {
    tag: string;
    heading: string;
    description: string;
    image: string;
    services: string[];
    cta: string;
    ctaHref: string;
  };
  businessSection: ImageCtaSection & { cta: string; ctaHref: string };
  whyTricoreSection: { tag: string; heading: string; items: IconTextItem[] };
  testimonialsSection: { tag: string; heading: string; description: string };
  faqSection: { tag: string; heading: string };
  ctaSection: {
    heading: string;
    description: string;
    image: string;
    cta1: string;
    cta1Href: string;
    cta2?: string;
  };
}

export interface AboutContent {
  heroTag: string;
  heroHeading: string;
  heroDescription: string;
  heroImage: string;
  storyHeading: string;
  storyParagraphs: string[];
  storyImage: string;
  mission: string;
  vision: string;
  values: IconTextItem[];
  philosophyTag: string;
  philosophyHeading: string;
  philosophyDescription: string;
  philosophyImage: string;
  philosophyPillars: string[];
  leadershipHeading: string;
  leadershipText: string;
}

export interface HowItWorksPageContent {
  heroTag: string;
  heroHeading: string;
  heroDescription: string;
  steps: StepItem[];
  serviceProcessesHeading: string;
  serviceProcesses: { title: string; steps: string[] }[];
  ctaHeading: string;
  ctaText: string;
  ctaButton: string;
}

export interface Content {
  site: SiteSettings;
  contact: ContactInfo;
  whatsapp: WhatsAppConfig;
  social: SocialLinks;
  payment: PaymentConfig;
  slides: Slide[];
  services: Service[];
  navLinks: NavLink[];
  testimonials: Testimonial[];
  faq: FaqItem[];
  homepage: HomepageContent;
  about: AboutContent;
  howItWorksPage: HowItWorksPageContent;
  contactPage: { heroTag: string; heroHeading: string; heroDescription: string };
  servicesPage: { heroHeading: string; heroDescription: string };
  footer: FooterConfig;
}

export type ContentSectionKey = keyof Content;

export interface Submission {
  id: string;
  type: "contact" | "request" | "business";
  receivedAt: string;
  data: Record<string, string>;
}
