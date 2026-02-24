'use client'

import { Signature } from '@/lib/schemas/signature.schema'
import { formatPlatformName, stripProtocol, ensureAbsoluteUrl } from '@/lib/signature/utils'
import { getSocialIconUrl } from '@/lib/signature/iconUrls'

interface SignatureLayoutProps {
  signature: Signature
  colors: { primary: string; accent: string }
}

export default function CompactLayout({ signature, colors }: SignatureLayoutProps) {
  const { fullName, jobTitle, company, email, phone, website, socialLinks, customLinks } =
    signature

  // Line 1: Name | Job Title | Company
  const line1Parts = [fullName, jobTitle, company].filter(Boolean)

  // Line 2: email | phone | website
  const line2Parts = [
    email,
    phone,
    website ? stripProtocol(website) : undefined,
  ].filter(Boolean) as string[]

  // Line 3: Social links
  const hasSocialLinks = socialLinks.length > 0
  const hasCustomLinks = customLinks.length > 0

  return (
    <div className="space-y-1">
      {/* Line 1: Name | Title | Company */}
      <div className="text-sm font-bold" style={{ color: colors.primary }}>
        {line1Parts.join(' | ')}
      </div>

      {/* Line 2: Contact info */}
      {line2Parts.length > 0 && (
        <div className="text-sm text-gray-600">
          {line2Parts.join(' | ')}
        </div>
      )}

      {/* Line 3: Social links */}
      {hasSocialLinks && (
        <div className="flex items-center gap-2 text-xs" style={{ color: colors.accent }}>
          {socialLinks.map((link) => {
            const iconUrl = getSocialIconUrl(link.platform)
            return iconUrl ? (
              <a key={link.platform} href={ensureAbsoluteUrl(link.url)} target="_blank" rel="noopener noreferrer" title={formatPlatformName(link.platform)}>
                <img src={iconUrl} alt={formatPlatformName(link.platform)} className="h-4 w-4" />
              </a>
            ) : (
              <span key={link.platform} className="font-medium">{formatPlatformName(link.platform)}</span>
            )
          })}
        </div>
      )}

      {/* Custom links */}
      {hasCustomLinks && (
        <div className="text-xs" style={{ color: colors.accent }}>
          {customLinks.map((link) => link.label).join(' | ')}
        </div>
      )}
    </div>
  )
}
