import React, { useState } from 'react';
import { Sparkles, MessageCircle, Scissors, Calendar, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ProductCategory } from '../types';
import { OCCASION_LIST } from '../data/products';
import { generateCustomInquiryWhatsAppUrl } from '../config/brand';
import { useAuth } from '../firebase/AuthContext';
import { createCustomInquiry } from '../firebase/firestoreService';

export const CustomDesignSection: React.FC = () => {
  const { currentUser, userProfile } = useAuth();
  const [formData, setFormData] = useState({
    fullName: userProfile?.displayName || currentUser?.displayName || '',
    whatsappPhone: userProfile?.phone || '',
    category: 'african-wear' as ProductCategory | 'african-wear',
    outfitType: '',
    preferredColor: '',
    measurementsOrSize: '',
    occasion: 'Wedding / Groom / Bridal',
    desiredDate: '',
    budgetRangeUGX: '',
    additionalNotes: '',
    referenceImageNotes: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setValidationError('Please provide your name so we can address you personally.');
      return;
    }
    if (!formData.outfitType.trim()) {
      setValidationError('Please specify the type of outfit you would like us to create.');
      return;
    }

    setValidationError('');
    setFormSubmitted(true);

    try {
      await createCustomInquiry({
        userId: currentUser ? currentUser.uid : 'guest',
        fullName: formData.fullName.trim(),
        whatsappPhone: formData.whatsappPhone.trim(),
        category: formData.category,
        outfitType: formData.outfitType.trim(),
        preferredColor: formData.preferredColor.trim(),
        measurementsOrSize: formData.measurementsOrSize.trim(),
        occasion: formData.occasion,
        desiredDate: formData.desiredDate,
        budgetRangeUGX: formData.budgetRangeUGX.trim(),
        additionalNotes: `${formData.additionalNotes} ${
          formData.referenceImageNotes
            ? `[Reference style notes: ${formData.referenceImageNotes}]`
            : ''
        }`.trim(),
      });
    } catch (err) {
      console.warn('Failed to save custom inquiry to Firestore', err);
    }

    const whatsappUrl = generateCustomInquiryWhatsAppUrl({
      fullName: formData.fullName,
      whatsappPhone: formData.whatsappPhone,
      category: formData.category,
      outfitType: formData.outfitType,
      preferredColor: formData.preferredColor,
      measurementsOrSize: formData.measurementsOrSize,
      occasion: formData.occasion,
      desiredDate: formData.desiredDate,
      budgetRangeUGX: formData.budgetRangeUGX,
      additionalNotes: `${formData.additionalNotes} ${
        formData.referenceImageNotes
          ? `[Reference style notes: ${formData.referenceImageNotes}]`
          : ''
      }`.trim(),
    });

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="custom-couture-section" className="py-16 sm:py-24 bg-[#FAF7F2] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#B83259] mb-2">
            <Scissors className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>CFC Atelier Bespoke Services</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Design Your Dream Outfit
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            Have a unique silhouette in mind, need custom African print coordination for an
            introduction ceremony, or desire an exclusive made-to-measure gown? Share your vision
            with Christine and our master tailors.
          </p>
        </div>

        {/* 2-Column Split: Inspiration & Process on Left, Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Atelier Craftsmanship & Steps */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-lg overflow-hidden shadow-lg aspect-[4/3] bg-stone-100 border border-stone-200">
              <img
                src="/src/assets/images/couture_atelier_craft_1792583040058.jpg"
                alt="Bespoke tailoring and artisanal stitching at CFC Christine Fashion Couture"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#E5C883]">
                  Kampala Tailoring Studio
                </span>
                <p className="font-serif text-lg font-bold">Every Stitch Tailored to Perfection</p>
              </div>
            </div>

            {/* Custom Couture Offerings */}
            <div className="bg-white p-6 rounded-lg border border-stone-200/90 shadow-xs space-y-4">
              <h3 className="font-serif text-base font-bold text-stone-900">
                Our Bespoke Specializations:
              </h3>
              <div className="space-y-3 text-xs sm:text-sm text-stone-700">
                <div className="flex items-start gap-2.5">
                  <span className="text-[#B83259] font-bold">01.</span>
                  <div>
                    <strong className="text-stone-900">Women&apos;s Haute Couture:</strong> Wedding
                    dresses, Kwanjula traditional gomesi &amp; modern kitenge, red-carpet gowns, and
                    executive office chic.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-[#B83259] font-bold">02.</span>
                  <div>
                    <strong className="text-stone-900">Men&apos;s Casual &amp; Everyday Wear:</strong> Custom
                    African Kitenge casual shirts, ordinary everyday linen wear, relaxed trousers, and embroidered senator tunics.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-[#B83259] font-bold">03.</span>
                  <div>
                    <strong className="text-stone-900">Children&apos;s Milestone Fashion:</strong> First
                    communion, birthday gowns, matching sibling ceremony sets, and infant baptism wear.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-[#B83259] font-bold">04.</span>
                  <div>
                    <strong className="text-stone-900">African Contemporary Fusion:</strong> High-end
                    styling integrating luxury silk with authentic East and West African prints.
                  </div>
                </div>
              </div>
            </div>

            {/* Guarantee / Notice Card */}
            <div className="p-4 bg-[#FCFBF7] rounded-lg border border-[#C5A059]/40 text-xs text-stone-600 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block mb-0.5">Custom Order Policy:</strong>
                Submitting this inquiry prepares your specifications for direct review on WhatsApp.
                Final pricing, fabric selection, fittings, and delivery schedules will be confirmed
                personally with CFC before work begins.
              </div>
            </div>
          </div>

          {/* Right Column: Functional Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-md">
            <div className="mb-6">
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Bespoke Design Inquiry Form
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Fill out the details below. Clicking submit will automatically generate a WhatsApp
                inquiry for Christine and the CFC team.
              </p>
            </div>

            {validationError && (
              <div className="mb-5 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md">
                {validationError}
              </div>
            )}

            {formSubmitted && (
              <div className="mb-5 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-md flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  WhatsApp opened with your custom inquiry! You can also refine any details in the chat.
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1"
                  >
                    Your Name <span className="text-[#B83259]">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Christine Nakato"
                    className="w-full text-xs px-3 py-2.5 bg-stone-50 border border-stone-300 rounded focus:bg-white focus:outline-none focus:border-[#B83259]"
                  />
                </div>

                {/* WhatsApp Phone */}
                <div>
                  <label
                    htmlFor="whatsappPhone"
                    className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1"
                  >
                    WhatsApp Phone Number
                  </label>
                  <input
                    id="whatsappPhone"
                    type="tel"
                    value={formData.whatsappPhone}
                    onChange={(e) => setFormData({ ...formData, whatsappPhone: e.target.value })}
                    placeholder="e.g. 0772 963 428 or +256..."
                    className="w-full text-xs px-3 py-2.5 bg-stone-50 border border-stone-300 rounded focus:bg-white focus:outline-none focus:border-[#B83259]"
                  />
                </div>
              </div>

              {/* Department / Category */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                  Clothing Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'african-wear', label: '✦ African & Kwanjula' },
                    { id: 'women', label: "Women's Couture" },
                    { id: 'men', label: "Men's Sartorial" },
                    { id: 'kids', label: "Kids' Occasion" },
                  ].map((cat) => (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          category: cat.id as any,
                          occasion:
                            cat.id === 'african-wear'
                              ? 'Introduction (Kwanjula) & Traditional Ceremonies'
                              : formData.occasion,
                        })
                      }
                      className={`py-2 px-2 text-xs font-semibold uppercase tracking-wider rounded border transition-colors ${
                        formData.category === cat.id
                          ? 'bg-[#B83259] text-white border-[#B83259] shadow-xs'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Outfit Suggestions for African Wear */}
              {formData.category === 'african-wear' && (
                <div className="p-3 bg-[#FAF4E8] rounded-md border border-[#C5A059]/40 space-y-1.5">
                  <span className="text-[11px] font-semibold text-[#856524] uppercase tracking-wider block">
                    ✦ Popular Ugandan &amp; African Styles (Click to Select):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      'Nalubaale Royal Kwanjula Gomesi with Satin Sash',
                      'Ankole Mushanana with Gold Chiffon Drape',
                      'Ceremonial Kanzu with Embroidered Neckline & Vest',
                      'Oshun 3-Piece Grand Embroidered Agbada',
                      'Modern Kitenge Peplum & Skirt Set',
                      'Little Royals Children Kwanjula Matching Attire',
                      'Couple / Entourage Kwanjula Matching Kitenge Set',
                    ].map((styleName) => (
                      <button
                        type="button"
                        key={styleName}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            outfitType: styleName,
                          })
                        }
                        className={`text-[11px] px-2.5 py-1 rounded transition-colors ${
                          formData.outfitType === styleName
                            ? 'bg-[#B83259] text-white font-medium'
                            : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                        }`}
                      >
                        {styleName}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Outfit Type */}
                <div>
                  <label
                    htmlFor="outfitType"
                    className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1"
                  >
                    Type of Outfit <span className="text-[#B83259]">*</span>
                  </label>
                  <input
                    id="outfitType"
                    type="text"
                    required
                    value={formData.outfitType}
                    onChange={(e) => setFormData({ ...formData, outfitType: e.target.value })}
                    placeholder={
                      formData.category === 'african-wear'
                        ? 'e.g. Kwanjula Gomesi, Mushanana, or Kanzu'
                        : 'e.g. Evening gown, Casual Kitenge shirt, Ordinary daily linen set'
                    }
                    className="w-full text-xs px-3 py-2.5 bg-stone-50 border border-stone-300 rounded focus:bg-white focus:outline-none focus:border-[#B83259]"
                  />
                </div>

                {/* Preferred Color */}
                <div>
                  <label
                    htmlFor="preferredColor"
                    className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1"
                  >
                    Preferred Colour &amp; Palette
                  </label>
                  <input
                    id="preferredColor"
                    type="text"
                    value={formData.preferredColor}
                    onChange={(e) => setFormData({ ...formData, preferredColor: e.target.value })}
                    placeholder="e.g. Blush Pink &amp; Gold, Ivory, Royal Navy"
                    className="w-full text-xs px-3 py-2.5 bg-stone-50 border border-stone-300 rounded focus:bg-white focus:outline-none focus:border-[#B83259]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Size or Measurements */}
                <div>
                  <label
                    htmlFor="measurements"
                    className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1"
                  >
                    Size / Approximate Measurements
                  </label>
                  <input
                    id="measurements"
                    type="text"
                    value={formData.measurementsOrSize}
                    onChange={(e) =>
                      setFormData({ ...formData, measurementsOrSize: e.target.value })
                    }
                    placeholder="e.g. UK 12, or 'Need studio fitting in Kampala'"
                    className="w-full text-xs px-3 py-2.5 bg-stone-50 border border-stone-300 rounded focus:bg-white focus:outline-none focus:border-[#B83259]"
                  />
                </div>

                {/* Occasion / Event */}
                <div>
                  <label
                    htmlFor="occasion"
                    className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1"
                  >
                    Event or Occasion
                  </label>
                  <select
                    id="occasion"
                    value={formData.occasion}
                    onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 bg-stone-50 border border-stone-300 rounded focus:bg-white focus:outline-none focus:border-[#B83259]"
                  >
                    {OCCASION_LIST.map((occ) => (
                      <option key={occ} value={occ}>
                        {occ}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Desired Date */}
                <div>
                  <label
                    htmlFor="desiredDate"
                    className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1 flex items-center gap-1"
                  >
                    <Calendar className="w-3 h-3 text-[#C5A059]" />
                    <span>Needed By (Date)</span>
                  </label>
                  <input
                    id="desiredDate"
                    type="date"
                    value={formData.desiredDate}
                    onChange={(e) => setFormData({ ...formData, desiredDate: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 bg-stone-50 border border-stone-300 rounded focus:bg-white focus:outline-none focus:border-[#B83259]"
                  />
                </div>

                {/* Budget Range (in UGX) */}
                <div>
                  <label
                    htmlFor="budget"
                    className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1"
                  >
                    Budget Range in UGX
                  </label>
                  <input
                    id="budget"
                    type="text"
                    value={formData.budgetRangeUGX}
                    onChange={(e) => setFormData({ ...formData, budgetRangeUGX: e.target.value })}
                    placeholder="e.g. 350,000 – 600,000 UGX"
                    className="w-full text-xs px-3 py-2.5 bg-stone-50 border border-stone-300 rounded focus:bg-white focus:outline-none focus:border-[#B83259]"
                  />
                </div>
              </div>

              {/* Reference Image / Style Notes */}
              <div>
                <label
                  htmlFor="refNotes"
                  className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1"
                >
                  Reference Image or Inspiration Link
                </label>
                <input
                  id="refNotes"
                  type="text"
                  value={formData.referenceImageNotes}
                  onChange={(e) =>
                    setFormData({ ...formData, referenceImageNotes: e.target.value })
                  }
                  placeholder="Paste Instagram / Pinterest link or describe a photo to send on WhatsApp"
                  className="w-full text-xs px-3 py-2.5 bg-stone-50 border border-stone-300 rounded focus:bg-white focus:outline-none focus:border-[#B83259]"
                />
              </div>

              {/* Additional Instructions */}
              <div>
                <label
                  htmlFor="instructions"
                  className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1"
                >
                  Additional Custom Instructions / Fabric Preferences
                </label>
                <textarea
                  id="instructions"
                  rows={3}
                  value={formData.additionalNotes}
                  onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                  placeholder="Tell us about sleeve preferences, neckline, fabric type (silk, crepe, kitenge, linen), or specific design requirements..."
                  className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-300 rounded focus:bg-white focus:outline-none focus:border-[#B83259]"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 px-6 text-xs font-semibold uppercase tracking-wider text-white bg-[#B83259] hover:bg-[#982446] rounded-md transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Custom Inquiry via WhatsApp</span>
                </button>
                <p className="text-[11px] text-stone-500 text-center mt-2">
                  No payment is processed now. We will respond directly on WhatsApp to finalize your
                  consultation.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
