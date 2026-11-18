import React from 'react';
import { Sparkles, ArrowRight, HeartHandshake, ShieldCheck } from 'lucide-react';
import { buildWhatsAppUrl } from '../config/brand';

interface AfricanWearSpotlightProps {
  onExploreAfricanWear: () => void;
  onOpenCustomKwanjula: () => void;
}

export const AfricanWearSpotlight: React.FC<AfricanWearSpotlightProps> = ({
  onExploreAfricanWear,
  onOpenCustomKwanjula,
}) => {
  return (
    <section id="african-wear-spotlight" className="py-16 sm:py-20 bg-[#FDF9F3] border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Cultural Celebration Editorial Photography */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-xl overflow-hidden shadow-2xl bg-stone-100 aspect-[4/3] sm:aspect-[16/11]">
              <img
                src="/src/assets/images/african_kwanjula_celebration_1792588409478.jpg"
                alt="Ugandan Kwanjula introduction ceremony couple wearing traditional Gomesi and Kanzu by CFC"
                className="w-full h-full object-cover object-center"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#E5C883]">
                  Kwanjula &amp; Traditional Ceremonies
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold">
                  Authentic Ugandan Gomesi &amp; Kanzu
                </h3>
                <p className="text-xs text-stone-200 mt-1">
                  Tailored with rich silks, hand embroidery, and luxury satin sashes.
                </p>
              </div>
            </div>

            {/* Quick Callout Badge */}
            <div className="absolute -bottom-4 -left-2 sm:left-4 bg-white/95 backdrop-blur-xs p-3 rounded-lg border border-stone-200 shadow-md flex items-center gap-2.5 max-w-xs text-xs text-stone-800">
              <HeartHandshake className="w-5 h-5 text-[#B83259] shrink-0" />
              <span>Full bridal entourage &amp; couple matching coordination available in Kampala</span>
            </div>
          </div>

          {/* Right Column: Editorial Copy & African Wear Pillars */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B83259] mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>African Contemporary &amp; Heritage Couture</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight leading-tight">
                Celebrate Your Roots in Exquisite African Fashion
              </h2>
              <p className="mt-3 text-stone-600 text-xs sm:text-sm leading-relaxed">
                At CFC – Christine Fashion Couture, we honor Uganda&apos;s rich cultural heritage.
                From ceremonial Buganda Gomesi with hand-tied sashes and crisp embroidered Kanzu tunics
                to modern Kitenge peplum sets and majestic 3-piece Agbada robes, our garments are
                crafted for your most cherished life moments.
              </p>
            </div>

            {/* African Wear Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="p-3.5 bg-white rounded-lg border border-stone-200/90 shadow-xs">
                <h4 className="font-serif text-sm font-bold text-stone-900">
                  Traditional Gomesi / Busuuti
                </h4>
                <p className="text-[11px] text-stone-600 mt-1 leading-relaxed">
                  Tailored for Kwanjula introductions, milestone anniversaries, and cultural festivities.
                </p>
              </div>

              <div className="p-3.5 bg-white rounded-lg border border-stone-200/90 shadow-xs">
                <h4 className="font-serif text-sm font-bold text-stone-900">
                  Ceremonial Kanzu &amp; Tunics
                </h4>
                <p className="text-[11px] text-stone-600 mt-1 leading-relaxed">
                  Off-white raw silk tunics with delicate maroon/gold embroidery and matching ceremonial vests.
                </p>
              </div>

              <div className="p-3.5 bg-white rounded-lg border border-stone-200/90 shadow-xs">
                <h4 className="font-serif text-sm font-bold text-stone-900">
                  Modern Kitenge &amp; Peplum Sets
                </h4>
                <p className="text-[11px] text-stone-600 mt-1 leading-relaxed">
                  Sculptural African wax prints blended with modern tailored executive and gala silhouettes.
                </p>
              </div>

              <div className="p-3.5 bg-white rounded-lg border border-stone-200/90 shadow-xs">
                <h4 className="font-serif text-sm font-bold text-stone-900">
                  Grand Agbada &amp; Senator Tunics
                </h4>
                <p className="text-[11px] text-stone-600 mt-1 leading-relaxed">
                  Sweeping 3-piece ceremonial robes and sharp mandarin-collar outfits for discerning men.
                </p>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onExploreAfricanWear}
                className="py-3 px-6 text-xs font-semibold uppercase tracking-wider text-white bg-[#B83259] hover:bg-[#982446] rounded-md transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>View African Wear Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenCustomKwanjula}
                className="py-3 px-5 text-xs font-semibold uppercase tracking-wider text-stone-800 bg-white hover:bg-stone-50 border border-stone-300 rounded-md transition-all flex items-center justify-center gap-2"
              >
                <span>Book Kwanjula Fitting</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
