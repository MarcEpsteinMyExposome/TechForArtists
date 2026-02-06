import { COLOR_PRESETS, type Branding } from '@/lib/schemas/signature.schema'

/** Escape HTML entities to prevent XSS and rendering issues */
export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/** Resolve a color preset by ID, falls back to charcoal */
export function resolveColorPreset(colorPresetId: string) {
  return COLOR_PRESETS.find((p) => p.id === colorPresetId) ?? COLOR_PRESETS[0]
}

/** Default fallback colors (charcoal) used when custom colors are not set */
const FALLBACK_COLORS = { primary: COLOR_PRESETS[0].primary, accent: COLOR_PRESETS[0].accent }

/**
 * Resolve colors from branding, handling both presets and custom colors.
 * When colorPresetId is 'custom', uses customPrimary/customAccent fields.
 * Falls back to charcoal colors if custom colors aren't set.
 */
export function resolveColors(branding: Branding): { primary: string; accent: string } {
  if (branding.colorPresetId === 'custom') {
    return {
      primary: branding.customPrimary ?? FALLBACK_COLORS.primary,
      accent: branding.customAccent ?? FALLBACK_COLORS.accent,
    }
  }
  const preset = resolveColorPreset(branding.colorPresetId)
  return { primary: preset.primary, accent: preset.accent }
}

/** Strip protocol from URL for display (https://example.com -> example.com) */
export function stripProtocol(url: string): string {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

/** Generate initials from a full name (max 2 chars) */
export function getInitials(fullName: string): string {
  return fullName
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
}

/**
 * Generate an email-compatible HTML circle with initials.
 * Uses a table cell with border-radius for maximum email client support.
 */
export function generateInitialsAvatarHtml(
  fullName: string,
  primaryColor: string,
  size: number = 80
): string {
  const initials = escapeHtml(getInitials(fullName))
  const fontSize = Math.round(size * 0.35)
  return `<table cellpadding="0" cellspacing="0" border="0"><tr><td width="${size}" height="${size}" style="width: ${size}px; height: ${size}px; background-color: ${primaryColor}; border-radius: 50%; text-align: center; vertical-align: middle; font-size: ${fontSize}px; font-weight: bold; color: #ffffff; font-family: Arial, Helvetica, sans-serif;">${initials}</td></tr></table>`
}

/** Capitalize first letter of a platform name for display */
export function formatPlatformName(platform: string): string {
  const special: Record<string, string> = {
    linkedin: 'LinkedIn',
    github: 'GitHub',
    tiktok: 'TikTok',
    youtube: 'YouTube',
  }
  return special[platform] || platform.charAt(0).toUpperCase() + platform.slice(1)
}
