import { Signature } from '@/lib/schemas/signature.schema'
import { escapeHtml, stripProtocol } from '../utils'
import { generateSocialLinksHtml } from '../socialIcons'
import { LayoutColors } from './horizontal'

/**
 * Generate a compact (text-only, no photo) table-based email signature.
 * Minimal layout with tight padding.
 */
export function generateCompactHtml(signature: Signature, colors: LayoutColors): string {
  const { fullName, jobTitle, company, email, phone, website, socialLinks, customLinks } =
    signature

  const rows: string[] = []

  // Row 1: Full Name — bold
  rows.push(
    `<tr><td style="font-size: 14px; font-weight: bold; color: ${colors.primary}; padding-bottom: 2px;">${escapeHtml(fullName)}</td></tr>`
  )

  // Row 2: Job Title | Company
  const titleParts: string[] = []
  if (jobTitle) titleParts.push(escapeHtml(jobTitle))
  if (company) titleParts.push(escapeHtml(company))
  if (titleParts.length > 0) {
    rows.push(
      `<tr><td style="font-size: 13px; color: ${colors.accent}; padding-bottom: 2px;">${titleParts.join(' | ')}</td></tr>`
    )
  }

  // Row 3: email | phone | website
  const contactParts: string[] = []
  if (email) {
    contactParts.push(
      `<a href="mailto:${escapeHtml(email)}" style="color: ${colors.accent}; text-decoration: none;">${escapeHtml(email)}</a>`
    )
  }
  if (phone) {
    contactParts.push(escapeHtml(phone))
  }
  if (website) {
    contactParts.push(
      `<a href="${escapeHtml(website)}" style="color: ${colors.accent}; text-decoration: none;">${escapeHtml(stripProtocol(website))}</a>`
    )
  }
  if (contactParts.length > 0) {
    rows.push(
      `<tr><td style="font-size: 12px; color: ${colors.primary}; padding-bottom: 4px;">${contactParts.join(' | ')}</td></tr>`
    )
  }

  // Row 4: Social links
  const socialHtml = generateSocialLinksHtml(socialLinks, customLinks, colors.accent)
  if (socialHtml) {
    rows.push(`<tr><td style="padding-bottom: 0;">${socialHtml}</td></tr>`)
  }

  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: ${colors.primary};">${rows.join('')}</table>`
}
