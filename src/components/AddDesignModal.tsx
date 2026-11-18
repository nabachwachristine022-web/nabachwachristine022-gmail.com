import React, { useState } from 'react';
import { X, Upload, Sparkles, Check, Image as ImageIcon, MessageCircle, AlertCircle } from 'lucide-react';
import { Product, ProductCategory, ProductSubcategory } from '../types';
import { createDesignInFirestore, FirestoreDesignRecord } from '../firebase/firestoreService';
import { buildWhatsAppUrl } from '../config/brand';
import { useAuth } from '../firebase/AuthContext';
import { useTheme } from '../context/ThemeContext';

interface AddDesignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDesignAdded: (product: Product) => void;
}

// Curated high-fashion presets for instant 1-click photo selection
const IMAGE_PRESETS = [
  {
    label: 'Kitenge Peplum Mermaid',
    url: '/src/assets/images/kitenge_women_couture_1792589521439.jpg',
    category: 'african-wear',
    subcategory: 'kitenge-couture',
  },
  {
    label: 'Kitenge Couples Ensemble',
    url: '/src/assets/images/kitenge_couples_wear_1792589536453.jpg',
    category: 'african-wear',
    subcategory: 'kitenge-couture',
  },
  {
    label: 'Ankole Mushanana',
    url: '/src/assets/images/ugandan_mushanana_couture_1792589002023.jpg',
    category: 'african-wear',
    subcategory: 'mushanana-ceremonial',
  },
  {
    label: 'Royal Kwanjula Gomesi',
    url: '/src/assets/images/african_gomesi_kwanjula_1792588407270.jpg',
    category: 'african-wear',
    subcategory: 'gomesi-traditional',
  },
  {
    label: 'Ceremonial Kanzu',
    url: '/src/assets/images/ugandan_kanzu_ceremonial_1792588408104.jpg',
    category: 'men',
    subcategory: 'kanzu-ceremonial',
  },
  {
    label: 'Kids Kwanjula Heritage',
    url: '/src/assets/images/kids_african_heritage_1792589017068.jpg',
    category: 'kids',
    subcategory: 'kids-african-traditional',
  },
  {
    label: 'Grand Agbada 3-Piece',
    url: '/src/assets/images/african_agbada_grand_1792588408663.jpg',
    category: 'men',
    subcategory: 'agbada-grand',
  },
  {
    label: 'Rose Evening Gown',
    url: '/src/assets/images/women_couture_gown_1792583037924.jpg',
    category: 'women',
    subcategory: 'dresses-gowns',
  },
];

export const AddDesignModal: React.FC<AddDesignModalProps> = ({
  isOpen,
  onClose,
  onDesignAdded,
}) => {
  const { currentUser } = useAuth();
  const { currentPalette } = useTheme();

  const [name, setName] = useState('');
  const [department, setDepartment] = useState<'african-wear' | ProductCategory>('african-wear');
  const [subcategory, setSubcategory] = useState<ProductSubcategory>('kitenge-couture');
  const [priceUGX, setPriceUGX] = useState<number>(380000);
  const [description, setDescription] = useState('');
  const [keyDetails, setKeyDetails] = useState('');
  const [sizesInput, setSizesInput] = useState('UK 10 (M), UK 12 (L), UK 14 (XL), Custom Made-to-Measure');
  const [fabricType, setFabricType] = useState('Authentic African Kitenge Wax Print');
  const [stockStatus, setStockStatus] = useState<'in-stock' | 'made-to-order'>('in-stock');
  const [designerName, setDesignerName] = useState(currentUser?.displayName || 'Christine Fashion Couture');
  const [imageUrl, setImageUrl] = useState('/src/assets/images/kitenge_women_couture_1792589521439.jpg');
  const [customTagInput, setCustomTagInput] = useState('Kitenge, African Wear, Bespoke Couture, Kwanjula');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        setErrorMsg('Please select an image smaller than 4MB');
        return;
      }
      setErrorMsg('');
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter a design name');
      return;
    }

    if (!imageUrl.trim()) {
      setErrorMsg('Please provide or select a design photograph');
      return;
    }

    setIsSubmitting(true);

    try {
      const designId = `cfc-design-${Date.now().toString(36)}`;
      const detailsList = keyDetails
        .split('\n')
        .map((d) => d.trim())
        .filter(Boolean);

      if (fabricType && !detailsList.some((d) => d.includes(fabricType))) {
        detailsList.unshift(`Fabric: ${fabricType}`);
      }

      const sizesList = sizesInput
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const tagsList = Array.from(
        new Set([
          'African Wear',
          'Kitenge',
          ...customTagInput
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
        ])
      );

      // Determine real category for product interface
      const category: ProductCategory =
        department === 'african-wear' ? 'women' : department;

      const newProduct: Product = {
        id: designId,
        name: name.trim(),
        category,
        subcategory,
        priceUGX: Number(priceUGX) || 350000,
        originalPriceUGX: Math.round((Number(priceUGX) || 350000) * 1.15),
        description:
          description.trim() ||
          `Exquisite ${fabricType} tailored by ${designerName} at Christine Fashion Couture. Available in custom bespoke sizing or ready to wear.`,
        details:
          detailsList.length > 0
            ? detailsList
            : [
                `Fabric: ${fabricType}`,
                'Bespoke tailoring and fittings available in Kampala',
                'Hand-finished seams and premium craftsmanship',
              ],
        sizes: sizesList.length > 0 ? sizesList : ['Standard Size', 'Custom Made-to-Measure'],
        colors: [
          { name: 'Vibrant Multi-Color African Wax', hex: '#C5A059' },
          { name: 'Royal Gold & Emerald', hex: '#0D5C3A' },
        ],
        image: imageUrl,
        isReadyMade: stockStatus === 'in-stock',
        isCustomCouture: true,
        isAfricanWear: department === 'african-wear' || tagsList.includes('African Wear'),
        isNewArrival: true,
        isFeatured: true,
        stockStatus: stockStatus === 'in-stock' ? 'in-stock' : 'made-to-order',
        tags: tagsList,
        designerName: designerName.trim(),
        isCustomAddition: true,
        addedAt: new Date().toISOString(),
      };

      // Save to Firestore & local storage
      const firestoreRecord: FirestoreDesignRecord = {
        id: newProduct.id,
        name: newProduct.name,
        category: department,
        subcategory: newProduct.subcategory,
        priceUGX: newProduct.priceUGX,
        originalPriceUGX: newProduct.originalPriceUGX,
        description: newProduct.description,
        details: newProduct.details,
        sizes: newProduct.sizes,
        colors: newProduct.colors,
        image: newProduct.image,
        isReadyMade: newProduct.isReadyMade,
        isCustomCouture: newProduct.isCustomCouture,
        isAfricanWear: newProduct.isAfricanWear,
        stockStatus: newProduct.stockStatus,
        tags: newProduct.tags,
        designerName: newProduct.designerName || 'Christine Fashion Couture',
        userId: currentUser?.uid,
        createdAt: new Date().toISOString(),
      };

      await createDesignInFirestore(firestoreRecord);

      onDesignAdded(newProduct);
      onClose();
    } catch (err: any) {
      console.error('Failed to add design', err);
      setErrorMsg(err.message || 'Failed to save design. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShareToWhatsApp = () => {
    const text = [
      `*NEW DESIGN PROPOSAL FOR CFC ATELIER*`,
      `• *Design Name:* ${name || 'New Atelier Creation'}`,
      `• *Department:* ${department.toUpperCase()}`,
      `• *Fabric:* ${fabricType}`,
      `• *Estimated Price:* UGX ${(Number(priceUGX) || 0).toLocaleString()}`,
      `• *Tailoring Mode:* ${stockStatus === 'in-stock' ? 'Ready-to-Wear' : 'Made-to-Measure Bespoke'}`,
      `• *Designer / Client:* ${designerName}`,
      description ? `• *Description:* ${description}` : '',
      `\nI would love to have Christine Fashion Couture review and craft this design!`,
    ]
      .filter(Boolean)
      .join('\n');

    window.open(buildWhatsAppUrl(text), '_blank');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-design-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
    >
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 bg-[#FCFBF7] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm"
              style={{ backgroundColor: currentPalette.primary }}
            >
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 id="add-design-title" className="font-serif text-lg sm:text-xl font-bold text-stone-900">
                CFC Atelier Design Studio
              </h2>
              <p className="text-xs text-stone-500">
                Add a new Kitenge, African wear, or haute couture outfit to the catalog
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors"
            aria-label="Close design studio"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Department Selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              Department / Collection
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'african-wear', label: '✦ African & Kitenge' },
                { id: 'women', label: "Women's Couture" },
                { id: 'men', label: "Men's Tailoring" },
                { id: 'kids', label: "Children's Wear" },
              ].map((item) => {
                const isSelected = department === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setDepartment(item.id as any);
                      if (item.id === 'african-wear') {
                        setSubcategory('kitenge-couture');
                        setFabricType('Authentic African Kitenge Wax Print');
                      } else if (item.id === 'men') {
                        setSubcategory('casual-wear');
                        setFabricType('Kitenge Cotton & Breathable Linen');
                      } else if (item.id === 'kids') {
                        setSubcategory('kids-casual-wear');
                        setFabricType('Soft Cotton Kitenge');
                      } else {
                        setSubcategory('dresses-gowns');
                        setFabricType('Silk Satin & Organza');
                      }
                    }}
                    className={`py-2 px-3 text-xs font-medium rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'border-2 text-white font-semibold shadow-xs'
                        : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                    style={{
                      backgroundColor: isSelected ? currentPalette.primary : undefined,
                      borderColor: isSelected ? currentPalette.primary : undefined,
                    }}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Outfit Name & Subcategory */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                Design Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Royal Kitenge Empress Peplum Gown"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#C5A059] bg-[#FCFBF7]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                Outfit Silhouette / Style
              </label>
              <select
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value as ProductSubcategory)}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#C5A059] bg-[#FCFBF7]"
              >
                <option value="kitenge-couture">Kitenge African Wax Couture (Mermaid/Peplum/Midi)</option>
                <option value="gomesi-traditional">Ugandan Gomesi (Kwanjula)</option>
                <option value="mushanana-ceremonial">Western Ugandan Mushanana</option>
                <option value="kanzu-ceremonial">Ugandan Ceremonial Kanzu</option>
                <option value="agbada-grand">Grand 3-Piece Agbada / Kaftan</option>
                <option value="casual-wear">Casual Wear (Kitenge Resort Shirts &amp; Sets)</option>
                <option value="ordinary-wear">Ordinary Wear (Everyday Linen &amp; Trousers)</option>
                <option value="kids-casual-wear">Kids Casual &amp; Everyday Playwear</option>
                <option value="kids-african-traditional">Kids African Heritage / Kitenge</option>
                <option value="dresses-gowns">Haute Couture Evening Gown</option>
                <option value="office-chic">Office &amp; Executive Chic</option>
                <option value="two-piece">Two-Piece Modern Set</option>
              </select>
            </div>
          </div>

          {/* Pricing & Tailoring Mode */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                Price (UGX) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs font-bold text-stone-400">UGX</span>
                <input
                  type="number"
                  min="50000"
                  step="10000"
                  required
                  value={priceUGX}
                  onChange={(e) => setPriceUGX(Number(e.target.value))}
                  className="w-full text-xs sm:text-sm pl-12 pr-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#C5A059] bg-[#FCFBF7]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                Fabric &amp; Pattern
              </label>
              <input
                type="text"
                value={fabricType}
                onChange={(e) => setFabricType(e.target.value)}
                placeholder="e.g. Kitenge African Wax, Silk Damask"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#C5A059] bg-[#FCFBF7]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                Availability Mode
              </label>
              <select
                value={stockStatus}
                onChange={(e) => setStockStatus(e.target.value as any)}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#C5A059] bg-[#FCFBF7]"
              >
                <option value="in-stock">Ready-to-Wear (In Stock)</option>
                <option value="made-to-order">Made-to-Measure (Bespoke)</option>
              </select>
            </div>
          </div>

          {/* Image Selection / Upload */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
              Design Photograph *
            </label>

            {/* Presets grid */}
            <p className="text-[11px] text-stone-500 mb-2">
              Choose from CFC high-fashion atelier photography or upload your own:
            </p>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-3">
              {IMAGE_PRESETS.map((preset, idx) => {
                const isChosen = imageUrl === preset.url;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setImageUrl(preset.url);
                      if (preset.category === 'african-wear') setDepartment('african-wear');
                      setSubcategory(preset.subcategory as any);
                    }}
                    className={`relative rounded-lg overflow-hidden aspect-3/4 border-2 transition-all ${
                      isChosen ? 'ring-2 ring-offset-1 scale-105 shadow-md' : 'border-transparent opacity-75 hover:opacity-100'
                    }`}
                    style={{
                      borderColor: isChosen ? currentPalette.primary : 'transparent',
                    }}
                    title={preset.label}
                  >
                    <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                    {isChosen && (
                      <span
                        className="absolute bottom-1 right-1 w-4 h-4 rounded-full flex items-center justify-center text-white"
                        style={{ backgroundColor: currentPalette.primary }}
                      >
                        <Check className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Custom file or URL input */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
              <div>
                <label className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-stone-300 hover:border-stone-500 bg-stone-50/60 cursor-pointer transition-colors text-xs text-stone-600 font-medium">
                  <Upload className="w-4 h-4 text-stone-500" />
                  <span>Upload from Device</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Or paste image URL (https://...)"
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                />
              </div>
            </div>
          </div>

          {/* Description & Key Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                Design Description
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the silhouette, cultural inspiration, draping, and finish..."
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#C5A059] bg-[#FCFBF7]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                Key Craftsmanship Details (1 per line)
              </label>
              <textarea
                rows={3}
                value={keyDetails}
                onChange={(e) => setKeyDetails(e.target.value)}
                placeholder="Authentic 100% fine cotton Kitenge&#10;Structured boned corset with sweetheart neck&#10;Gold piping and lined interior"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#C5A059] bg-[#FCFBF7]"
              />
            </div>
          </div>

          {/* Sizes & Designer Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                Available Sizes (comma-separated)
              </label>
              <input
                type="text"
                value={sizesInput}
                onChange={(e) => setSizesInput(e.target.value)}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#C5A059] bg-[#FCFBF7]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                Designer / Atelier Name
              </label>
              <input
                type="text"
                value={designerName}
                onChange={(e) => setDesignerName(e.target.value)}
                placeholder="e.g. Christine Fashion Couture"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#C5A059] bg-[#FCFBF7]"
              />
            </div>
          </div>

          {/* Search Tags */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
              Tags &amp; Occasions
            </label>
            <input
              type="text"
              value={customTagInput}
              onChange={(e) => setCustomTagInput(e.target.value)}
              placeholder="e.g. Kitenge, African Wear, Kwanjula, Introduction, Wedding Guest"
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#C5A059] bg-[#FCFBF7]"
            />
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleShareToWhatsApp}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-stone-300 hover:border-emerald-500 text-stone-700 hover:text-emerald-700 transition-colors flex items-center justify-center gap-2 text-xs font-medium"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Discuss Design on WhatsApp</span>
            </button>

            <div className="w-full sm:w-auto flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl text-xs font-medium text-stone-600 hover:bg-stone-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-1/2 sm:w-auto px-6 py-2.5 rounded-xl text-xs font-semibold text-white shadow-md transition-opacity hover:opacity-90 flex items-center justify-center gap-2 disabled:opacity-50"
                style={{ backgroundColor: currentPalette.primary }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Publishing...' : '✦ Add Design to Catalog'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
