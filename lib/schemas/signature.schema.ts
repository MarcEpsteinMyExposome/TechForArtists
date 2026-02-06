import { z } from 'zod'

// ─── Social Platforms ───────────────────────────────────────────────

/** Supported social media platforms */
export const SOCIAL_PLATFORMS = [
  'instagram', 'linkedin', 'behance', 'dribbble', 'twitter',
  'tiktok', 'youtube', 'facebook', 'github', 'pinterest',
  'vimeo', 'etsy',
] as const

/** Union type of supported social platform identifiers */
export type SocialPlatform = typeof SOCIAL_PLATFORMS[number]

/** Schema for a social media link */
export const SocialLinkSchema = z.object({
  platform: z.enum(SOCIAL_PLATFORMS),
  url: z.string().url('Invalid URL'),
})

export type SocialLink = z.infer<typeof SocialLinkSchema>

// ─── Custom Links ───────────────────────────────────────────────────

/** Schema for a custom link (portfolio, store, etc.) */
export const CustomLinkSchema = z.object({
  label: z.string().min(1, 'Label is required').max(50),
  url: z.string().url('Invalid URL'),
})

export type CustomLink = z.infer<typeof CustomLinkSchema>

// ─── Color Presets ──────────────────────────────────────────────────

/** Pre-defined color schemes for signatures */
export const COLOR_PRESETS = [
  { id: 'charcoal', label: 'Charcoal', primary: '#333333', accent: '#666666' },
  { id: 'navy', label: 'Navy', primary: '#1a365d', accent: '#2b6cb0' },
  { id: 'forest', label: 'Forest', primary: '#22543d', accent: '#38a169' },
  { id: 'wine', label: 'Burgundy', primary: '#742a2a', accent: '#c53030' },
  { id: 'slate', label: 'Slate', primary: '#4a5568', accent: '#718096' },
  { id: 'midnight', label: 'Midnight', primary: '#1a202c', accent: '#4a5568' },
  { id: 'ocean', label: 'Ocean', primary: '#2a4365', accent: '#3182ce' },
  { id: 'minimal', label: 'Minimal', primary: '#000000', accent: '#888888' },
] as const

/** Union type of color preset IDs (includes 'custom' for user-defined colors) */
export type ColorPresetId = typeof COLOR_PRESETS[number]['id'] | 'custom'

// ─── Layout Presets ─────────────────────────────────────────────────

/** Available layout configurations for signatures */
export const LAYOUT_PRESETS = ['horizontal', 'stacked', 'compact'] as const

/** Union type of layout preset IDs */
export type LayoutPresetId = typeof LAYOUT_PRESETS[number]

// ─── Branding ───────────────────────────────────────────────────────

/** Regex for validating hex color strings (e.g. "#ff5500" or "#FFF") */
const hexColorRegex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/

/** Schema for signature branding options (colors + layout) */
export const BrandingSchema = z.object({
  colorPresetId: z.string().default('charcoal'),
  layoutPresetId: z.enum(LAYOUT_PRESETS).default('horizontal'),
  customPrimary: z.string().regex(hexColorRegex, 'Invalid hex color').optional(),
  customAccent: z.string().regex(hexColorRegex, 'Invalid hex color').optional(),
})

export type Branding = z.infer<typeof BrandingSchema>

// ─── Signature Schema ───────────────────────────────────────────────

/**
 * Email signature schema
 * Defines structure and validation rules for email signatures
 */
export const SignatureSchema = z.object({
  /** Unique identifier */
  id: z.string().uuid(),

  /** Signature name (for managing multiple signatures) */
  name: z.string().min(1, 'Name is required').max(100),

  /** Full name displayed in signature */
  fullName: z.string().min(1, 'Full name is required').max(100),

  /** Job title / role */
  jobTitle: z.string().max(100).optional(),

  /** Company / organization name */
  company: z.string().max(100).optional(),

  /** Email address */
  email: z.string().email('Invalid email address').optional(),

  /** Phone number */
  phone: z.string().max(30).optional(),

  /** Website URL */
  website: z.string().url('Invalid URL').optional().or(z.literal('')),

  /** Profile image URL or base64 */
  imageUrl: z.string().optional(),

  /** Social media profile links */
  socialLinks: z.array(SocialLinkSchema).max(10).default([]),

  /** Custom links (portfolio, store, etc.) */
  customLinks: z.array(CustomLinkSchema).max(5).default([]),

  /** Branding options (color scheme + layout) */
  branding: BrandingSchema.default({ colorPresetId: 'charcoal', layoutPresetId: 'horizontal' }),

  /** Timestamp of creation */
  createdAt: z.string().datetime(),

  /** Timestamp of last update */
  updatedAt: z.string().datetime(),
})

/** TypeScript type inferred from schema */
export type Signature = z.infer<typeof SignatureSchema>

/** Schema for creating a new signature (id and timestamps auto-generated) */
export const CreateSignatureSchema = SignatureSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export type CreateSignatureInput = z.infer<typeof CreateSignatureSchema>
