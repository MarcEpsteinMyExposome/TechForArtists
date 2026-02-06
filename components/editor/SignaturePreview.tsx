'use client'

import { useAppStore } from '@/lib/store/appStore'
import { resolveColorPreset } from '@/lib/signature/utils'
import Card from '@/components/ui/Card'
import HorizontalLayout from '@/components/editor/preview/HorizontalLayout'
import StackedLayout from '@/components/editor/preview/StackedLayout'
import CompactLayout from '@/components/editor/preview/CompactLayout'

/**
 * Live signature preview component.
 * Reads the active signature from the Zustand store and renders the
 * appropriate layout (horizontal, stacked, or compact) with color theming.
 *
 * This is a visual Tailwind preview, NOT the email HTML output.
 */
export default function SignaturePreview() {
  const getActiveSignature = useAppStore((state) => state.getActiveSignature)
  const signature = getActiveSignature()

  // Check if signature has any meaningful content to display
  const hasContent =
    signature &&
    (signature.fullName ||
      signature.jobTitle ||
      signature.company ||
      signature.email ||
      signature.phone ||
      signature.website ||
      signature.socialLinks.length > 0 ||
      signature.customLinks.length > 0)

  if (!hasContent) {
    return (
      <div>
        <p className="mb-2 text-sm font-medium text-gray-500">Preview</p>
        <Card>
          <p className="text-center text-sm text-gray-400">
            Start filling in your details to see a preview
          </p>
        </Card>
      </div>
    )
  }

  const colors = resolveColorPreset(signature.branding.colorPresetId)
  const layoutProps = {
    signature,
    colors: { primary: colors.primary, accent: colors.accent },
  }

  const layoutMap = {
    horizontal: HorizontalLayout,
    stacked: StackedLayout,
    compact: CompactLayout,
  } as const

  const LayoutComponent = layoutMap[signature.branding.layoutPresetId] ?? HorizontalLayout

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-gray-500">Preview</p>
      <Card>
        <LayoutComponent {...layoutProps} />
      </Card>
    </div>
  )
}
