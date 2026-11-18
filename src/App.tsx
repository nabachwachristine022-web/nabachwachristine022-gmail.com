import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryShowcase } from './components/CategoryShowcase';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CustomDesignSection } from './components/CustomDesignSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { NotificationToast } from './components/NotificationToast';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { UserAuthModal } from './components/UserAuthModal';
import { AfricanWearSpotlight } from './components/AfricanWearSpotlight';
import { AuthProvider } from './firebase/AuthContext';
import { DEMO_PRODUCTS } from './data/products';
import { Product, ProductCategory, CartItem } from './types';

const CART_STORAGE_KEY = 'cfc_couture_cart_v1';

function MainApp() {
  // Navigation & Category Filtering State
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all' | 'african-wear'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Cart State with LocalStorage Persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Notification Toast State
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  // Sync cart to localStorage whenever updated
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Unable to persist cart to localStorage', e);
    }
  }, [cartItems]);

  const showNotification = (message: string) => {
    setToastMessage(message);
    setIsToastVisible(true);
    setTimeout(() => {
      setIsToastVisible(false);
    }, 3500);
  };

  const handleAddToCart = (
    product: Product,
    size: string,
    color: string,
    quantity: number
  ) => {
    setCartItems((prevItems) => {
      const uniqueId = `${product.id}-${size}-${color}`;
      const existingIndex = prevItems.findIndex((item) => item.id === uniqueId);

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevItems,
          {
            id: uniqueId,
            productId: product.id,
            product,
            selectedSize: size,
            selectedColor: color,
            quantity,
          },
        ];
      }
    });

    showNotification(`Added ${product.name} (${size}) to your bag`);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFBF7] text-stone-900 font-sans selection:bg-[#F9D5DF] selection:text-[#831F3C]">
      {/* Primary Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectCategory={(cat) => setActiveCategory(cat)}
        activeCategory={activeCategory}
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenCustomCouture={() => {
          const el = document.getElementById('custom-couture-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onSelectCategory={(cat) => setActiveCategory(cat)}
          onOpenCustomCouture={() => {
            const el = document.getElementById('custom-couture-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 3 Pillar Category Showcase */}
        <CategoryShowcase onSelectCategory={(cat) => setActiveCategory(cat)} />

        {/* African Wear & Kwanjula Heritage Spotlight */}
        <AfricanWearSpotlight
          onExploreAfricanWear={() => {
            setActiveCategory('african-wear');
            const el = document.getElementById('shop-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenCustomKwanjula={() => {
            const el = document.getElementById('custom-couture-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Interactive Product Grid & Filtering */}
        <ProductGrid
          products={DEMO_PRODUCTS}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
          onViewProductDetails={(prod) => setSelectedProduct(prod)}
        />

        {/* Custom Design / Bespoke Inquiry Section */}
        <CustomDesignSection />

        {/* About CFC Section */}
        <AboutSection />

        {/* Contact & Studio Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => setActiveCategory(cat)}
        onOpenCustomCouture={() => {
          const el = document.getElementById('custom-couture-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Slide-out Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onContinueShopping={() => setIsCartOpen(false)}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* User Authentication & Orders Modal */}
      <UserAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {/* Notification Toast */}
      <NotificationToast
        message={toastMessage}
        isVisible={isToastVisible}
        onClose={() => setIsToastVisible(false)}
        onOpenCart={() => {
          setIsToastVisible(false);
          setIsCartOpen(true);
        }}
      />

      {/* Accessible Floating WhatsApp Button */}
      <FloatingWhatsAppButton />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
