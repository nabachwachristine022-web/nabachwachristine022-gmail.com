import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Mail, Clock, Send, Instagram, Facebook } from 'lucide-react';
import { BRAND_CONFIG, buildWhatsAppUrl } from '../config/brand';

export const ContactSection: React.FC = () => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquirySubject, setInquirySubject] = useState('Product Question & Fitting');
  const [inquiryMessage, setInquiryMessage] = useState('');

  const handleQuickContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      `Hello CFC – Christine Fashion Couture!`,
      `My name is ${inquiryName || 'a customer'}.`,
      inquiryPhone ? `Phone: ${inquiryPhone}` : '',
      `Subject: ${inquirySubject}`,
      ``,
      `Inquiry:`,
      inquiryMessage || 'I would like to inquire about your collections and fitting services.',
      ``,
      `Please let me know how best to proceed. Thank you!`,
    ]
      .filter(Boolean)
      .join('\n');

    const url = buildWhatsAppUrl(lines);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact-section" className="py-16 sm:py-24 bg-[#F8F6F0] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Lead */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#B83259] mb-2">
            Get in Touch
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Contact &amp; Studio Inquiries
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            Have questions about ready-made pieces, need to book a bespoke fitting session, or
            discuss fabric options? Connect directly with Christine and our team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-sm space-y-6">
              <h3 className="font-serif text-xl font-bold text-stone-900 border-b border-stone-100 pb-3">
                {BRAND_CONFIG.businessName}
              </h3>

              {/* Phone Numbers */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-[#FCE7EC] flex items-center justify-center text-[#B83259] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-800">
                    Phone Numbers (Uganda)
                  </h4>
                  <div className="mt-1 space-y-1 text-sm text-stone-600">
                    {BRAND_CONFIG.phoneNumbers.map((phone, idx) => (
                      <p key={idx}>
                        <a
                          href={`tel:${phone.international}`}
                          className="hover:text-[#B83259] transition-colors font-mono"
                        >
                          {phone.display}
                        </a>
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* WhatsApp Ordering */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-[#E5F7EB] flex items-center justify-center text-emerald-700 shrink-0">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-800">
                    WhatsApp Ordering Line
                  </h4>
                  <p className="mt-1 text-sm font-mono text-stone-700">
                    {BRAND_CONFIG.whatsappDisplay}
                  </p>
                  <a
                    href={buildWhatsAppUrl('Hello CFC, I would like to chat regarding an outfit.')}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#B83259] hover:underline font-semibold mt-1"
                  >
                    <span>Chat Directly on WhatsApp</span>
                    <span>→</span>
                  </a>
                </div>
              </div>

              {/* Studio Location */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-[#F5EFE0] flex items-center justify-center text-[#C5A059] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-800">
                    Location &amp; Delivery
                  </h4>
                  <p className="mt-1 text-sm text-stone-700">{BRAND_CONFIG.location.address}</p>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {BRAND_CONFIG.location.landmark}
                  </p>
                  <p className="text-[11px] text-stone-400 italic mt-1">
                    Editable placeholder: {BRAND_CONFIG.location.addressPlaceholder}
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center text-stone-700 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-800">
                    Operating Hours
                  </h4>
                  <p className="mt-1 text-xs font-medium text-stone-800">
                    {BRAND_CONFIG.businessHours.weekdays}
                  </p>
                  <p className="text-xs text-stone-500 mt-0.5">{BRAND_CONFIG.businessHours.weekend}</p>
                  <p className="text-[11px] text-[#B83259] mt-0.5 font-medium">{BRAND_CONFIG.businessHours.note}</p>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-stone-100">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-700 mb-3">
                  Follow Our Social Showcases
                </h4>
                <div className="flex items-center gap-3">
                  <a
                    href={BRAND_CONFIG.socialLinks.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded bg-stone-100 hover:bg-[#FCE7EC] hover:text-[#B83259] text-stone-700 transition-colors"
                    title="Instagram"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href={BRAND_CONFIG.socialLinks.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded bg-stone-100 hover:bg-[#FCE7EC] hover:text-[#B83259] text-stone-700 transition-colors"
                    title="Facebook"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href={BRAND_CONFIG.socialLinks.tiktok}
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 py-1.5 rounded bg-stone-100 hover:bg-[#FCE7EC] hover:text-[#B83259] text-stone-700 text-xs font-semibold transition-colors"
                    title="TikTok"
                    aria-label="TikTok"
                  >
                    TikTok
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct WhatsApp Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-sm">
            <h3 className="font-serif text-2xl font-bold text-stone-900 mb-1">
              Send a Quick Message
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Write to us below. Submitting automatically prepares your message in WhatsApp for fast,
              one-on-one consultation with CFC.
            </p>

            <form onSubmit={handleQuickContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contactName"
                    className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1"
                  >
                    Your Name
                  </label>
                  <input
                    id="contactName"
                    type="text"
                    required
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    placeholder="e.g. Christine"
                    className="w-full text-xs px-3 py-2.5 bg-stone-50 border border-stone-300 rounded focus:bg-white focus:outline-none focus:border-[#B83259]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contactPhone"
                    className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1"
                  >
                    Your Phone / WhatsApp
                  </label>
                  <input
                    id="contactPhone"
                    type="tel"
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                    placeholder="e.g. 0772 963 428"
                    className="w-full text-xs px-3 py-2.5 bg-stone-50 border border-stone-300 rounded focus:bg-white focus:outline-none focus:border-[#B83259]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contactSubject"
                  className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1"
                >
                  Topic of Inquiry
                </label>
                <select
                  id="contactSubject"
                  value={inquirySubject}
                  onChange={(e) => setInquirySubject(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 bg-stone-50 border border-stone-300 rounded focus:bg-white focus:outline-none focus:border-[#B83259]"
                >
                  <option value="Product Sizing & Delivery Question">
                    Ready-to-Wear Stock &amp; Delivery Question
                  </option>
                  <option value="Bespoke Fitting & Tailoring Appointment">
                    Bespoke Fitting &amp; Tailoring Consultation
                  </option>
                  <option value="Wedding / Bridal / Kwanjula Party Order">
                    Wedding / Bridal / Kwanjula Ceremony Order
                  </option>
                  <option value="Children Milestone Outfit">
                    Children&apos;s Party / Milestone Clothing
                  </option>
                  <option value="General Brand Inquiry">General Inquiries</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="contactMessage"
                  className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1"
                >
                  Your Message
                </label>
                <textarea
                  id="contactMessage"
                  rows={4}
                  required
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                  placeholder="How can we assist you today? Let us know what style you are looking for..."
                  className="w-full text-xs px-3 py-2.5 bg-stone-50 border border-stone-300 rounded focus:bg-white focus:outline-none focus:border-[#B83259]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-5 text-xs font-semibold uppercase tracking-wider text-white bg-[#B83259] hover:bg-[#982446] rounded-md transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Open in WhatsApp</span>
              </button>

              <p className="text-[11px] text-stone-500 text-center">
                Submitting opens WhatsApp with your pre-composed text. No spam or marketing bots.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
