"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80",
    headline: "Nourishing Life.",
    sub: "Simplifying Living.",
    description:
      "Fresh meals sourced from your favourite restaurants and food vendors — delivered to your door.",
    cta: "Order Food",
    ctaHref: "/services/food",
  },
  {
    image:
      "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=1600&q=80",
    headline: "Groceries & Essentials.",
    sub: "Sourced & Delivered.",
    description:
      "Everyday groceries and household essentials — tell us what you need, we deliver.",
    cta: "Get Groceries",
    ctaHref: "/services/groceries",
  },
  {
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1600&q=80",
    headline: "Errands Handled.",
    sub: "Time Saved.",
    description:
      "Pick-ups, drop-offs, shopping, document collection — delegate it all to Tricore.",
    cta: "Request an Errand",
    ctaHref: "/services/errands",
  },
  {
    image:
      "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=1600&q=80",
    headline: "Fresh Clothes.",
    sub: "Less Stress.",
    description:
      "Professional laundry care with pickup and delivery — wash, dry, fold and iron.",
    cta: "Book Laundry",
    ctaHref: "/services/laundry",
  },
  {
    image:
      "https://images.unsplash.com/photo-1616432043562-3671ea2e5242?w=1600&q=80",
    headline: "Delivered Anywhere.",
    sub: "Fast & Reliable.",
    description:
      "Move items efficiently from one location to another with Tricore logistics.",
    cta: "Request Delivery",
    ctaHref: "/services/delivery",
  },
  {
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80",
    headline: "Business Solutions.",
    sub: "Built for Organisations.",
    description:
      "Convenience and logistics support tailored for offices, schools and institutions.",
    cta: "Partner With Tricore",
    ctaHref: "/services/business",
  },
];

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 600);
    },
    [isTransitioning]
  );

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative w-full h-[600px] sm:h-[650px] lg:h-[700px] overflow-hidden bg-tricore-black">
      {/* Background Images */}
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${s.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        <div className="max-w-2xl">
          <div className="overflow-hidden mb-2">
            <p
              key={`label-${current}`}
              className="text-tricore-red font-semibold text-sm uppercase tracking-[0.2em] animate-fade-in-up"
            >
              Tricore Foods & Errands
            </p>
          </div>

          <div className="overflow-hidden">
            <h1
              key={`headline-${current}`}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.1] animate-fade-in-up stagger-1"
            >
              {slide.headline}{" "}
              <span className="text-tricore-red">{slide.sub}</span>
            </h1>
          </div>

          <div className="overflow-hidden mt-4">
            <p
              key={`desc-${current}`}
              className="text-tricore-gray-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-lg animate-fade-in-up stagger-2"
            >
              {slide.description}
            </p>
          </div>

          <div
            key={`cta-${current}`}
            className="flex flex-col sm:flex-row gap-3 mt-8 animate-fade-in-up stagger-3"
          >
            <Link
              href={slide.ctaHref}
              className="inline-flex items-center justify-center gap-2 bg-tricore-red text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-tricore-red-dark transition-all hover:shadow-lg hover:shadow-tricore-red/25"
            >
              {slide.cta}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-white/10 backdrop-blur-sm transition-all"
            >
              Explore Our Services
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? "w-8 h-2.5 bg-tricore-red"
                : "w-2.5 h-2.5 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Ecosystem Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-black/40 backdrop-blur-md border-t border-white/10 hidden lg:block">
        <div className="max-w-7xl mx-auto px-8 py-3 flex items-center justify-center gap-6">
          {["Food", "Groceries", "Errands", "Delivery", "Laundry", "Business"].map(
            (item, i) => (
              <div key={item} className="flex items-center gap-6">
                <span className="text-white/60 text-xs font-medium uppercase tracking-wider hover:text-tricore-red transition-colors cursor-pointer">
                  {item}
                </span>
                {i < 5 && <span className="text-white/20 text-xs">|</span>}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
