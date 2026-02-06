import { Signature } from '@/lib/schemas/signature.schema'
import { escapeHtml, stripProtocol, generateInitialsAvatarHtml } from '../utils'
import { generateSocialLinksHtml } from '../socialIcons'

export interface LayoutColors {
  primary: string
  accent: string
}

/**
 * Generate a horizontal (photo left, info right) table-based email signature.
 * All styles are inline for maximum email client compatibility.
 */
export function generateHorizontalHtml(signature: Signature, colors: LayoutColors): string {
  const { fullName, jobTitle, company, email, phone, website, imageUrl, socialLinks, customLinks } =
    signature

  // Build the info rows
  const infoRows: string[] = []

  // Name row (always present — fullName is required)
  infoRows.push(
    `<tr><td style="font-size: 16px; font-weight: bold; color: ${colors.primary}; padding-bottom: 2px;">${escapeHtml(fullName)}</td></tr>`
  )

  // Job title | Company row
  const titleParts: string[] = []
  if (jobTitle) titleParts.push(escapeHtml(jobTitle))
  if (company) titleParts.push(escapeHtml(company))
  if (titleParts.length > 0) {
    infoRows.push(
      `<tr><td style="font-size: 13px; color: ${colors.accent}; padding-bottom: 6px;">${titleParts.join(' | ')}</td></tr>`
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
    infoRows.push(
      `<tr><td style="font-size: 13px; color: ${colors.primary}; padding-bottom: 4px;">${contactParts.join(' | ')}</td></tr>`
    )
  }

  // Website row
  if (website) {
    infoRows.push(
      `<tr><td style="font-size: 13px; padding-bottom: 6px;"><a href="${escapeHtml(website)}" style="color: ${colors.accent}; text-decoration: none;">${escapeHtml(stripProtocol(website))}</a></td></tr>`
    )
  }

  // Social links row
  const socialHtml = generateSocialLinksHtml(socialLinks, customLinks, colors.accent)
  if (socialHtml) {
    infoRows.push(`<tr><td style="padding-bottom: 0;">${socialHtml}</td></tr>`)
  }

  // Build the info cell content
  const infoTable = `<table cellpadding="0" cellspacing="0" border="0">${infoRows.join('')}</table>`

  // Build the main row cells
  const cells: string[] = []

  if (imageUrl) {
    cells.push(
      `<td style="vertical-align: top; padding-right: 16px;"><img src="${escapeHtml(imageUrl)}" width="80" height="80" style="border-radius: 50%; display: block;" alt="${escapeHtml(fullName)}" /></td>`
    )
  } else if (fullName) {
    cells.push(
      `<td style="vertical-align: top; padding-right: 16px;">${generateInitialsAvatarHtml(fullName, colors.primary)}</td>`
    )
  }

  cells.push(`<td style="vertical-align: top;">${infoTable}</td>`)

  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: ${colors.primary};"><tr>${cells.join('')}</tr></table>`
}
