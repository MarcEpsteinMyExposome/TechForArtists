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

export default function BrandingSection({ signature, onUpdate }: BrandingSectionProps) {
  const currentColorId = signature.branding.colorPresetId
  const currentLayoutId = signature.branding.layoutPresetId

  const handleColorSelect = (colorPresetId: string) => {
    onUpdate({
      branding: { ...signature.branding, colorPresetId },
    })
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
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
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
        </div>
      </div>

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
