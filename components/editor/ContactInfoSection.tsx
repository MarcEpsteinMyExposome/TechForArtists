'use client'

import Input from '@/components/ui/Input'
import SectionHeading from '@/components/ui/SectionHeading'
import { Signature } from '@/lib/schemas/signature.schema'

interface ContactInfoSectionProps {
  signature: Signature
  onUpdate: (updates: Partial<Signature>) => void
}

export default function ContactInfoSection({ signature, onUpdate }: ContactInfoSectionProps) {
  return (
    <div className="space-y-4">
      <SectionHeading title="Contact Info" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Email"
          type="email"
          value={signature.email || ''}
          onChange={(e) => onUpdate({ email: e.target.value })}
        />
        <Input
          label="Phone"
          type="tel"
          value={signature.phone || ''}
          onChange={(e) => onUpdate({ phone: e.target.value })}
        />
        <Input
          label="Website"
          type="url"
          value={signature.website || ''}
          onChange={(e) => onUpdate({ website: e.target.value })}
          placeholder="https://example.com"
        />
      </div>
    </div>
  )
}
