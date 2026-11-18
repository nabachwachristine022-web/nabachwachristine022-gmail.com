/**
 * CFC – Christine Fashion Couture Brand & Business Configuration
 * Centralized configuration file for contact info, WhatsApp numbers, currency, and social links.
 * Edit this file to update business details across the entire website.
 */

export const BRAND_CONFIG = {
  businessName: 'CFC – Christine Fashion Couture',
  shortName: 'CFC',
  founderName: 'Christine',
  tagline: 'Elegance in Every Stitch.',
  slogan: 'Your Style. Your Story. Your Couture.',
  market: 'Uganda',
  currency: 'UGX',

  // Business Phone Numbers provided in the prompt
  phoneNumbers: [
    { display: '0772 963 428', international: '+256772963428' },
    { display: '0705 908 333', international: '+256705908333' },
  ],

  /**
   * Primary WhatsApp ordering number (Uganda format: country code 256 + 9-digit number without leading 0)
   * e.g., 0772963428 becomes 256772963428
   * Replace with final dedicated business WhatsApp line if different.
   */
  whatsappNumber: '256772963428', // Editable placeholder / primary business line
  whatsappDisplay: '+256 772 963 428',

  // Location and address (Editable placeholders for exact town / studio)
  location: {
    city: 'Kampala',
    country: 'Uganda',
    address: 'Kampala, Uganda',
    addressPlaceholder: '[INSERT TOWN OR ADDRESS, UGANDA]',
    landmark: 'Serving Kampala, Entebbe, Jinja & delivery nationwide across Uganda',
  },

  // Contact email
  email: 'info@christinefashioncouture.ug',
  emailPlaceholder: '[INSERT EMAIL ADDRESS, IF AVAILABLE]',

  // Operating Hours (Strictly Monday to Friday)
  businessHours: {
    weekdays: 'Monday – Friday: 9:00 AM – 6:30 PM',
    weekend: 'Saturday & Sunday: Closed',
    note: 'Studio consultations and orders processed Monday through Friday',
  },

  // Social media handles (Editable placeholders)
  socialLinks: {
    instagram: 'https://instagram.com/christinefashioncouture',
    facebook: 'https://facebook.com/christinefashioncouture',
    tiktok: 'https://tiktok.com/@christinefashioncouture',
    instagramHandle: '@christinefashioncouture',
  },

  // Trust disclaimers
  orderNotice:
    'Please note: Clicking Order on WhatsApp opens a pre-composed message to our team. An order is confirmed only after CFC verifies fabric availability, exact measurements, and payment details.',
  deliveryNotice:
    'Delivery arrangements and fitting appointments within Kampala and across Uganda are coordinated directly upon order confirmation.',
};

/**
 * Format numeric amount into standard Ugandan Shillings display format.
 * Example: 85000 -> "UGX 85,000"
 */
export function formatUGX(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return 'UGX 0';
  }
  return `UGX ${Math.round(amount).toLocaleString('en-US')}`;
}

/**
 * Construct safe WhatsApp Click to Chat URL with URL-encoded message
 */
export function buildWhatsAppUrl(message: string, overrideNumber?: string): string {
  const number = overrideNumber || BRAND_CONFIG.whatsappNumber;
  const cleanNumber = number.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(message.trim());
  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
}

/**
 * Generate a WhatsApp order message for a single product
 */
export function generateProductOrderWhatsAppUrl(
  productName: string,
  priceUGX: number,
  size?: string,
  color?: string
): string {
  const sizeText = size ? size : 'To be confirmed';
  const colorText = color ? color : 'As shown / To be discussed';

  const message = [
    `Hello CFC – Christine Fashion Couture.`,
    `I am interested in ordering: *${productName}*`,
    `• Price: ${formatUGX(priceUGX)}`,
    `• Preferred Size: ${sizeText}`,
    `• Preferred Colour: ${colorText}`,
    ``,
    `Please confirm current availability, turnaround time, and delivery or collection options in Uganda. Thank you!`,
  ].join('\n');

  return buildWhatsAppUrl(message);
}

/**
 * Generate a WhatsApp summary message for an entire shopping cart
 */
export function generateCartOrderWhatsAppUrl(
  items: {
    productName: string;
    size: string;
    color: string;
    quantity: number;
    subtotalUGX: number;
  }[],
  totalUGX: number,
  customerName?: string
): string {
  const lines: string[] = [
    `Hello CFC – Christine Fashion Couture!`,
    `I would like to place an order for the following items from your collection:`,
    ``,
  ];

  if (customerName && customerName.trim()) {
    lines.push(`Customer: *${customerName.trim()}*`);
  }

  items.forEach((item, index) => {
    lines.push(
      `${index + 1}. *${item.productName}* (${item.quantity}x)` +
        `\n   • Size: ${item.size || 'Standard'}` +
        `\n   • Colour: ${item.color || 'Standard'}` +
        `\n   • Subtotal: ${formatUGX(item.subtotalUGX)}`
    );
  });

  lines.push(``);
  lines.push(`*Estimated Order Total: ${formatUGX(totalUGX)}*`);
  lines.push(``);
  lines.push(
    `Please confirm stock or production timeline, fitting requirements, and payment/delivery details. Looking forward to your response!`
  );

  return buildWhatsAppUrl(lines.join('\n'));
}

/**
 * Generate a WhatsApp message for a custom couture bespoke inquiry
 */
export function generateCustomInquiryWhatsAppUrl(inquiry: {
  fullName: string;
  whatsappPhone: string;
  category: string;
  outfitType: string;
  preferredColor: string;
  measurementsOrSize: string;
  occasion: string;
  desiredDate: string;
  budgetRangeUGX: string;
  additionalNotes: string;
}): string {
  const lines = [
    `✨ *CUSTOM COUTURE INQUIRY – CFC CHRISTINE FASHION COUTURE*`,
    ``,
    `• Client Name: ${inquiry.fullName || 'Valued Client'}`,
    `• Contact Phone: ${inquiry.whatsappPhone || 'Provided via WhatsApp'}`,
    `• Department: ${inquiry.category === 'african-wear' ? 'AFRICAN & KWANJULA WEAR' : inquiry.category.toUpperCase()}`,
    `• Outfit Type: ${inquiry.outfitType || 'Bespoke Design'}`,
    `• Preferred Colour/Palette: ${inquiry.preferredColor || 'To discuss'}`,
    `• Measurements / Size: ${inquiry.measurementsOrSize || 'Need fitting consultation'}`,
    `• Event / Occasion: ${inquiry.occasion || 'Special event'}`,
    `• Needed By: ${inquiry.desiredDate || 'Flexible'}`,
    `• Estimated Budget: ${inquiry.budgetRangeUGX ? `UGX ${inquiry.budgetRangeUGX}` : 'To discuss'}`,
    ``,
    `Additional Requests:`,
    `${inquiry.additionalNotes || 'Looking forward to discussing fabric options and tailored sketches.'}`,
    ``,
    `Kindly let me know consultation availability and the next steps. Thank you!`,
  ];

  return buildWhatsAppUrl(lines.join('\n'));
}
