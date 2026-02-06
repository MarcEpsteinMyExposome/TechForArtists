'use client'

import { useEffect, useCallback } from 'react'
import Button from '@/components/ui/Button'
import SetupGuide from '@/components/editor/SetupGuide'

interface SetupGuideModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SetupGuideModal({ isOpen, onClose }: SetupGuideModalProps) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      // Prevent background scrolling while modal is open
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleKeyDown])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="setup-guide-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-xl">
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="mb-6">
            <h2
              id="setup-guide-title"
              className="text-xl font-semibold text-gray-900"
            >
              How to Add Your Signature
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Your signature has been copied! Follow these steps to add it to your email.
            </p>
          </div>

          {/* Body */}
          <SetupGuide />

          {/* Footer */}
          <div className="mt-6 flex justify-end">
            <Button variant="primary" onClick={onClose}>
              Got it
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
