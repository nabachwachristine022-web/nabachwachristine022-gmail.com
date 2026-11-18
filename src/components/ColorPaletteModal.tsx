import React from 'react';
import { X, Check, Palette, Sparkles, RefreshCw } from 'lucide-react';
import { useTheme, COLOR_PALETTES } from '../context/ThemeContext';

export const ColorPaletteModal: React.FC = () => {
  const { currentPalette, setPaletteById, isPaletteModalOpen, setIsPaletteModalOpen } = useTheme();

  if (!isPaletteModalOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="color-palette-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
    >
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-stone-200 bg-[#FCFBF7] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm"
              style={{ backgroundColor: currentPalette.primary }}
            >
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 id="color-palette-title" className="font-serif text-lg font-bold text-stone-900">
                Atelier Color Palettes
              </h3>
              <p className="text-xs text-stone-500">
                Choose a color theme for Christine Fashion Couture
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsPaletteModalOpen(false)}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors"
            aria-label="Close palette selector"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Palettes List */}
        <div className="p-6 space-y-3.5 max-h-[70vh] overflow-y-auto">
          <p className="text-xs font-medium uppercase tracking-wider text-stone-500 mb-2">
            Select Your Brand Palette:
          </p>

          {COLOR_PALETTES.map((palette) => {
            const isSelected = palette.id === currentPalette.id;
            return (
              <button
                key={palette.id}
                onClick={() => setPaletteById(palette.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between gap-4 ${
                  isSelected
                    ? 'border-2 shadow-md bg-[#FAF9F5]'
                    : 'border-stone-200 hover:border-stone-400 hover:bg-stone-50/80'
                }`}
                style={{
                  borderColor: isSelected ? palette.primary : undefined,
                }}
              >
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  {/* Swatch circles */}
                  <div className="flex -space-x-1.5 shrink-0">
                    {palette.previewDots.map((dot, idx) => (
                      <span
                        key={idx}
                        className="w-6 h-6 rounded-full border-2 border-white shadow-xs"
                        style={{ backgroundColor: dot }}
                      />
                    ))}
                  </div>

                  <div className="truncate">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-sm text-stone-900">
                        {palette.name}
                      </span>
                      {isSelected && (
                        <span
                          className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full text-white"
                          style={{ backgroundColor: palette.primary }}
                        >
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-500 truncate">{palette.subtitle}</p>
                  </div>
                </div>

                <div className="shrink-0 flex items-center">
                  {isSelected ? (
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-white"
                      style={{ backgroundColor: palette.primary }}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  ) : (
                    <span className="text-xs font-medium text-stone-400 group-hover:text-stone-700">
                      Apply
                    </span>
                  )}
                </div>
              </button>
            );
          })}

          {/* Live Preview Box */}
          <div
            className="mt-6 p-4 rounded-xl border border-dashed border-stone-300"
            style={{ backgroundColor: currentPalette.accentLight }}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: currentPalette.primary }}
              >
                Live Preview of &quot;{currentPalette.name}&quot;
              </span>
              <Sparkles className="w-3.5 h-3.5" style={{ color: currentPalette.accentGold }} />
            </div>
            <p className="text-xs text-stone-700 mb-3">
              Buttons, navigation active indicators, badges, and headers immediately adapt to this
              opulent aesthetic across your entire storefront.
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white shadow-xs transition-opacity hover:opacity-95"
                style={{ backgroundColor: currentPalette.primary }}
              >
                Primary Button
              </button>
              <button
                type="button"
                className="px-3 py-1.5 rounded-lg text-xs font-medium border bg-white shadow-2xs"
                style={{
                  color: currentPalette.primary,
                  borderColor: currentPalette.accentGold,
                }}
              >
                Accent Outline
              </button>
              <span
                className="px-2.5 py-1 rounded text-[11px] font-semibold"
                style={{
                  backgroundColor: '#FFFFFF',
                  color: currentPalette.badgeText,
                  border: `1px solid ${currentPalette.accentGold}40`,
                }}
              >
                ✦ African Wear
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between">
          <button
            onClick={() => setPaletteById('emerald-gold')}
            className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset to Emerald &amp; Gold</span>
          </button>
          <button
            onClick={() => setIsPaletteModalOpen(false)}
            className="px-5 py-2 rounded-xl text-xs font-semibold text-white transition-opacity hover:opacity-90 shadow-sm"
            style={{ backgroundColor: currentPalette.primary }}
          >
            Done &amp; Save Palette
          </button>
        </div>
      </div>
    </div>
  );
};
