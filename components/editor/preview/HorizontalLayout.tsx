'use client'

import { Signature } from '@/lib/schemas/signature.schema'
import { formatPlatformName, stripProtocol } from '@/lib/signature/utils'
import { getSocialIconUrl } from '@/lib/signature/iconUrls'

interface SignatureLayoutProps {
  signature: Signature
  colors: { primary: string; accent: string }
}

function getInitials(fullName: string): string {
  return fullName
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
}

export default function HorizontalLayout({ signature, colors }: SignatureLayoutProps) {
  const { fullName, jobTitle, company, email, phone, website, imageUrl, socialLinks, customLinks } =
    signature

  const hasJobOrCompany = jobTitle || company
  const hasContactInfo = email || phone
  const hasWebsite = website
  const hasSocialLinks = socialLinks.length > 0
  const hasCustomLinks = customLinks.length > 0

  return (
    <div className="flex items-start gap-4">
      {/* Photo / Avatar */}
      <div className="shrink-0">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={fullName}
            className="h-16 w-16 rounded-full object-cover"
          />
        ) : (
          <div
            className="flex h-16 w-16 items-center justify-center rounded-full text-lg font-semibold text-white"
            style={{ backgroundColor: colors.primary }}
            aria-label={`Avatar for ${fullName}`}
          >
            {getInitials(fullName)}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        {/* Name */}
        <div className="text-lg font-bold" style={{ color: colors.primary }}>
          {fullName}
        </div>

        {/* Job Title | Company */}
        {hasJobOrCompany && (
          <div className="text-sm" style={{ color: colors.accent }}>
            {[jobTitle, company].filter(Boolean).join(' | ')}
          </div>
        )}

        {/* Email | Phone */}
        {hasContactInfo && (
          <div className="mt-1 text-sm text-gray-600">
            {[email, phone].filter(Boolean).join(' | ')}
          </div>
        )}

        {/* Website */}
        {hasWebsite && (
          <div className="text-sm text-gray-600">
            {stripProtocol(website!)}
          </div>
        )}

        {/* Social Links */}
        {hasSocialLinks && (
          <div className="mt-1 flex flex-wrap items-center gap-2">
            {socialLinks.map((link) => {
              const iconUrl = getSocialIconUrl(link.platform)
              return iconUrl ? (
                <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer" title={formatPlatformName(link.platform)}>
                  <img src={iconUrl} alt={formatPlatformName(link.platform)} className="h-5 w-5" />
                </a>
              ) : (
                <span
                  key={link.platform}
                  className="text-xs font-medium"
                  style={{ color: colors.accent }}
                >
                  {formatPlatformName(link.platform)}
                </span>
              )
            })}
          </div>
        )}

        {/* Custom Links */}
        {hasCustomLinks && (
          <div className="mt-1 flex flex-wrap gap-2">
            {customLinks.map((link) => (
              <span
                key={link.label}
                className="text-xs font-medium"
                style={{ color: colors.accent }}
              >
                {link.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
