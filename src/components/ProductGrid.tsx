import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { ProductCard } from './ProductCard';
import { OCCASION_LIST } from '../data/products';

export type GridCategory = ProductCategory | 'all' | 'african-wear';

interface ProductGridProps {
  products: Product[];
  activeCategory: GridCategory;
  onCategoryChange: (cat: GridCategory) => void;
  searchQuery: string;
  onClearSearch: () => void;
  onViewProductDetails: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  activeCategory,
  onCategoryChange,
  searchQuery,
  onClearSearch,
  onViewProductDetails,
}) => {
  // Filter States
  const [filterType, setFilterType] = useState<'all' | 'ready-to-wear' | 'custom-couture'>('all');
  const [africanSubFilter, setAfricanSubFilter] = useState<'all' | 'women' | 'men' | 'kids'>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Extract all available tags for the current category
  const availableTags = useMemo(() => {
    const tagsSet = new Set<string>();
    products
      .filter((p) => {
        if (activeCategory === 'african-wear') {
          if (africanSubFilter !== 'all' && p.category !== africanSubFilter) return false;
          return p.isAfricanWear || p.subcategory === 'traditional-african';
        }
        return activeCategory === 'all' || p.category === activeCategory;
      })
      .forEach((p) => p.tags.forEach((t) => tagsSet.add(t)));
    return ['all', ...Array.from(tagsSet)];
  }, [products, activeCategory, africanSubFilter]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category Filter
        if (activeCategory === 'african-wear') {
          if (!product.isAfricanWear && product.subcategory !== 'traditional-african') {
            return false;
          }
          if (africanSubFilter !== 'all' && product.category !== africanSubFilter) {
            return false;
          }
        } else if (activeCategory !== 'all' && product.category !== activeCategory) {
          return false;
        }

        // Ready-to-wear vs Custom
        if (filterType === 'ready-to-wear' && !product.isReadyMade) {
          return false;
        }
        if (filterType === 'custom-couture' && !product.isCustomCouture) {
          return false;
        }

        // Tag Filter
        if (selectedTag !== 'all' && !product.tags.includes(selectedTag)) {
          return false;
        }

        // Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(q);
          const matchDesc = product.description.toLowerCase().includes(q);
          const matchCategory = product.category.toLowerCase().includes(q);
          const matchTags = product.tags.some((t) => t.toLowerCase().includes(q));
          if (!matchName && !matchDesc && !matchCategory && !matchTags) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.priceUGX - b.priceUGX;
        if (sortBy === 'price-desc') return b.priceUGX - a.priceUGX;
        if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, activeCategory, filterType, selectedTag, searchQuery, sortBy]);

  const handleResetFilters = () => {
    onCategoryChange('all');
    setFilterType('all');
    setAfricanSubFilter('all');
    setSelectedTag('all');
    setSortBy('featured');
    onClearSearch();
  };

  return (
    <section id="shop-section" className="py-12 sm:py-16 bg-[#FAF8F5] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B83259] mb-1">
              <span>CFC Ready-to-Wear &amp; Bespoke</span>
              <span aria-hidden="true">·</span>
              <span>Ugandan Shillings (UGX)</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              {activeCategory === 'african-wear'
                ? 'Ugandan & African Heritage Collection'
                : activeCategory === 'women'
                ? "Women's Couture Collection"
                : activeCategory === 'men'
                ? "Men's Casual & Ordinary Wear Collection"
                : activeCategory === 'kids'
                ? "Children's Celebration Collection"
                : 'All Boutique Collections'}
            </h2>
          </div>

          {/* Demonstration Inventory Badge Notice */}
          <div className="text-xs text-stone-600 bg-white border border-stone-200 px-3 py-1.5 rounded-md max-w-md">
            <span className="font-semibold text-stone-800">Demonstration Catalog: </span>
            Sample UGX pricing shown. Every outfit can be ordered or customized via WhatsApp.
          </div>
        </div>

        {/* Category Selector Tabs & Filter Bar */}
        <div className="bg-white border border-stone-200 rounded-lg p-4 mb-8 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Category Segmented Buttons */}
            <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg overflow-x-auto scrollbar-none">
              {(
                [
                  { id: 'all' as GridCategory, label: 'All Collections' },
                  { id: 'african-wear' as GridCategory, label: '✦ African Wear' },
                  { id: 'women' as GridCategory, label: 'Women' },
                  { id: 'men' as GridCategory, label: 'Men' },
                  { id: 'kids' as GridCategory, label: 'Kids' },
                ] as const
              ).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => onCategoryChange(cat.id)}
                  className={`px-4 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap uppercase tracking-wider ${
                    activeCategory === cat.id
                      ? 'bg-white text-[#B83259] shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Sub-Filters: Ready vs Custom, Sort, Quick Filter Drawer Toggle */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Ready Made vs Bespoke toggle */}
              <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-md text-xs">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                    filterType === 'all'
                      ? 'bg-white font-semibold text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  All Types
                </button>
                <button
                  onClick={() => setFilterType('ready-to-wear')}
                  className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                    filterType === 'ready-to-wear'
                      ? 'bg-white font-semibold text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Ready-to-Wear
                </button>
                <button
                  onClick={() => setFilterType('custom-couture')}
                  className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                    filterType === 'custom-couture'
                      ? 'bg-white font-semibold text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Bespoke Couture
                </button>
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-1 text-xs">
                <span className="text-stone-600 whitespace-nowrap">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-stone-50 border border-stone-200 rounded px-2.5 py-1 text-stone-800 font-medium focus:outline-none focus:border-[#B83259]"
                >
                  <option value="featured">Featured First</option>
                  <option value="newest">New Arrivals</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>

              {/* Tag / Occasion Filter Toggle */}
              <button
                onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold border rounded transition-colors ${
                  selectedTag !== 'all' || isFilterDrawerOpen
                    ? 'border-[#B83259] text-[#B83259] bg-[#FCE7EC]/40'
                    : 'border-stone-200 text-stone-700 bg-white hover:bg-stone-50'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Occasion &amp; Tags</span>
                {selectedTag !== 'all' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B83259]" />
                )}
              </button>

              {/* Active Filter Reset */}
              {(selectedTag !== 'all' || filterType !== 'all' || searchQuery) && (
                <button
                  onClick={handleResetFilters}
                  className="p-1 text-stone-400 hover:text-stone-700 transition-colors"
                  title="Reset all filters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* African Wear Sub-Categories Quick Navigation Strip */}
          {activeCategory === 'african-wear' && (
            <div className="mt-4 pt-3.5 border-t border-stone-200/90 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-semibold text-[#856524] uppercase tracking-wider mr-1 flex items-center gap-1">
                  <span>✦ African Category:</span>
                </span>
                <button
                  onClick={() => setAfricanSubFilter('all')}
                  className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                    africanSubFilter === 'all'
                      ? 'bg-[#B83259] text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  All African Styles ({products.filter((p) => p.isAfricanWear || p.subcategory === 'traditional-african').length})
                </button>
                <button
                  onClick={() => setAfricanSubFilter('women')}
                  className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                    africanSubFilter === 'women'
                      ? 'bg-[#B83259] text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  Women (Gomesi, Mushanana &amp; Kitenge)
                </button>
                <button
                  onClick={() => setAfricanSubFilter('men')}
                  className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                    africanSubFilter === 'men'
                      ? 'bg-[#B83259] text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  Men (Kanzu, Agbada &amp; Senator)
                </button>
                <button
                  onClick={() => setAfricanSubFilter('kids')}
                  className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                    africanSubFilter === 'kids'
                      ? 'bg-[#B83259] text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  Kids Cultural Attire
                </button>
              </div>

              <span className="text-[11px] text-stone-600 bg-[#FAF4E8] border border-[#C5A059]/40 px-2.5 py-1 rounded self-start md:self-auto">
                Ugandan Kwanjula &amp; Pan-African Heritage
              </span>
            </div>
          )}

          {/* Expandable Tags & Occasions Strip */}
          {isFilterDrawerOpen && (
            <div className="mt-4 pt-4 border-t border-stone-100 flex flex-wrap gap-1.5 items-center">
              <span className="text-xs font-semibold text-stone-600 mr-2">Filter by Style:</span>
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 text-xs rounded-md transition-colors ${
                    selectedTag === tag
                      ? 'bg-[#B83259] text-white font-medium'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {tag === 'all' ? 'All Styles' : tag}
                </button>
              ))}
            </div>
          )}

          {/* Active Search Notification */}
          {searchQuery && (
            <div className="mt-3 text-xs text-stone-600 flex items-center justify-between bg-stone-50 p-2 rounded">
              <span>
                Showing results for &ldquo;<strong>{searchQuery}</strong>&rdquo;
              </span>
              <button
                onClick={onClearSearch}
                className="text-[#B83259] hover:underline font-medium"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        {/* Product Grid (Responsive: 1-col mobile, 2-col tablet, 3-col desktop) */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={onViewProductDetails}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-stone-200 rounded-lg p-12 text-center max-w-lg mx-auto">
            <Filter className="w-10 h-10 text-stone-400 mx-auto mb-3" />
            <h3 className="font-serif text-lg font-bold text-stone-900 mb-1">
              No matching pieces found
            </h3>
            <p className="text-xs text-stone-500 mb-5 leading-relaxed">
              We couldn&apos;t find any items matching your selected criteria. Try adjusting your
              search or filter settings.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#B83259] hover:bg-[#982446] rounded transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
