'use client'

import type { SignatureTemplate } from '@/lib/templates/signatureTemplates'
import type { Signature } from '@/lib/schemas/signature.schema'
import { resolveColors } from '@/lib/signature/utils'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import HorizontalLayout from '@/components/editor/preview/HorizontalLayout'
import StackedLayout from '@/components/editor/preview/StackedLayout'
import CompactLayout from '@/components/editor/preview/CompactLayout'

interface TemplateCardProps {
  template: SignatureTemplate
  onUse: (template: SignatureTemplate) => void
}

/** Build a full Signature object from template data (for preview rendering) */
function toPreviewSignature(template: SignatureTemplate): Signature {
  return {
    id: template.id,
    name: template.name,
    fullName: template.data.fullName,
    jobTitle: template.data.jobTitle ?? '',
    company: template.data.company ?? '',
    email: template.data.email ?? '',
    phone: template.data.phone ?? '',
    website: template.data.website ?? '',
    imageUrl: template.data.imageUrl ?? '',
    socialLinks: template.data.socialLinks,
    customLinks: template.data.customLinks,
    branding: template.data.branding,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

const layoutMap = {
  horizontal: HorizontalLayout,
  stacked: StackedLayout,
  compact: CompactLayout,
} as const

export default function TemplateCard({ template, onUse }: TemplateCardProps) {
  const previewSignature = toPreviewSignature(template)
  const colors = resolveColors(template.data.branding)
  const LayoutComponent = layoutMap[template.data.branding.layoutPresetId] ?? HorizontalLayout

  return (
    <Card className="flex flex-col gap-4">
      {/* Signature preview */}
      <div className="rounded-md border border-gray-100 bg-gray-50/50 p-4">
        <LayoutComponent
          signature={previewSignature}
          colors={colors}
        />
      </div>

      {/* Template info */}
      <div className="flex flex-1 flex-col">
        <h3 className="text-base font-semibold text-gray-900">{template.name}</h3>
        <p className="mt-1 text-sm text-gray-500 flex-1">{template.description}</p>
      </div>

      {/* Action */}
      <Button onClick={() => onUse(template)} className="w-full">
        Use This Template
      </Button>
    </Card>
  )
}
