import React, { useState, useEffect } from 'react';
import { X, MessageCircle, ShoppingBag, Check, ShieldCheck, Sparkles, Scissors } from 'lucide-react';
import { Product } from '../types';
import { formatUGX, generateProductOrderWhatsAppUrl, BRAND_CONFIG } from '../config/brand';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImage, setActiveImage] = useState<string>('');
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || '');
      setSelectedColor(product.colors[0]?.name || '');
      setActiveImage(product.image);
      setQuantity(1);
      setIsAdded(false);
    }
  }, [product]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const handleAddToCartClick = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const whatsappUrl = generateProductOrderWhatsAppUrl(
    product.name,
    product.priceUGX,
    selectedSize,
    selectedColor
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-[#FCFBF7] rounded-xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-stone-600 hover:text-stone-900 hover:bg-white shadow-xs transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Left Column: Gallery & Images */}
          <div className="md:col-span-6 bg-stone-100 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-200">
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-white shadow-xs">
              <img
                src={activeImage || product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                {product.isAfricanWear && (
                  <span className="bg-[#FAF4E8]/95 backdrop-blur-xs text-[#856524] border border-[#C5A059]/40 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded">
                    ✦ African Heritage Couture
                  </span>
                )}
                <span className="bg-white/90 backdrop-blur-xs px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-stone-800 rounded">
                  {product.category.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Thumbnail switcher if secondary image exists */}
            {product.secondaryImage && (
              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={() => setActiveImage(product.image)}
                  className={`w-16 h-20 rounded overflow-hidden border-2 transition-all ${
                    activeImage === product.image ? 'border-[#B83259]' : 'border-transparent opacity-70'
                  }`}
                >
                  <img
                    src={product.image}
                    alt={`${product.name} front view`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
                <button
                  onClick={() => setActiveImage(product.secondaryImage!)}
                  className={`w-16 h-20 rounded overflow-hidden border-2 transition-all ${
                    activeImage === product.secondaryImage
                      ? 'border-[#B83259]'
                      : 'border-transparent opacity-70'
                  }`}
                >
                  <img
                    src={product.secondaryImage}
                    alt={`${product.name} editorial view`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-stone-200/80 text-[11px] text-stone-500 flex items-center justify-between">
              <span>Handcrafted in Uganda</span>
              <span>Atelier Ref: #{product.id}</span>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between bg-white">
            <div>
              {/* Quiet Kicker */}
              <div className="flex items-center gap-2 text-xs text-stone-500 uppercase tracking-widest mb-1.5 font-medium flex-wrap">
                {product.isAfricanWear && (
                  <span className="text-[#856524] bg-[#FAF4E8] border border-[#C5A059]/40 px-2 py-0.5 rounded text-[10px] font-bold">
                    ✦ African Heritage
                  </span>
                )}
                <span>{product.category}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#C5A059]">{product.tags.slice(0, 2).join(' · ')}</span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight leading-snug">
                {product.name}
              </h2>

              {/* Price in UGX */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="font-mono tabular-nums text-2xl font-bold text-stone-900">
                  {formatUGX(product.priceUGX)}
                </span>
                {product.originalPriceUGX && (
                  <span className="font-mono tabular-nums text-sm text-stone-400 line-through">
                    {formatUGX(product.originalPriceUGX)}
                  </span>
                )}
                <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {product.stockStatus === 'in-stock'
                    ? 'Available in Studio'
                    : 'Tailored on Order'}
                </span>
              </div>

              {/* Description */}
              <p className="mt-4 text-xs sm:text-sm text-stone-600 leading-relaxed">
                {product.description}
              </p>

              {/* Craftsmanship Details */}
              <div className="mt-4 pt-4 border-t border-stone-100">
                <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Scissors className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Garment Specifications</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-stone-600">
                  {product.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#B83259] mt-0.5">✦</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Interactive Size Selector */}
              <div className="mt-5 pt-4 border-t border-stone-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-800">
                    Select Size:
                  </span>
                  <span className="text-[11px] text-stone-500">Need custom fit? Choose &lsquo;Custom Fit&rsquo;</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3 py-1.5 text-xs rounded transition-all font-medium ${
                        selectedSize === sz
                          ? 'bg-[#B83259] text-white shadow-xs'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Color Swatches */}
              {product.colors.length > 0 && (
                <div className="mt-4">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-stone-800 mb-2">
                    Colour Palette: <strong className="text-stone-900 font-medium normal-case">{selectedColor}</strong>
                  </span>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full border transition-all ${
                          selectedColor === c.name
                            ? 'border-[#B83259] bg-[#FCE7EC]/50 font-medium'
                            : 'border-stone-200 bg-white hover:bg-stone-50'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-stone-300"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span className="text-stone-700">{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper */}
              <div className="mt-4 flex items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-800">
                  Quantity:
                </span>
                <div className="flex items-center border border-stone-300 rounded bg-stone-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2.5 py-1 text-xs text-stone-600 hover:text-stone-900 font-bold"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-mono font-semibold text-stone-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2.5 py-1 text-xs text-stone-600 hover:text-stone-900 font-bold"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons & WhatsApp Ordering */}
            <div className="mt-6 pt-5 border-t border-stone-200 space-y-2.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  onClick={handleAddToCartClick}
                  className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-md transition-all flex items-center justify-center gap-2"
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#B83259] hover:bg-[#982446] rounded-md transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order on WhatsApp</span>
                </a>
              </div>

              {/* Trust Disclaimer */}
              <div className="flex items-start gap-2 text-[11px] text-stone-500 bg-[#FCFBF7] p-2.5 rounded border border-stone-200/80">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                <p>
                  Orders sent via WhatsApp are verified directly by Christine and the CFC team.
                  We verify final measurements, fabric drape, and Kampala delivery options before
                  payment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
