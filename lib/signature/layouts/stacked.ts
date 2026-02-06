import { Signature } from '@/lib/schemas/signature.schema'
import { escapeHtml, stripProtocol, generateInitialsAvatarHtml } from '../utils'
import { generateSocialLinksHtml } from '../socialIcons'
import { LayoutColors } from './horizontal'

/**
 * Generate a stacked (vertical, centered) table-based email signature.
 * Photo on top, info below, all center-aligned.
 */
export function generateStackedHtml(signature: Signature, colors: LayoutColors): string {
  const { fullName, jobTitle, company, email, phone, website, imageUrl, socialLinks, customLinks } =
    signature

  const rows: string[] = []

  // Photo / Avatar row
  if (imageUrl) {
    rows.push(
      `<tr><td style="text-align: center; padding-bottom: 12px;"><img src="${escapeHtml(imageUrl)}" width="80" height="80" style="border-radius: 50%; display: block; margin: 0 auto;" alt="${escapeHtml(fullName)}" /></td></tr>`
    )
  } else if (fullName) {
    rows.push(
      `<tr><td style="text-align: center; padding-bottom: 12px;"><div style="display: inline-block;">${generateInitialsAvatarHtml(fullName, colors.primary)}</div></td></tr>`
    )
  }

  // Name row
  rows.push(
    `<tr><td style="text-align: center; font-size: 16px; font-weight: bold; color: ${colors.primary}; padding-bottom: 2px;">${escapeHtml(fullName)}</td></tr>`
  )

  // Job title | Company row
  const titleParts: string[] = []
  if (jobTitle) titleParts.push(escapeHtml(jobTitle))
  if (company) titleParts.push(escapeHtml(company))
  if (titleParts.length > 0) {
    rows.push(
      `<tr><td style="text-align: center; font-size: 13px; color: ${colors.accent}; padding-bottom: 6px;">${titleParts.join(' | ')}</td></tr>`
    )
  }

  // Email | Phone row
  const contactParts: string[] = []
  if (email) {
    contactParts.push(
      `<a href="mailto:${escapeHtml(email)}" style="color: ${colors.accent}; text-decoration: none;">${escapeHtml(email)}</a>`
    )
  }
  if (phone) {
    contactParts.push(escapeHtml(phone))
  }
  if (contactParts.length > 0) {
    rows.push(
      `<tr><td style="text-align: center; font-size: 13px; color: ${colors.primary}; padding-bottom: 4px;">${contactParts.join(' | ')}</td></tr>`
    )
  }

  // Website row
  if (website) {
    rows.push(
      `<tr><td style="text-align: center; font-size: 13px; padding-bottom: 6px;"><a href="${escapeHtml(website)}" style="color: ${colors.accent}; text-decoration: none;">${escapeHtml(stripProtocol(website))}</a></td></tr>`
    )
  }

  // Social links row
  const socialHtml = generateSocialLinksHtml(socialLinks, customLinks, colors.accent)
  if (socialHtml) {
    rows.push(
      `<tr><td style="text-align: center; padding-bottom: 0;">${socialHtml}</td></tr>`
    )
  }

  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: ${colors.primary};">${rows.join('')}</table>`
}
