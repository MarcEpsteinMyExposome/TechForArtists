'use client'

import Input from '@/components/ui/Input'
import SectionHeading from '@/components/ui/SectionHeading'
import { Signature } from '@/lib/schemas/signature.schema'

interface PersonalInfoSectionProps {
  signature: Signature
  onUpdate: (updates: Partial<Signature>) => void
}

export default function PersonalInfoSection({ signature, onUpdate }: PersonalInfoSectionProps) {
  return (
    <div className="space-y-4">
      <SectionHeading title="Personal Info" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          value={signature.fullName}
          onChange={(e) => onUpdate({ fullName: e.target.value })}
          required
        />
        <Input
          label="Job Title"
          value={signature.jobTitle || ''}
          onChange={(e) => onUpdate({ jobTitle: e.target.value })}
        />
        <Input
          label="Company"
          value={signature.company || ''}
          onChange={(e) => onUpdate({ company: e.target.value })}
        />
      </div>
    </div>
  )
}
