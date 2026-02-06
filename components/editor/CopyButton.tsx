'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useAppStore } from '@/lib/store/appStore'
import { generateSignatureHtml } from '@/lib/signature/generateHtml'
import { copyHtmlToClipboard } from '@/lib/signature/clipboard'
import Button from '@/components/ui/Button'

interface CopyButtonProps {
  onCopySuccess?: () => void
}

type ButtonLabel = 'Copy Signature' | 'Copied!' | 'Failed to copy'

export default function CopyButton({ onCopySuccess }: CopyButtonProps) {
  const [label, setLabel] = useState<ButtonLabel>('Copy Signature')
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const getActiveSignature = useAppStore((state) => state.getActiveSignature)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleCopy = useCallback(async () => {
    const signature = getActiveSignature()
    if (!signature) return

    const html = generateSignatureHtml(signature)
    const success = await copyHtmlToClipboard(html)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    if (success) {
      setLabel('Copied!')
      onCopySuccess?.()
    } else {
      setLabel('Failed to copy')
    }

    timeoutRef.current = setTimeout(() => {
      setLabel('Copy Signature')
    }, 2000)
  }, [getActiveSignature])

  const activeSignature = getActiveSignature()

  return (
    <Button
      variant="primary"
      onClick={handleCopy}
      disabled={!activeSignature}
    >
      {label}
    </Button>
  )
}
