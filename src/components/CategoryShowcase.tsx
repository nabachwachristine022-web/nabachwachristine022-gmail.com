import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ProductCategory } from '../types';

interface CategoryShowcaseProps {
  onSelectCategory: (category: ProductCategory | 'african-wear') => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({ onSelectCategory }) => {
  const scrollToShop = (category: ProductCategory | 'african-wear') => {
    onSelectCategory(category);
    const el = document.getElementById('shop-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const categories = [
    {
      id: 'african-wear' as const,
      title: 'African & Kwanjula',
      subtitle: 'Ugandan Gomesi · Kanzu · Agbada',
      image: '/src/assets/images/african_gomesi_kwanjula_1792588407270.jpg',
      description:
        'Authentic Ugandan introduction Gomesi with satin sashes, ceremonial embroidered Kanzu tunics, and regal Agbada.',
      actionText: 'Explore African Wear',
      highlight: true,
    },
    {
      id: 'women' as const,
      title: "Women's Couture",
      subtitle: 'Evening Gowns · Reception · Office',
      image: '/src/assets/images/women_couture_gown_1792583037924.jpg',
      description:
        'Sculpted silhouettes, hand-draped evening dresses, contemporary wax ensembles, and refined executive tailoring.',
      actionText: "Explore Women's Wear",
      highlight: false,
    },
    {
      id: 'men' as const,
      title: "Men's Casual & Everyday",
      subtitle: 'Casual Wear · Ordinary Wears · Tunics',
      image: '/src/assets/images/men_casual_wear_1792670193285.jpg',
      description:
        'Relaxed African Kitenge casual shirts, breezy ordinary linen daily wear, comfortable chinos, and tailored tunics.',
      actionText: "Explore Men's Wear",
      highlight: false,
    },
    {
      id: 'kids' as const,
      title: "Children's Wear",
      subtitle: 'Casual Sets · Party Dresses · Cultural',
      image: '/src/assets/images/kids_casual_wear_1792670195474.jpg',
      description:
        'Joyful, beautifully finished celebration gowns, comfortable everyday casual sets, and traditional African wear.',
      actionText: "Explore Kids' Wear",
      highlight: false,
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#FCFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs font-semibold text-[#B83259] tracking-widest uppercase mb-2">
            Curated Collections &amp; Cultural Heritage
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Crafted for Every Generation &amp; Occasion
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Whether preparing for a traditional Kwanjula introduction, a Kampala black-tie gala,
            or outfitting your children for milestone celebrations.
          </p>
        </div>

        {/* 4-Column Pillar Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => scrollToShop(cat.id)}
              className="group cursor-pointer flex flex-col bg-white border border-stone-200/90 rounded-lg overflow-hidden shadow-xs hover:shadow-md transition-all duration-300"
            >
              {/* Image Container with 3:4 Aspect Ratio */}
              <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500 ease-out"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Overlay Text */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs uppercase tracking-widest text-[#E5C883] font-medium mb-1">
                    {cat.subtitle}
                  </p>
                  <h3 className="font-serif text-2xl font-bold tracking-tight text-white mb-1">
                    {cat.title}
                  </h3>
                </div>
              </div>

              {/* Card Footer / Details */}
              <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                  {cat.description}
                </p>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#B83259] group-hover:text-[#831F3C]">
                  <span>{cat.actionText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
