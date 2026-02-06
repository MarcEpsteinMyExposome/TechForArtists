'use client'

import SectionHeading from '@/components/ui/SectionHeading'
import { Signature, COLOR_PRESETS, LAYOUT_PRESETS } from '@/lib/schemas/signature.schema'

interface BrandingSectionProps {
  signature: Signature
  onUpdate: (updates: Partial<Signature>) => void
}

const layoutLabels: Record<string, string> = {
  horizontal: 'Horizontal',
  stacked: 'Stacked',
  compact: 'Compact',
}

const layoutDescriptions: Record<string, string> = {
  horizontal: 'Side by side layout',
  stacked: 'Vertically stacked',
  compact: 'Minimal and tight',
}

/** Default custom colors when switching to custom for the first time */
const DEFAULT_CUSTOM_PRIMARY = '#333333'
const DEFAULT_CUSTOM_ACCENT = '#666666'

export default function BrandingSection({ signature, onUpdate }: BrandingSectionProps) {
  const currentColorId = signature.branding.colorPresetId
  const currentLayoutId = signature.branding.layoutPresetId
  const isCustom = currentColorId === 'custom'

  const handleColorSelect = (colorPresetId: string) => {
    onUpdate({
      branding: { ...signature.branding, colorPresetId },
    })
  }

  const handleCustomSelect = () => {
    onUpdate({
      branding: {
        ...signature.branding,
        colorPresetId: 'custom',
        customPrimary: signature.branding.customPrimary ?? DEFAULT_CUSTOM_PRIMARY,
        customAccent: signature.branding.customAccent ?? DEFAULT_CUSTOM_ACCENT,
      },
    })
  }

  const handleCustomColorChange = (field: 'customPrimary' | 'customAccent', value: string) => {
    onUpdate({
      branding: { ...signature.branding, [field]: value },
    })
  }

  const handleHexInputChange = (field: 'customPrimary' | 'customAccent', value: string) => {
    // Ensure the value starts with # and is a valid hex pattern
    let normalized = value.trim()
    if (!normalized.startsWith('#')) {
      normalized = '#' + normalized
    }
    // Only update if it looks like a valid hex color
    if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(normalized)) {
      handleCustomColorChange(field, normalized)
    }
  }

  const handleLayoutSelect = (layoutPresetId: typeof LAYOUT_PRESETS[number]) => {
    onUpdate({
      branding: { ...signature.branding, layoutPresetId },
    })
  }

  return (
    <div className="space-y-6">
      <SectionHeading title="Branding" description="Choose colors and layout for your signature" />

      {/* Color Presets */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">Color Scheme</p>
        <div className="grid grid-cols-4 sm:grid-cols-9 gap-3">
          {COLOR_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleColorSelect(preset.id)}
              className={`flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors ${
                currentColorId === preset.id
                  ? 'bg-gray-100 ring-2 ring-gray-900'
                  : 'hover:bg-gray-50'
              }`}
              aria-label={`${preset.label} color scheme`}
              aria-pressed={currentColorId === preset.id}
            >
              <div
                className="w-8 h-8 rounded-full border border-gray-200"
                style={{ backgroundColor: preset.primary }}
              />
              <span className="text-xs text-gray-600">{preset.label}</span>
            </button>
          ))}

          {/* Custom color swatch */}
          <button
            type="button"
            onClick={handleCustomSelect}
            className={`flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors ${
              isCustom
                ? 'bg-gray-100 ring-2 ring-gray-900'
                : 'hover:bg-gray-50'
            }`}
            aria-label="Custom color scheme"
            aria-pressed={isCustom}
          >
            <div
              className="w-8 h-8 rounded-full border border-gray-200 overflow-hidden"
              style={{
                background: isCustom
                  ? signature.branding.customPrimary ?? DEFAULT_CUSTOM_PRIMARY
                  : 'conic-gradient(#f44336, #ff9800, #ffeb3b, #4caf50, #2196f3, #9c27b0, #f44336)',
              }}
            />
            <span className="text-xs text-gray-600">Custom</span>
          </button>
        </div>
      </div>

      {/* Custom Color Inputs — only visible when "Custom" is selected */}
      {isCustom && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <div>
            <label htmlFor="custom-primary" className="block text-sm font-medium text-gray-700 mb-1.5">
              Primary Color
            </label>
            <div className="flex items-center gap-2">
              <input
                id="custom-primary"
                type="color"
                value={signature.branding.customPrimary ?? DEFAULT_CUSTOM_PRIMARY}
                onChange={(e) => handleCustomColorChange('customPrimary', e.target.value)}
                className="w-10 h-10 rounded border border-gray-300 cursor-pointer p-0.5"
                aria-label="Primary color picker"
              />
              <input
                type="text"
                value={signature.branding.customPrimary ?? DEFAULT_CUSTOM_PRIMARY}
                onChange={(e) => handleHexInputChange('customPrimary', e.target.value)}
                placeholder="#333333"
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm font-mono text-gray-900 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                aria-label="Primary color hex value"
                maxLength={7}
              />
            </div>
          </div>
          <div>
            <label htmlFor="custom-accent" className="block text-sm font-medium text-gray-700 mb-1.5">
              Accent Color
            </label>
            <div className="flex items-center gap-2">
              <input
                id="custom-accent"
                type="color"
                value={signature.branding.customAccent ?? DEFAULT_CUSTOM_ACCENT}
                onChange={(e) => handleCustomColorChange('customAccent', e.target.value)}
                className="w-10 h-10 rounded border border-gray-300 cursor-pointer p-0.5"
                aria-label="Accent color picker"
              />
              <input
                type="text"
                value={signature.branding.customAccent ?? DEFAULT_CUSTOM_ACCENT}
                onChange={(e) => handleHexInputChange('customAccent', e.target.value)}
                placeholder="#666666"
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm font-mono text-gray-900 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                aria-label="Accent color hex value"
                maxLength={7}
              />
            </div>
          </div>
        </div>
      )}

      {/* Layout Presets */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">Layout</p>
        <div className="grid grid-cols-3 gap-3">
          {LAYOUT_PRESETS.map((layout) => (
            <button
              key={layout}
              type="button"
              onClick={() => handleLayoutSelect(layout)}
              className={`p-3 rounded-lg border text-center transition-colors ${
                currentLayoutId === layout
                  ? 'border-gray-900 bg-gray-50 ring-1 ring-gray-900'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
              aria-label={`${layoutLabels[layout]} layout`}
              aria-pressed={currentLayoutId === layout}
            >
              <span className="text-sm font-medium text-gray-900">{layoutLabels[layout]}</span>
              <p className="text-xs text-gray-500 mt-1">{layoutDescriptions[layout]}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
