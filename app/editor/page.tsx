'use client'

import { useEffect, useState } from 'react'
import { useAppStore } from '@/lib/store/appStore'
import SignatureForm from '@/components/editor/SignatureForm'
import SignaturePreview from '@/components/editor/SignaturePreview'
import CopyButton from '@/components/editor/CopyButton'

export default function EditorPage() {
  const [mounted, setMounted] = useState(false)
  const signatures = useAppStore((state) => state.signatures)
  const activeSignatureId = useAppStore((state) => state.activeSignatureId)
  const addSignature = useAppStore((state) => state.addSignature)
  const setActiveSignatureId = useAppStore((state) => state.setActiveSignatureId)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    if (signatures.length === 0) {
      const blankSignature = {
        id: crypto.randomUUID(),
        name: 'My Signature',
        fullName: '',
        jobTitle: '',
        company: '',
        email: '',
        phone: '',
        website: '',
        imageUrl: '',
        socialLinks: [],
        customLinks: [],
        branding: { colorPresetId: 'charcoal', layoutPresetId: 'horizontal' as const },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      addSignature(blankSignature)
      setActiveSignatureId(blankSignature.id)
    } else if (!activeSignatureId) {
      setActiveSignatureId(signatures[0].id)
    }
  }, [mounted, signatures.length, activeSignatureId, addSignature, setActiveSignatureId, signatures])

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Signature Editor</h1>
        <p className="mt-2 text-gray-600">Build and customize your email signature here.</p>
      </div>

      {!mounted ? (
        <div className="text-center py-12 text-gray-400">Loading editor...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <SignatureForm />
          </div>

          <div className="lg:sticky lg:top-6 self-start space-y-4">
            <SignaturePreview />
            <CopyButton />
          </div>
        </div>
      )}
    </div>
  )
}
