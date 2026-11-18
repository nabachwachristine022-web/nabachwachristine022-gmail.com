export type ProductCategory = 'women' | 'men' | 'kids';

export type ProductSubcategory =
  | 'dresses-gowns'
  | 'evening-wear'
  | 'office-chic'
  | 'two-piece'
  | 'traditional-african'
  | 'kitenge-couture'
  | 'gomesi-traditional'
  | 'mushanana-ceremonial'
  | 'kanzu-ceremonial'
  | 'agbada-grand'
  | 'african-kaftan'
  | 'wedding-guest'
  | 'casual-chic'
  | 'casual-wear'
  | 'ordinary-wear'
  | 'formal-shirts'
  | 'trousers'
  | 'smart-casual'
  | 'girls-dresses'
  | 'kids-casual-wear'
  | 'kids-african-traditional'
  | 'birthday-party'
  | 'baby-clothing';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  subcategory: ProductSubcategory;
  priceUGX: number;
  originalPriceUGX?: number;
  description: string;
  details: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  image: string;
  secondaryImage?: string;
  isReadyMade: boolean;
  isCustomCouture: boolean;
  isAfricanWear?: boolean;
  isNewArrival?: boolean;
  isTrending?: boolean;
  isFeatured?: boolean;
  isCustomerFavourite?: boolean;
  stockStatus: 'in-stock' | 'made-to-order' | 'low-stock';
  tags: string[];
  designerName?: string;
  isCustomAddition?: boolean;
  addedAt?: string;
}

export interface CartItem {
  id: string; // unique cart item id (e.g. `${product.id}-${selectedSize}-${selectedColor}`)
  productId: string;
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface CustomDesignInquiry {
  fullName: string;
  whatsappPhone: string;
  category: ProductCategory | 'african-wear';
  outfitType: string;
  preferredColor: string;
  measurementsOrSize: string;
  occasion: string;
  desiredDate: string;
  budgetRangeUGX: string;
  additionalNotes: string;
  referenceImageNotes?: string;
}
