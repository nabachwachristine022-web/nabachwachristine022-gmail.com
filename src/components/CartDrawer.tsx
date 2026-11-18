import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';
import { formatUGX, generateCartOrderWhatsAppUrl, BRAND_CONFIG } from '../config/brand';
import { useAuth } from '../firebase/AuthContext';
import { createOrder } from '../firebase/firestoreService';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onContinueShopping: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onContinueShopping,
}) => {
  const { currentUser, userProfile } = useAuth();
  const [customerName, setCustomerName] = useState('');

  if (!isOpen) return null;

  const totalUGX = cartItems.reduce(
    (sum, item) => sum + item.product.priceUGX * item.quantity,
    0
  );

  const effectiveCustomerName = customerName.trim() || userProfile?.displayName || currentUser?.displayName || '';

  const formattedItemsForWhatsApp = cartItems.map((item) => ({
    productName: item.product.name,
    size: item.selectedSize,
    color: item.selectedColor,
    quantity: item.quantity,
    subtotalUGX: item.product.priceUGX * item.quantity,
  }));

  const whatsappCheckoutUrl = generateCartOrderWhatsAppUrl(
    formattedItemsForWhatsApp,
    totalUGX,
    effectiveCustomerName
  );

  const handleCheckoutClick = async () => {
    try {
      await createOrder({
        userId: currentUser ? currentUser.uid : 'guest',
        customerName: effectiveCustomerName || 'CFC Client',
        whatsappPhone: userProfile?.phone || '',
        items: cartItems.map((item) => ({
          productId: item.productId,
          productName: item.product.name,
          size: item.selectedSize,
          color: item.selectedColor,
          quantity: item.quantity,
          priceUGX: item.product.priceUGX,
          subtotalUGX: item.product.priceUGX * item.quantity,
        })),
        totalUGX,
      });
    } catch (e) {
      console.warn('Failed to save order to Firestore', e);
    }
    window.open(whatsappCheckoutUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-[#FCFBF7] h-full shadow-2xl flex flex-col justify-between border-l border-stone-200 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#B83259]" />
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Your Shopping Bag ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-800 transition-colors"
            aria-label="Close bag drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-3 bg-white border border-stone-200 rounded-lg shadow-xs"
              >
                {/* Thumbnail */}
                <div className="w-20 h-24 bg-stone-100 rounded overflow-hidden shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-serif text-sm font-bold text-stone-900 line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-stone-400 hover:text-red-600 transition-colors p-0.5"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="mt-1 text-xs text-stone-500 space-y-0.5">
                      <p>
                        Size: <span className="font-medium text-stone-700">{item.selectedSize}</span>
                      </p>
                      <p>
                        Colour:{' '}
                        <span className="font-medium text-stone-700">{item.selectedColor}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                    {/* Stepper */}
                    <div className="flex items-center border border-stone-200 rounded bg-stone-50">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs text-stone-600 hover:text-stone-900"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-mono font-medium text-stone-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs text-stone-600 hover:text-stone-900"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal */}
                    <span className="font-mono tabular-nums text-xs font-bold text-stone-900">
                      {formatUGX(item.product.priceUGX * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 px-4">
              <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <h4 className="font-serif text-base font-semibold text-stone-800 mb-1">
                Your bag is currently empty
              </h4>
              <p className="text-xs text-stone-500 mb-6 max-w-xs mx-auto">
                Discover elegant pieces for women, men, and children from our Kampala atelier.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onContinueShopping();
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#B83259] hover:bg-[#982446] rounded transition-colors"
              >
                <span>Browse Outfits</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer / WhatsApp Checkout */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-stone-200 bg-white space-y-4">
            {/* Customer Name Input (Optional for prefilled greeting) */}
            <div>
              <label
                htmlFor="cart-customer-name"
                className="block text-xs font-medium text-stone-700 mb-1"
              >
                Your Name (for WhatsApp greeting):
              </label>
              <input
                id="cart-customer-name"
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Christine, Sarah, Ronald"
                className="w-full text-xs px-3 py-2 border border-stone-200 rounded focus:outline-none focus:border-[#B83259]"
              />
            </div>

            {/* Subtotal */}
            <div className="space-y-1.5 pt-2 border-t border-stone-100">
              <div className="flex items-center justify-between text-xs text-stone-600">
                <span>Estimated Subtotal:</span>
                <span className="font-mono tabular-nums text-stone-800">
                  {formatUGX(totalUGX)}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span>Kampala / Uganda Delivery:</span>
                <span>Calculated on WhatsApp</span>
              </div>
              <div className="flex items-center justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-100">
                <span>Total (UGX):</span>
                <span className="font-mono tabular-nums text-base text-[#B83259]">
                  {formatUGX(totalUGX)}
                </span>
              </div>
            </div>

            {/* WhatsApp Checkout Button */}
            <button
              onClick={handleCheckoutClick}
              className="w-full py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#B83259] hover:bg-[#982446] rounded-md transition-all flex items-center justify-center gap-2 shadow-md text-center cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Checkout Order on WhatsApp</span>
            </button>

            {/* Order Note */}
            <div className="flex items-start gap-2 text-[11px] text-stone-500">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
              <p>
                Clicking opens WhatsApp with your pre-formatted order summary. Your order is confirmed
                only after CFC verifies fabric availability, sizes, and payment arrangements.
              </p>
            </div>

            {/* Clear Cart */}
            <div className="text-center">
              <button
                onClick={onClearCart}
                className="text-[11px] text-stone-400 hover:text-stone-700 underline"
              >
                Clear Entire Bag
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
