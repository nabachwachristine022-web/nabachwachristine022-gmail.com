import React from 'react';
import { ArrowRight, Sparkles, Scissors, ShieldCheck, MapPin } from 'lucide-react';
import { ProductCategory } from '../types';

interface HeroProps {
  onSelectCategory: (category: ProductCategory | 'african-wear') => void;
  onOpenCustomCouture: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectCategory, onOpenCustomCouture }) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCategoryClick = (category: ProductCategory | 'african-wear') => {
    onSelectCategory(category);
    scrollToSection('shop-section');
  };

  return (
    <section id="hero-section" className="relative bg-[#FCFBF7] overflow-hidden">
      {/* Hero Visual Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 sm:pb-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 z-10 flex flex-col justify-center">
            {/* Quiet Kicker (Zero-Pill discipline) */}
            <div className="flex items-center gap-2 text-xs font-medium text-[#B83259] tracking-widest uppercase mb-4">
              <span>Ugandan &amp; African Contemporary Couture</span>
              <span aria-hidden="true" className="text-[#C5A059]">·</span>
              <span>Ready-to-Wear</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1C1917] leading-[1.1] mb-6 text-balance">
              ELEGANCE IN EVERY STITCH.
            </h1>

            <p className="text-base sm:text-lg text-stone-700 leading-relaxed max-w-xl mb-8">
              Discover beautifully curated fashion and bespoke custom designs for every occasion.
              From authentic Ugandan Gomesi, Kanzu, and modern Kitenge ensembles to timeless
              women&apos;s gowns, stylish casual and ordinary wears, and adorable children&apos;s fashion.
            </p>

            {/* Primary Action: Create Your Custom Look */}
            <div className="mb-8">
              <button
                onClick={() => {
                  onOpenCustomCouture();
                  scrollToSection('custom-couture-section');
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-semibold tracking-wider text-white bg-[#B83259] hover:bg-[#982446] rounded-md transition-all shadow-md group whitespace-nowrap uppercase"
              >
                <Sparkles className="w-4 h-4 text-[#E5C883]" />
                <span>Create Your Custom Look</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Four Quick-Shop Buttons: African Wear, Women, Men, Kids */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-600 mb-3">
                Explore Collections &amp; Cultural Attire:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 max-w-xl">
                <button
                  onClick={() => handleCategoryClick('african-wear')}
                  className="py-3 px-2 text-center text-xs font-semibold tracking-wider text-stone-900 bg-[#FAF4E8] hover:bg-[#FCE7EC] hover:text-[#B83259] border border-[#C5A059]/60 rounded-md transition-all whitespace-nowrap shadow-xs uppercase flex items-center justify-center gap-1"
                >
                  <span className="text-[#C5A059] font-serif">✦</span>
                  <span>African Wear</span>
                </button>
                <button
                  onClick={() => handleCategoryClick('women')}
                  className="py-3 px-2 text-center text-xs font-semibold tracking-wider text-stone-800 bg-white hover:bg-[#FCE7EC] hover:text-[#B83259] border border-stone-200 rounded-md transition-all whitespace-nowrap shadow-xs uppercase"
                >
                  Shop Women
                </button>
                <button
                  onClick={() => handleCategoryClick('men')}
                  className="py-3 px-2 text-center text-xs font-semibold tracking-wider text-stone-800 bg-white hover:bg-[#FCE7EC] hover:text-[#B83259] border border-stone-200 rounded-md transition-all whitespace-nowrap shadow-xs uppercase"
                >
                  Shop Men
                </button>
                <button
                  onClick={() => handleCategoryClick('kids')}
                  className="py-3 px-2 text-center text-xs font-semibold tracking-wider text-stone-800 bg-white hover:bg-[#FCE7EC] hover:text-[#B83259] border border-stone-200 rounded-md transition-all whitespace-nowrap shadow-xs uppercase"
                >
                  Shop Kids
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Hero Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto rounded-lg overflow-hidden shadow-2xl bg-stone-100 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
              <img
                src="/src/assets/images/hero_editorial_couture_1792583036933.jpg"
                alt="CFC Christine Fashion Couture luxury evening wear and bespoke tailoring"
                className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700 ease-out"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              {/* Discreet Editorial Tag at Image Bottom */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                <div>
                  <p className="font-serif italic font-medium text-sm text-[#FAF6EE]">
                    The Kampala Atelier Collection
                  </p>
                  <p className="text-[11px] text-stone-200">
                    Bespoke bridal, formal evening &amp; modern African couture
                  </p>
                </div>
                <span className="text-[11px] font-mono tracking-wider text-[#E5C883] bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded">
                  UGX Pricing
                </span>
              </div>
            </div>

            {/* Subtle Decorative Gold Accent Edge */}
            <div className="absolute -bottom-3 -right-3 w-28 h-28 border-r-2 border-b-2 border-[#C5A059]/40 rounded-br-2xl -z-10 hidden sm:block" />
          </div>
        </div>
      </div>

      {/* Trust & Craftsmanship Strip (Clean Unboxed Grid) */}
      <div className="border-y border-stone-200 bg-[#F8F6F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <Scissors className="w-4 h-4 text-[#C5A059] shrink-0" />
              <div>
                <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                  Bespoke Made-to-Measure
                </h4>
                <p className="text-[11px] text-stone-600">Custom tailored to your fit</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <MapPin className="w-4 h-4 text-[#C5A059] shrink-0" />
              <div>
                <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                  Uganda Delivery
                </h4>
                <p className="text-[11px] text-stone-600">Kampala &amp; nationwide transit</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0" />
              <div>
                <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                  Transparent UGX Prices
                </h4>
                <p className="text-[11px] text-stone-600">No hidden conversion rates</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <Sparkles className="w-4 h-4 text-[#C5A059] shrink-0" />
              <div>
                <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                  WhatsApp Ordering
                </h4>
                <p className="text-[11px] text-stone-600">Direct artisan communication</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
