import { SocialLink, CustomLink } from '@/lib/schemas/signature.schema'
import { formatPlatformName, escapeHtml, ensureAbsoluteUrl } from './utils'

// ─── Social Icon URL Mapping ────────────────────────────────────────

/**
 * Map of social platforms to their MageCDN icon URLs.
 * Uses SVG format hosted on Cloudflare via MageCDN.
 * Platforms without a CDN icon (vimeo, etsy) map to null.
 */
export const SOCIAL_ICON_URLS: Record<string, string | null> = {
  instagram: 'https://s.magecdn.com/social/tc-instagram.svg',
  linkedin: 'https://s.magecdn.com/social/tc-linkedin.svg',
  behance: 'https://s.magecdn.com/social/tc-behance.svg',
  dribbble: 'https://s.magecdn.com/social/tc-dribbble.svg',
  twitter: 'https://s.magecdn.com/social/tc-twitter.svg',
  tiktok: 'https://s.magecdn.com/social/tc-tiktok.svg',
  youtube: 'https://s.magecdn.com/social/tc-youtube.svg',
  facebook: 'https://s.magecdn.com/social/tc-facebook.svg',
  github: 'https://s.magecdn.com/social/tc-github.svg',
  pinterest: 'https://s.magecdn.com/social/tc-pinterest.svg',
  vimeo: null,
  etsy: null,
}

/**
 * Get the CDN icon URL for a social platform.
 * Returns the icon URL if available, or null if the platform has no icon.
 */
export function getSocialIconUrl(platform: string): string | null {
  return SOCIAL_ICON_URLS[platform] ?? null
}

// ─── HTML Generation ────────────────────────────────────────────────

/**
 * Generate HTML for social and custom links.
 * Social links with CDN icons render as clickable icon images (20x20).
 * Social links without icons and custom links render as text labels.
 * Icon links are separated by spaces; text links by " | " dividers.
 * A " | " separator appears between the icon group and text group.
 * If no links exist, returns an empty string.
 */
export function generateSocialLinksHtml(
  socialLinks: SocialLink[],
  customLinks: CustomLink[],
  accentColor: string
): string {
  const textLinkStyle = `color: ${accentColor}; text-decoration: none; font-size: 12px;`

  // Split social links into icon-capable and text-fallback groups
  const iconTags: string[] = []
  const textTags: string[] = []

  for (const link of socialLinks) {
    const iconUrl = getSocialIconUrl(link.platform)
    if (iconUrl) {
      iconTags.push(
        `<a href="${escapeHtml(ensureAbsoluteUrl(link.url))}" style="text-decoration: none;"><img src="${escapeHtml(iconUrl)}" width="20" height="20" alt="${escapeHtml(formatPlatformName(link.platform))}" style="display: inline-block; vertical-align: middle; border: 0;" /></a>`
      )
    } else {
      textTags.push(
        `<a href="${escapeHtml(ensureAbsoluteUrl(link.url))}" style="${textLinkStyle}">${escapeHtml(formatPlatformName(link.platform))}</a>`
      )
    }
  }

  // Custom links always render as text
  const customTags = customLinks.map(
    (link) =>
      `<a href="${escapeHtml(ensureAbsoluteUrl(link.url))}" style="${textLinkStyle}">${escapeHtml(link.label)}</a>`
  )

  const allTextTags = [...textTags, ...customTags]

  const iconGroup = iconTags.join('&nbsp;')
  const textGroup = allTextTags.join(' &nbsp;|&nbsp; ')

  if (iconGroup && textGroup) {
    return `${iconGroup} &nbsp;|&nbsp; ${textGroup}`
  }

  if (iconGroup) {
    return iconGroup
  }

  if (textGroup) {
    return textGroup
  }

  return ''
}
