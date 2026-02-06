'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import SectionHeading from '@/components/ui/SectionHeading'
import { Signature, SOCIAL_PLATFORMS, SocialLink, CustomLink } from '@/lib/schemas/signature.schema'
import { formatPlatformName } from '@/lib/signature/utils'

interface SocialLinksSectionProps {
  signature: Signature
  onUpdate: (updates: Partial<Signature>) => void
}

export default function SocialLinksSection({ signature, onUpdate }: SocialLinksSectionProps) {
  const [newPlatform, setNewPlatform] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newCustomLabel, setNewCustomLabel] = useState('')
  const [newCustomUrl, setNewCustomUrl] = useState('')

  const usedPlatforms = signature.socialLinks.map((link) => link.platform)
  const availablePlatforms = SOCIAL_PLATFORMS.filter(
    (platform) => !usedPlatforms.includes(platform)
  )

  const handleAddSocialLink = () => {
    if (!newPlatform || !newUrl) return
    const newLink: SocialLink = { platform: newPlatform as SocialLink['platform'], url: newUrl }
    onUpdate({
      socialLinks: [...signature.socialLinks, newLink],
    })
    setNewPlatform('')
    setNewUrl('')
  }

  const handleRemoveSocialLink = (index: number) => {
    onUpdate({
      socialLinks: signature.socialLinks.filter((_, i) => i !== index),
    })
  }

  const handleAddCustomLink = () => {
    if (!newCustomLabel || !newCustomUrl) return
    const newLink: CustomLink = { label: newCustomLabel, url: newCustomUrl }
    onUpdate({
      customLinks: [...signature.customLinks, newLink],
    })
    setNewCustomLabel('')
    setNewCustomUrl('')
  }

  const handleRemoveCustomLink = (index: number) => {
    onUpdate({
      customLinks: signature.customLinks.filter((_, i) => i !== index),
    })
  }

  const platformOptions = [
    { value: '', label: 'Select platform...' },
    ...availablePlatforms.map((platform) => ({
      value: platform,
      label: formatPlatformName(platform),
    })),
  ]

  return (
    <div className="space-y-6">
      <SectionHeading title="Social Links" description="Add links to your social media profiles" />

      {/* Existing Social Links */}
      {signature.socialLinks.length > 0 && (
        <div className="space-y-2">
          {signature.socialLinks.map((link, index) => (
            <div key={`${link.platform}-${index}`} className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700 min-w-[100px]">
                {formatPlatformName(link.platform)}
              </span>
              <span className="text-sm text-gray-500 truncate flex-1">{link.url}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveSocialLink(index)}
                aria-label={`Remove ${formatPlatformName(link.platform)}`}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Add Social Link */}
      {signature.socialLinks.length < 10 && availablePlatforms.length > 0 && (
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <Select
              label="Platform"
              options={platformOptions}
              value={newPlatform}
              onChange={(e) => setNewPlatform(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <Input
              label="Profile URL"
              id="social-link-url"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleAddSocialLink}
            disabled={!newPlatform || !newUrl}
          >
            Add Social Link
          </Button>
        </div>
      )}

      {/* Custom Links */}
      <div className="space-y-4 pt-4 border-t border-gray-200">
        <SectionHeading title="Custom Links" description="Add portfolio, store, or other links" />

        {signature.customLinks.length > 0 && (
          <div className="space-y-2">
            {signature.customLinks.map((link, index) => (
              <div key={`custom-${index}`} className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700 min-w-[100px]">
                  {link.label}
                </span>
                <span className="text-sm text-gray-500 truncate flex-1">{link.url}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveCustomLink(index)}
                  aria-label={`Remove ${link.label}`}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}

        {signature.customLinks.length < 5 && (
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <Input
                label="Label"
                value={newCustomLabel}
                onChange={(e) => setNewCustomLabel(e.target.value)}
                placeholder="e.g., Portfolio"
              />
            </div>
            <div className="flex-1">
              <Input
                label="URL"
                id="custom-link-url"
                value={newCustomUrl}
                onChange={(e) => setNewCustomUrl(e.target.value)}
                placeholder="https://..."
              />
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleAddCustomLink}
              disabled={!newCustomLabel || !newCustomUrl}
            >
              Add Custom Link
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
