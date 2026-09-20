export const siteConfig = {
  name: "Tricore Foods & Errands",
  tagline: "Nourishing Life. Simplifying Living.",
  description:
    "Tricore Foods & Errands is an integrated Nigerian convenience and lifestyle service business designed to make everyday living easier by connecting customers with food, groceries, errands, delivery, logistics and related household services.",
  url: "https://tricorefoods.com",
  whatsapp: {
    number: "+234XXXXXXXXXX",
    message:
      "Hello Tricore, I would like to request a service. Please share the details.",
  },
  contact: {
    phone: "+234XXXXXXXXXX",
    email: "hello@tricorefoods.com",
    address: "[Business Address — To be confirmed]",
    hours: "Mon - Sat: 8:00 AM - 9:00 PM | Sun: 10:00 AM - 6:00 PM",
  },
  social: {
    facebook: "#",
    instagram: "#",
    tiktok: "#",
    linkedin: "#",
  },
  services: [
    {
      id: "food",
      title: "Food",
      shortDescription: "Order meals from your preferred restaurants and food vendors.",
      cta: "Order Food",
      href: "/services/food",
      icon: "UtensilsCrossed",
    },
    {
      id: "groceries",
      title: "Groceries",
      shortDescription: "Get groceries and everyday essentials sourced and delivered.",
      cta: "Get Groceries",
      href: "/services/groceries",
      icon: "ShoppingBasket",
    },
    {
      id: "errands",
      title: "Errands",
      shortDescription: "Let Tricore handle tasks that you don't have time to handle yourself.",
      cta: "Request an Errand",
      href: "/services/errands",
      icon: "ListChecks",
    },
    {
      id: "delivery",
      title: "Delivery & Logistics",
      shortDescription: "Move items efficiently from one location to another.",
      cta: "Request Delivery",
      href: "/services/delivery",
      icon: "Truck",
    },
    {
      id: "laundry",
      title: "Laundry",
      shortDescription: "Professional laundry care designed for convenience.",
      cta: "Book Laundry",
      href: "/services/laundry",
      icon: "Shirt",
    },
    {
      id: "business",
      title: "Business Services",
      shortDescription:
        "Convenience and logistics support for organisations and institutions.",
      cta: "Talk to Tricore",
      href: "/services/business",
      icon: "Building2",
    },
  ],
  navLinks: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Contact", href: "/contact" },
    { label: "Track Order", href: "/track-order" },
  ],
};
