import React from 'react';
import { CheckCircle2, ShoppingBag, X } from 'lucide-react';

interface NotificationToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  onOpenCart?: () => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({
  message,
  isVisible,
  onClose,
  onOpenCart,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-[#1C1917] text-white px-4 py-3 rounded-lg shadow-xl border border-stone-800 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
      <span className="text-xs font-medium">{message}</span>

      {onOpenCart && (
        <button
          onClick={onOpenCart}
          className="ml-2 text-xs font-semibold text-[#E5C883] hover:text-white flex items-center gap-1 underline"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>View Bag</span>
        </button>
      )}

      <button
        onClick={onClose}
        className="p-1 text-stone-400 hover:text-white ml-1"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
