import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ColorPalette {
  id: string;
  name: string;
  subtitle: string;
  primary: string;       // Primary brand color (buttons, active states, accents)
  primaryHover: string;
  primaryDark: string;
  accentGold: string;    // Gold/champagne accent
  accentLight: string;   // Light pill/tag background
  bgCream: string;       // Page background
  bgIvory: string;       // Cards background
  badgeText: string;     // Text on light badge
  previewDots: string[]; // 4 color swatches for the picker UI
}

export const COLOR_PALETTES: ColorPalette[] = [
  {
    id: 'emerald-gold',
    name: 'Royal Emerald & Gold',
    subtitle: 'Ugandan Kwanjula & Royal Prestige',
    primary: '#0D5C3A',
    primaryHover: '#0A472D',
    primaryDark: '#062E1D',
    accentGold: '#D4AF37',
    accentLight: '#E8F5EE',
    bgCream: '#FBFDF9',
    bgIvory: '#F2F8F4',
    badgeText: '#0D5C3A',
    previewDots: ['#0D5C3A', '#D4AF37', '#E8F5EE', '#062E1D'],
  },
  {
    id: 'onyx-gold',
    name: 'Imperial Gold & Noir',
    subtitle: 'High-Fashion African Haute Couture',
    primary: '#A87D2E',
    primaryHover: '#8C6721',
    primaryDark: '#1A1816',
    accentGold: '#C5A059',
    accentLight: '#F7F2E7',
    bgCream: '#FCFBF7',
    bgIvory: '#F6F3EC',
    badgeText: '#7A5B1D',
    previewDots: ['#1A1816', '#C5A059', '#F7F2E7', '#A87D2E'],
  },
  {
    id: 'ruby-rose',
    name: 'Couture Ruby & Blush',
    subtitle: 'Romantic Atelier & Bridal Glamour',
    primary: '#9E2248',
    primaryHover: '#801837',
    primaryDark: '#5E1027',
    accentGold: '#C5A059',
    accentLight: '#FDF0F3',
    bgCream: '#FCFBF7',
    bgIvory: '#F9F5F6',
    badgeText: '#9E2248',
    previewDots: ['#9E2248', '#C5A059', '#FDF0F3', '#5E1027'],
  },
  {
    id: 'terracotta-sun',
    name: 'Kitenge Sun & Terracotta',
    subtitle: 'Warm African Earth & Vibrant Wax Prints',
    primary: '#A8411D',
    primaryHover: '#8A3214',
    primaryDark: '#5C1E0A',
    accentGold: '#E09E38',
    accentLight: '#FBF0E9',
    bgCream: '#FDFBF7',
    bgIvory: '#F8F1EB',
    badgeText: '#A8411D',
    previewDots: ['#A8411D', '#E09E38', '#FBF0E9', '#5C1E0A'],
  },
  {
    id: 'sapphire-bronze',
    name: 'Sovereign Sapphire & Bronze',
    subtitle: 'Diplomatic Gala & State Banquets',
    primary: '#123258',
    primaryHover: '#0C233E',
    primaryDark: '#071628',
    accentGold: '#C89B48',
    accentLight: '#EBF1F8',
    bgCream: '#FAFBFC',
    bgIvory: '#F0F4F8',
    badgeText: '#123258',
    previewDots: ['#123258', '#C89B48', '#EBF1F8', '#071628'],
  },
];

interface ThemeContextType {
  currentPalette: ColorPalette;
  setPaletteById: (id: string) => void;
  isPaletteModalOpen: boolean;
  setIsPaletteModalOpen: (open: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [paletteId, setPaletteId] = useState<string>(() => {
    return localStorage.getItem('cfc_color_palette') || 'emerald-gold';
  });
  const [isPaletteModalOpen, setIsPaletteModalOpen] = useState(false);

  const currentPalette =
    COLOR_PALETTES.find((p) => p.id === paletteId) || COLOR_PALETTES[0];

  useEffect(() => {
    localStorage.setItem('cfc_color_palette', currentPalette.id);

    // Apply CSS variables to root
    const root = document.documentElement;
    root.style.setProperty('--color-brand-rose', currentPalette.primary);
    root.style.setProperty('--color-brand-rose-hover', currentPalette.primaryHover);
    root.style.setProperty('--color-brand-rose-dark', currentPalette.primaryDark);
    root.style.setProperty('--color-brand-gold', currentPalette.accentGold);
    root.style.setProperty('--color-brand-blush', currentPalette.accentLight);
    root.style.setProperty('--color-brand-cream', currentPalette.bgCream);
    root.style.setProperty('--color-brand-ivory', currentPalette.bgIvory);
  }, [currentPalette]);

  const setPaletteById = (id: string) => {
    const found = COLOR_PALETTES.find((p) => p.id === id);
    if (found) {
      setPaletteId(id);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        currentPalette,
        setPaletteById,
        isPaletteModalOpen,
        setIsPaletteModalOpen,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
