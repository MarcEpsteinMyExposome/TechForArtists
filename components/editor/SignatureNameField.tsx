'use client'

import Input from '@/components/ui/Input'
import { Signature } from '@/lib/schemas/signature.schema'

interface SignatureNameFieldProps {
  signature: Signature
  onUpdate: (updates: Partial<Signature>) => void
}

export default function SignatureNameField({ signature, onUpdate }: SignatureNameFieldProps) {
  return (
    <Input
      label="Signature Name"
      value={signature.name}
      onChange={(e) => onUpdate({ name: e.target.value })}
      placeholder="e.g., Work Signature"
    />
  )
}
