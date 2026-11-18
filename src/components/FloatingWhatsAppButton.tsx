import React from 'react';
import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl, BRAND_CONFIG } from '../config/brand';

export const FloatingWhatsAppButton: React.FC = () => {
  const whatsappUrl = buildWhatsAppUrl('Hello CFC, I would like to make an inquiry.');

  return (
    <aside aria-label="WhatsApp quick chat" className="fixed bottom-6 left-6 z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 px-3.5 py-2.5 bg-[#B83259] hover:bg-[#982446] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-xs font-semibold uppercase tracking-wider group"
        title="Direct WhatsApp Consultation with CFC"
      >
        <div className="w-5 h-5 flex items-center justify-center">
          <MessageCircle className="w-5 h-5" />
        </div>
        <span className="hidden sm:inline pr-1">Chat on WhatsApp</span>
      </a>
    </aside>
  );
};
