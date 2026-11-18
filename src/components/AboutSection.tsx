import React from 'react';
import { Sparkles, Heart, Award, Scissors, Check } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';

export const AboutSection: React.FC = () => {
  return (
    <section id="about-section" className="py-16 sm:py-24 bg-[#FCFBF7] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Lead */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#B83259] mb-2">
            The Brand Journey
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            About Christine Fashion Couture
          </h2>
          <div className="w-12 h-0.5 bg-[#C5A059] mx-auto mt-4 mb-6" />
          <blockquote className="font-serif italic text-lg sm:text-xl text-stone-800 leading-relaxed text-balance">
            &ldquo;Welcome to CFC – Christine Fashion Couture, where personal style meets elegance.
            We celebrate fashion for women, men, and children through carefully selected ready-made
            clothing and personalized custom designs. Our goal is to help every customer discover
            outfits that reflect their personality, occasion, and individual style.&rdquo;
          </blockquote>
          <p className="text-xs font-semibold uppercase tracking-widest text-stone-600 mt-3">
            — Christine, Founder &amp; Creative Director
          </p>
        </div>

        {/* 2-Column Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Left Column: Atelier Image */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-xl overflow-hidden shadow-xl aspect-[4/3] bg-stone-100 border border-stone-200">
              <img
                src="/src/assets/images/couture_atelier_craft_1792583040058.jpg"
                alt="Christine Fashion Couture atelier craftsmanship and fabrics"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Subtle decorative quote box */}
            <div className="mt-4 p-4 bg-[#F8F6F0] rounded-lg border border-stone-200 text-xs text-stone-600 flex items-center gap-3">
              <Scissors className="w-4 h-4 text-[#C5A059] shrink-0" />
              <span>
                Based in Uganda, offering studio fittings, bespoke creations, and nationwide
                delivery.
              </span>
            </div>
          </div>

          {/* Right Column: 4 Pillars */}
          <div className="lg:col-span-6 space-y-8">
            {/* 01. Our Story */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B83259] mb-1">
                <span>01</span>
                <span aria-hidden="true">·</span>
                <span>Our Story</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
                Rooted in Passion and Precision
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Founded with an unwavering dedication to fine sartorial craft, CFC began as a
                creative vision to provide Kampala and Ugandan fashion lovers with garments that
                combine international luxury tailoring with proud African heritage and vibrant
                contemporary living.
              </p>
            </div>

            {/* 02. Our Fashion Philosophy */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B83259] mb-1">
                <span>02</span>
                <span aria-hidden="true">·</span>
                <span>Our Fashion Philosophy</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
                Elegance in Every Stitch
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                We believe clothing is never just fabric—it is confidence, celebration, and
                dignity. From clean, flattering seams to rich, breathable fabrics, we obsess over
                the details so you step into every room feeling poised and comfortable.
              </p>
            </div>

            {/* 03. Ready-to-Wear & Custom Design Services */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B83259] mb-1">
                <span>03</span>
                <span aria-hidden="true">·</span>
                <span>Dual Shopping Pathways</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
                Ready-to-Wear &amp; Made-to-Measure
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Whether you need an immediate ready-to-wear outfit delivered for this weekend&apos;s
                celebration or require months of bespoke bridal planning and fittings, CFC caters to
                both with the same high level of artisan care.
              </p>
            </div>
          </div>
        </div>

        {/* Commitment to Quality 4-Card Grid */}
        <div className="border-t border-stone-200 pt-12">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Our Commitment to Style &amp; Quality
            </h3>
            <p className="text-xs text-stone-600 mt-1">
              Guiding principles behind every piece created under the CFC label.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 bg-white border border-stone-200 rounded-lg shadow-xs">
              <Sparkles className="w-5 h-5 text-[#C5A059] mb-3" />
              <h4 className="font-serif text-sm font-bold text-stone-900 mb-1">
                Handpicked Materials
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Pure silks, structured wools, premium crepe, and authentic Dutch wax African prints
                tested for color-fastness and drape.
              </p>
            </div>

            <div className="p-5 bg-white border border-stone-200 rounded-lg shadow-xs">
              <Scissors className="w-5 h-5 text-[#C5A059] mb-3" />
              <h4 className="font-serif text-sm font-bold text-stone-900 mb-1">
                Artisanal Tailoring
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Internal lining, French seam finishing, reinforced closures, and hand-stitched
                embellishments that endure through wear.
              </p>
            </div>

            <div className="p-5 bg-white border border-stone-200 rounded-lg shadow-xs">
              <Heart className="w-5 h-5 text-[#C5A059] mb-3" />
              <h4 className="font-serif text-sm font-bold text-stone-900 mb-1">
                Family &amp; All Generations
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Thoughtfully sized clothing for women, men, and children so your entire family can
                coordinate gracefully for life&apos;s biggest milestones.
              </p>
            </div>

            <div className="p-5 bg-white border border-stone-200 rounded-lg shadow-xs">
              <Award className="w-5 h-5 text-[#C5A059] mb-3" />
              <h4 className="font-serif text-sm font-bold text-stone-900 mb-1">
                Personalized Care
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Direct WhatsApp consultation with our team ensures your measurements, questions,
                and deadlines are handled with genuine attention.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
