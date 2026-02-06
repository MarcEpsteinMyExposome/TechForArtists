'use client'

import { useRef, useState } from 'react'
import { Signature } from '@/lib/schemas/signature.schema'
import { resizeImage } from '@/lib/signature/imageResize'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'

interface ImageUploadProps {
  signature: Signature
  onUpdate: (updates: Partial<Signature>) => void
}

function getInitials(fullName: string): string {
  return fullName
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
}

export default function ImageUpload({ signature, onUpdate }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const hasImage = !!signature.imageUrl

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError(null)
    setIsProcessing(true)

    try {
      const base64 = await resizeImage(file, 150)
      onUpdate({ imageUrl: base64 })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process image.')
    } finally {
      setIsProcessing(false)
      // Reset input so the same file can be re-selected
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemove = () => {
    setError(null)
    onUpdate({ imageUrl: '' })
  }

  return (
    <div className="space-y-4">
      <SectionHeading
        title="Profile Image"
        description="Upload a headshot or logo for your signature"
      />

      <div className="flex items-center gap-4">
        {/* Preview circle */}
        <div className="shrink-0">
          {hasImage ? (
            <img
              src={signature.imageUrl}
              alt={signature.fullName || 'Profile image'}
              className="h-16 w-16 rounded-full object-cover border border-gray-200"
            />
          ) : (
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-lg font-semibold text-gray-500"
              aria-label={`Avatar placeholder for ${signature.fullName || 'user'}`}
            >
              {signature.fullName ? getInitials(signature.fullName) : '?'}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleUploadClick}
            disabled={isProcessing}
            type="button"
          >
            {isProcessing ? 'Processing...' : hasImage ? 'Change Photo' : 'Upload Photo'}
          </Button>

          {hasImage && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              type="button"
            >
              Remove
            </Button>
          )}
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png"
          className="hidden"
          onChange={handleFileChange}
          aria-label="Upload profile image"
        />
      </div>

      {/* Error message */}
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
