'use client'

import { useAppStore } from '@/lib/store/appStore'
import { Signature } from '@/lib/schemas/signature.schema'
import Card from '@/components/ui/Card'
import SignatureNameField from '@/components/editor/SignatureNameField'
import PersonalInfoSection from '@/components/editor/PersonalInfoSection'
import ContactInfoSection from '@/components/editor/ContactInfoSection'
import SocialLinksSection from '@/components/editor/SocialLinksSection'
import BrandingSection from '@/components/editor/BrandingSection'

export default function SignatureForm() {
  const getActiveSignature = useAppStore((state) => state.getActiveSignature)
  const activeSignatureId = useAppStore((state) => state.activeSignatureId)
  const updateSignature = useAppStore((state) => state.updateSignature)

  const signature = getActiveSignature()

  const handleUpdate = (updates: Partial<Signature>) => {
    if (activeSignatureId) {
      updateSignature(activeSignatureId, updates)
    }
  }

  if (!signature) {
    return (
      <Card>
        <div className="text-center py-12">
          <p className="text-gray-500">No signature selected. Create or select a signature to start editing.</p>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <SignatureNameField signature={signature} onUpdate={handleUpdate} />
      </Card>

      <Card>
        <PersonalInfoSection signature={signature} onUpdate={handleUpdate} />
      </Card>

      <Card>
        <ContactInfoSection signature={signature} onUpdate={handleUpdate} />
      </Card>

      <Card>
        <SocialLinksSection signature={signature} onUpdate={handleUpdate} />
      </Card>

      <Card>
        <BrandingSection signature={signature} onUpdate={handleUpdate} />
      </Card>
    </div>
  )
}
