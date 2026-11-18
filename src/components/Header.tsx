import React, { useState } from 'react';
import { ShoppingBag, Search, MessageCircle, Menu, X, Phone, User as UserIcon } from 'lucide-react';
import { BRAND_CONFIG, buildWhatsAppUrl } from '../config/brand';
import { ProductCategory } from '../types';
import { useAuth } from '../firebase/AuthContext';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onSelectCategory: (category: ProductCategory | 'all' | 'african-wear') => void;
  activeCategory: ProductCategory | 'all' | 'african-wear';
  onSearchChange: (query: string) => void;
  searchQuery: string;
  onOpenCustomCouture: () => void;
  onOpenAuthModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onSelectCategory,
  activeCategory,
  onSearchChange,
  searchQuery,
  onOpenCustomCouture,
  onOpenAuthModal,
}) => {
  const { currentUser, isAdmin } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleNavClick = (category: ProductCategory | 'all' | 'african-wear', anchorId?: string) => {
    onSelectCategory(category);
    setIsMobileMenuOpen(false);
    if (anchorId) {
      const el = document.getElementById(anchorId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Top Bar Announcement / Trust Strip */}
      <div className="bg-[#1C1917] text-[#FAF6EE] text-xs py-2 px-4 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[#C5A059] font-medium tracking-wider uppercase text-[11px]">
              Uganda Atelier
            </span>
            <span className="hidden sm:inline text-stone-500">|</span>
            <span className="hidden sm:inline text-stone-300">
              Bespoke Couture &amp; Ready-to-Wear in Kampala
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-stone-300">
            <a
              href={`tel:${BRAND_CONFIG.phoneNumbers[0].international}`}
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3 h-3 text-[#C5A059]" />
              <span className="hidden md:inline">{BRAND_CONFIG.phoneNumbers[0].display}</span>
              <span className="md:hidden">Call Us</span>
            </a>
            <span className="text-stone-600">·</span>
            <a
              href={buildWhatsAppUrl('Hello CFC, I would like to make an inquiry.')}
              target="_blank"
              rel="noreferrer"
              className="text-[#E5C883] hover:text-white transition-colors flex items-center gap-1"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header – Top Bar Contract (Wordmark, Nav Links, Primary Actions) */}
      <header className="sticky top-0 z-40 bg-[#FCFBF7]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
          {/* Zone 1: Wordmark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('all', 'hero-section');
            }}
            className="group flex flex-col shrink-0 focus:outline-none"
          >
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1917] group-hover:text-[#B83259] transition-colors">
                {BRAND_CONFIG.shortName}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
            </div>
            <span className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-stone-600 font-medium">
              Christine Fashion Couture
            </span>
          </a>

          {/* Zone 2: Navigation Links (single-line, clean typography) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-700">
            <button
              onClick={() => handleNavClick('all', 'shop-section')}
              className={`hover:text-[#B83259] transition-colors whitespace-nowrap ${
                activeCategory === 'all' ? 'text-[#B83259] font-semibold' : ''
              }`}
            >
              All Collections
            </button>
            <button
              onClick={() => handleNavClick('african-wear', 'shop-section')}
              className={`hover:text-[#B83259] transition-colors whitespace-nowrap flex items-center gap-1 ${
                activeCategory === 'african-wear' ? 'text-[#B83259] font-semibold' : 'text-stone-800'
              }`}
            >
              <span className="text-[#C5A059] font-serif">✦</span>
              <span>African Wear</span>
            </button>
            <button
              onClick={() => handleNavClick('women', 'shop-section')}
              className={`hover:text-[#B83259] transition-colors whitespace-nowrap ${
                activeCategory === 'women' ? 'text-[#B83259] font-semibold' : ''
              }`}
            >
              Women
            </button>
            <button
              onClick={() => handleNavClick('men', 'shop-section')}
              className={`hover:text-[#B83259] transition-colors whitespace-nowrap ${
                activeCategory === 'men' ? 'text-[#B83259] font-semibold' : ''
              }`}
            >
              Men
            </button>
            <button
              onClick={() => handleNavClick('kids', 'shop-section')}
              className={`hover:text-[#B83259] transition-colors whitespace-nowrap ${
                activeCategory === 'kids' ? 'text-[#B83259] font-semibold' : ''
              }`}
            >
              Kids
            </button>
            <button
              onClick={() => {
                onOpenCustomCouture();
                const el = document.getElementById('custom-couture-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#B83259] transition-colors whitespace-nowrap text-[#B83259]"
            >
              Custom Couture
            </button>
            <a
              href="#about-section"
              className="hover:text-[#B83259] transition-colors whitespace-nowrap"
            >
              About CFC
            </a>
            <a
              href="#contact-section"
              className="hover:text-[#B83259] transition-colors whitespace-nowrap"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search Input / Toggle */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center bg-white border border-stone-300 rounded-full pl-3 pr-2 py-1 shadow-sm w-44 sm:w-60">
                  <Search className="w-4 h-4 text-stone-400 shrink-0 mr-1.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search styles, sizes..."
                    className="w-full text-xs text-stone-800 bg-transparent focus:outline-none"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      onSearchChange('');
                    }}
                    className="p-1 text-stone-400 hover:text-stone-700"
                    aria-label="Close search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-stone-700 hover:text-[#B83259] transition-colors"
                  aria-label="Open search bar"
                  title="Search products"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Shopping Bag Icon with Count */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-stone-800 hover:text-[#B83259] transition-colors focus:outline-none"
              aria-label="View Shopping Bag"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#B83259] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Account / Sign In Button */}
            <button
              onClick={onOpenAuthModal}
              className={`p-2 rounded-full transition-all focus:outline-none flex items-center gap-1.5 ${
                currentUser
                  ? 'text-[#B83259] bg-[#FCE7EC] hover:bg-[#F9D5DF]'
                  : 'text-stone-700 hover:text-[#B83259]'
              }`}
              aria-label="User Account"
              title={currentUser ? `Account: ${currentUser.displayName || currentUser.email}` : 'Sign In'}
            >
              <UserIcon className="w-5 h-5" />
              {isAdmin && (
                <span className="hidden xl:inline text-[10px] font-bold text-[#C5A059] uppercase tracking-wider">
                  Admin
                </span>
              )}
            </button>

            {/* WhatsApp CTA Button */}
            <a
              href={buildWhatsAppUrl('Hello CFC, I would like to browse your catalog and order.')}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider text-white bg-[#B83259] hover:bg-[#982446] rounded-md transition-all shadow-sm whitespace-nowrap uppercase"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Order</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 lg:hidden text-stone-700 hover:text-[#B83259] transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#FCFBF7] border-b border-stone-200 px-6 py-5 space-y-4 shadow-lg animate-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-3 text-sm font-medium">
              <button
                onClick={() => handleNavClick('all', 'shop-section')}
                className="text-left py-1 text-stone-800 hover:text-[#B83259]"
              >
                All Collections
              </button>
              <button
                onClick={() => handleNavClick('african-wear', 'shop-section')}
                className="text-left py-1 text-stone-800 hover:text-[#B83259] font-medium flex items-center gap-1.5"
              >
                <span className="text-[#C5A059]">✦</span>
                <span>African Wear &amp; Kwanjula</span>
              </button>
              <button
                onClick={() => handleNavClick('women', 'shop-section')}
                className="text-left py-1 text-stone-800 hover:text-[#B83259]"
              >
                Women's Fashion
              </button>
              <button
                onClick={() => handleNavClick('men', 'shop-section')}
                className="text-left py-1 text-stone-800 hover:text-[#B83259]"
              >
                Men's Wear
              </button>
              <button
                onClick={() => handleNavClick('kids', 'shop-section')}
                className="text-left py-1 text-stone-800 hover:text-[#B83259]"
              >
                Children's Collection
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenCustomCouture();
                  const el = document.getElementById('custom-couture-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-left py-1 text-[#B83259] font-semibold"
              >
                ✨ Custom Couture &amp; Tailoring
              </button>
              <a
                href="#about-section"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-1 text-stone-700 hover:text-[#B83259]"
              >
                About CFC Story
              </a>
              <a
                href="#contact-section"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-1 text-stone-700 hover:text-[#B83259]"
              >
                Contact &amp; Location
              </a>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAuthModal();
                }}
                className="text-left py-1 text-stone-800 hover:text-[#B83259] flex items-center gap-2"
              >
                <UserIcon className="w-4 h-4 text-[#B83259]" />
                <span>{currentUser ? `Account (${currentUser.displayName || 'Client'})` : 'Sign In / Account'}</span>
              </button>
            </div>

            <div className="pt-4 border-t border-stone-200 flex flex-col gap-2">
              <a
                href={buildWhatsAppUrl('Hello CFC, I would like to inquire about fashion pieces.')}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold text-white bg-[#B83259] rounded-md tracking-wider uppercase"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>
              <p className="text-center text-[11px] text-stone-600">
                Primary WhatsApp: {BRAND_CONFIG.whatsappDisplay}
              </p>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
