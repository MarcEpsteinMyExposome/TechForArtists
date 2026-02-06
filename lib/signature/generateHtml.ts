import { Signature } from '@/lib/schemas/signature.schema'
import { resolveColorPreset } from './utils'
import { generateHorizontalHtml } from './layouts/horizontal'
import { generateStackedHtml } from './layouts/stacked'
import { generateCompactHtml } from './layouts/compact'

/**
 * Generate email-compatible HTML for a signature.
 * Routes to the correct layout based on branding.layoutPresetId.
 */
export function generateSignatureHtml(signature: Signature): string {
  const colors = resolveColorPreset(signature.branding.colorPresetId)

  switch (signature.branding.layoutPresetId) {
    case 'horizontal':
      return generateHorizontalHtml(signature, { primary: colors.primary, accent: colors.accent })
    case 'stacked':
      return generateStackedHtml(signature, { primary: colors.primary, accent: colors.accent })
    case 'compact':
      return generateCompactHtml(signature, { primary: colors.primary, accent: colors.accent })
    default:
      return generateHorizontalHtml(signature, { primary: colors.primary, accent: colors.accent })
  }
}
