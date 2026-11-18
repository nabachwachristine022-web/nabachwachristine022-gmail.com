import React, { useState } from 'react';
import { MessageCircle, Eye, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { formatUGX, generateProductOrderWhatsAppUrl } from '../config/brand';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onQuickOrderWhatsApp?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const [imageError, setImageError] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || '');

  const whatsappUrl = generateProductOrderWhatsAppUrl(
    product.name,
    product.priceUGX,
    selectedSize,
    selectedColor
  );

  return (
    <div className="group flex flex-col bg-white border border-stone-200/80 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md hover:border-stone-300">
      {/* Product Image Slot with 3:4 Aspect Ratio */}
      <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500 ease-out"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#F8F6F0] p-6 text-center">
            <Sparkles className="w-8 h-8 text-[#C5A059] mb-2" />
            <p className="font-serif text-sm font-semibold text-stone-800">{product.name}</p>
            <p className="text-xs text-stone-500 mt-1">CFC Atelier Sample</p>
          </div>
        )}

        {/* Quick View Button on Image Hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
          <button
            onClick={() => onViewDetails(product)}
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-stone-900 bg-white/95 hover:bg-white rounded shadow-md transform translate-y-2 group-hover:translate-y-0 transition-all flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Details</span>
          </button>
        </div>

        {/* Editorial Stock & African Wear Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
          {product.isAfricanWear && (
            <span className="bg-[#FAF4E8]/95 backdrop-blur-xs text-[#856524] border border-[#C5A059]/40 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded">
              ✦ African Wear
            </span>
          )}
          <span className="bg-white/90 backdrop-blur-xs px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-stone-800 rounded">
            {product.isCustomCouture && !product.isReadyMade
              ? 'Bespoke Order'
              : product.stockStatus === 'low-stock'
              ? 'Limited Pieces'
              : product.stockStatus === 'made-to-order'
              ? 'Made to Measure'
              : 'Ready to Wear'}
          </span>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata (Subcategory & Code) */}
          <div className="flex items-center gap-2 text-[11px] text-stone-500 mb-1">
            <span className="capitalize">{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.tags[0] || 'Couture'}</span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onViewDetails(product)}
            className="font-serif text-base sm:text-lg font-bold text-stone-900 hover:text-[#B83259] transition-colors cursor-pointer line-clamp-1"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Price (Tabular Numerals) */}
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-mono tabular-nums text-sm sm:text-base font-bold text-stone-900">
              {formatUGX(product.priceUGX)}
            </span>
            {product.originalPriceUGX && (
              <span className="font-mono tabular-nums text-xs text-stone-400 line-through">
                {formatUGX(product.originalPriceUGX)}
              </span>
            )}
          </div>

          <p className="mt-2 text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Sizes & Colors Preview */}
          <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
            {/* Size selector dropdown or quick chips */}
            <div className="flex items-center gap-1">
              <span className="text-[11px] text-stone-600">Size:</span>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="text-[11px] font-medium text-stone-800 bg-stone-50 border border-stone-200 rounded px-1.5 py-0.5 focus:outline-none focus:border-[#B83259]"
                aria-label={`Select size for ${product.name}`}
              >
                {product.sizes.map((sz) => (
                  <option key={sz} value={sz}>
                    {sz}
                  </option>
                ))}
              </select>
            </div>

            {/* Colors Preview */}
            {product.colors.length > 0 && (
              <div className="flex items-center gap-1.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`w-3.5 h-3.5 rounded-full border ${
                      selectedColor === c.name ? 'ring-1 ring-offset-1 ring-[#B83259]' : 'border-stone-300'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                    aria-label={c.name}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Card Actions (Two clear, working buttons) */}
        <div className="mt-4 pt-3 border-t border-stone-100 grid grid-cols-2 gap-2">
          <button
            onClick={() => onViewDetails(product)}
            className="w-full py-2 px-2 text-center text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded transition-colors whitespace-nowrap"
          >
            Details
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full py-2 px-2 text-center text-xs font-semibold text-white bg-[#B83259] hover:bg-[#982446] rounded transition-colors flex items-center justify-center gap-1 whitespace-nowrap shadow-xs"
            title="Order this product directly on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
