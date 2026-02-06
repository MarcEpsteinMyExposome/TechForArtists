import { Signature } from '@/lib/schemas/signature.schema'
import { resolveColors } from './utils'
import { generateHorizontalHtml } from './layouts/horizontal'
import { generateStackedHtml } from './layouts/stacked'
import { generateCompactHtml } from './layouts/compact'

/**
 * Generate email-compatible HTML for a signature.
 * Routes to the correct layout based on branding.layoutPresetId.
 * Supports both preset colors and custom user-defined colors.
 */
export function generateSignatureHtml(signature: Signature): string {
  const colors = resolveColors(signature.branding)

  switch (signature.branding.layoutPresetId) {
    case 'horizontal':
      return generateHorizontalHtml(signature, colors)
    case 'stacked':
      return generateStackedHtml(signature, colors)
    case 'compact':
      return generateCompactHtml(signature, colors)
    default:
      return generateHorizontalHtml(signature, colors)
  }
}
