import React from 'react';
import { Phone, MessageCircle, Heart, ArrowUp } from 'lucide-react';
import { BRAND_CONFIG, buildWhatsAppUrl } from '../config/brand';
import { ProductCategory } from '../types';

interface FooterProps {
  onSelectCategory: (cat: ProductCategory | 'all' | 'african-wear') => void;
  onOpenCustomCouture: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenCustomCouture }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToShop = (category: ProductCategory | 'all' | 'african-wear') => {
    onSelectCategory(category);
    const el = document.getElementById('shop-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1C1917] text-[#FAF6EE] pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl font-bold tracking-tight text-white">
                {BRAND_CONFIG.shortName}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
            </div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium">
              Christine Fashion Couture
            </p>
            <p className="font-serif italic text-sm text-stone-300">
              &ldquo;{BRAND_CONFIG.tagline}&rdquo;
            </p>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Uganda&apos;s premier boutique atelier for ready-made elegance and bespoke
              made-to-measure tailoring for women, men, and children.
            </p>

            <div className="pt-2 flex flex-col gap-1.5 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{BRAND_CONFIG.phoneNumbers[0].display} · {BRAND_CONFIG.phoneNumbers[1].display}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-[#C5A059]" />
                <a
                  href={buildWhatsAppUrl('Hello CFC, I would like to make an inquiry.')}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors underline"
                >
                  WhatsApp: {BRAND_CONFIG.whatsappDisplay}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links: Collections */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C5A059]">
              Fashion Collections
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <button
                  onClick={() => scrollToShop('african-wear')}
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5 text-[#E5C883]"
                >
                  <span>✦ African Wear &amp; Kwanjula</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToShop('women')}
                  className="hover:text-white transition-colors text-left"
                >
                  Women&apos;s Gowns &amp; African Kitenge
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToShop('men')}
                  className="hover:text-white transition-colors text-left"
                >
                  Men&apos;s Casual &amp; Ordinary Wear
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToShop('kids')}
                  className="hover:text-white transition-colors text-left"
                >
                  Children&apos;s Birthday &amp; Occasion Wear
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToShop('all')}
                  className="hover:text-white transition-colors text-left"
                >
                  Ready-to-Wear Pieces
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onOpenCustomCouture();
                    const el = document.getElementById('custom-couture-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-left text-[#E5C883]"
                >
                  Bespoke Made-to-Measure Couture
                </button>
              </li>
            </ul>
          </div>

          {/* Ordering Information */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C5A059]">
              Customer Ordering &amp; Delivery
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <span className="block font-medium text-white">WhatsApp Ordering Channel:</span>
                <span>Select your item and click order to start a direct consultation.</span>
              </li>
              <li>
                <span className="block font-medium text-white">Ugandan Shillings (UGX):</span>
                <span>All prices transparently displayed in local Ugandan currency.</span>
              </li>
              <li>
                <span className="block font-medium text-white">Kampala Studio Appointments:</span>
                <span>Fittings available in Kampala by appointment.</span>
              </li>
            </ul>
          </div>

          {/* Location & Social */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C5A059]">
              Social &amp; Studio
            </h4>
            <div className="flex flex-col space-y-2 text-xs text-stone-300">
              <a
                href={BRAND_CONFIG.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                Instagram
              </a>
              <a
                href={BRAND_CONFIG.socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                Facebook
              </a>
              <a
                href={BRAND_CONFIG.socialLinks.tiktok}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                TikTok
              </a>
              <button
                onClick={scrollToTop}
                className="pt-4 flex items-center gap-1.5 text-xs text-[#E5C883] hover:text-white transition-colors"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Back to Top</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} CFC – Christine Fashion Couture. All rights reserved.</p>

          <p className="flex items-center gap-1 text-[11px]">
            <span>Crafted with pride in Uganda</span>
            <Heart className="w-3 h-3 text-[#B83259] fill-current" />
            <span>Kampala</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
