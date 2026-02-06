'use client'

import { useRouter } from 'next/navigation'
import { useAppStore } from '@/lib/store/appStore'
import { SIGNATURE_TEMPLATES, SignatureTemplate } from '@/lib/templates/signatureTemplates'
import TemplateCard from '@/components/templates/TemplateCard'

export default function TemplatesPage() {
  const router = useRouter()
  const addSignature = useAppStore((state) => state.addSignature)
  const setActiveSignatureId = useAppStore((state) => state.setActiveSignatureId)

  function handleUseTemplate(template: SignatureTemplate) {
    const now = new Date().toISOString()
    const newSignature = {
      id: crypto.randomUUID(),
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
      createdAt: now,
      updatedAt: now,
    }

    addSignature(newSignature)
    setActiveSignatureId(newSignature.id)
    router.push('/editor')
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Signature Templates</h1>
        <p className="mt-2 text-gray-600">
          Pick a template to get started quickly. You can customize every detail in the editor.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SIGNATURE_TEMPLATES.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onUse={handleUseTemplate}
          />
        ))}
      </div>
    </div>
  )
}
