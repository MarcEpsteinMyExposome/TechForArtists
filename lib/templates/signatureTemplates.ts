import type { ColorPresetId, LayoutPresetId, SocialLink, CustomLink } from '@/lib/schemas/signature.schema'

// ─── Template Definition ──────────────────────────────────────────

/** Partial signature data used to pre-fill a new signature from a template */
export interface SignatureTemplateData {
  fullName: string
  jobTitle?: string
  company?: string
  email?: string
  phone?: string
  website?: string
  imageUrl?: string
  socialLinks: SocialLink[]
  customLinks: CustomLink[]
  branding: {
    colorPresetId: ColorPresetId
    layoutPresetId: LayoutPresetId
  }
}

/** A curated signature template with metadata */
export interface SignatureTemplate {
  /** Unique template ID */
  id: string
  /** Display name */
  name: string
  /** Short description shown on the card */
  description: string
  /** Sample signature data used for preview and as starting values */
  data: SignatureTemplateData
}

// ─── Template Definitions ─────────────────────────────────────────

export const SIGNATURE_TEMPLATES: SignatureTemplate[] = [
  {
    id: 'creative-professional',
    name: 'Creative Professional',
    description: 'A stacked, centered layout with ocean-blue tones — perfect for designers, photographers, and visual artists.',
    data: {
      fullName: 'Mia Laurent',
      jobTitle: 'Creative Director',
      company: 'Studio Lumina',
      email: 'mia@studiolumina.co',
      phone: '(415) 555-0192',
      website: 'https://studiolumina.co',
      socialLinks: [
        { platform: 'instagram', url: 'https://instagram.com/studiolumina' },
        { platform: 'behance', url: 'https://behance.net/mialaurent' },
      ],
      customLinks: [],
      branding: {
        colorPresetId: 'ocean',
        layoutPresetId: 'stacked',
      },
    },
  },
  {
    id: 'corporate-classic',
    name: 'Corporate Classic',
    description: 'A polished horizontal layout in navy — ideal for executives, consultants, and traditional business settings.',
    data: {
      fullName: 'James Henderson',
      jobTitle: 'Senior Vice President',
      company: 'Meridian Partners',
      email: 'j.henderson@meridianpartners.com',
      phone: '(212) 555-0147',
      website: 'https://meridianpartners.com',
      socialLinks: [
        { platform: 'linkedin', url: 'https://linkedin.com/in/jameshenderson' },
      ],
      customLinks: [],
      branding: {
        colorPresetId: 'navy',
        layoutPresetId: 'horizontal',
      },
    },
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'A stripped-down compact layout in black — just the essentials, nothing more.',
    data: {
      fullName: 'Alex Kim',
      jobTitle: 'Product Designer',
      email: 'alex@alexkim.design',
      socialLinks: [],
      customLinks: [],
      branding: {
        colorPresetId: 'minimal',
        layoutPresetId: 'compact',
      },
    },
  },
  {
    id: 'bold-colorful',
    name: 'Bold & Colorful',
    description: 'A vibrant horizontal layout in burgundy with multiple social links — great for influencers and public figures.',
    data: {
      fullName: 'Sofia Reyes',
      jobTitle: 'Brand Strategist',
      company: 'Reyes Creative',
      email: 'sofia@reyescreative.com',
      phone: '(310) 555-0283',
      website: 'https://reyescreative.com',
      socialLinks: [
        { platform: 'instagram', url: 'https://instagram.com/sofiareyes' },
        { platform: 'linkedin', url: 'https://linkedin.com/in/sofiareyes' },
        { platform: 'twitter', url: 'https://twitter.com/sofiareyes' },
        { platform: 'youtube', url: 'https://youtube.com/@sofiareyes' },
      ],
      customLinks: [],
      branding: {
        colorPresetId: 'wine',
        layoutPresetId: 'horizontal',
      },
    },
  },
  {
    id: 'tech-founder',
    name: 'Tech Founder',
    description: 'A modern stacked layout in dark midnight tones — tailored for startup founders and engineers.',
    data: {
      fullName: 'Daniel Park',
      jobTitle: 'Co-Founder & CTO',
      company: 'NovaByte Labs',
      email: 'daniel@novabytelabs.io',
      website: 'https://novabytelabs.io',
      socialLinks: [
        { platform: 'github', url: 'https://github.com/danielpark' },
        { platform: 'linkedin', url: 'https://linkedin.com/in/danielpark' },
      ],
      customLinks: [],
      branding: {
        colorPresetId: 'midnight',
        layoutPresetId: 'stacked',
      },
    },
  },
  {
    id: 'freelancer',
    name: 'Freelancer',
    description: 'A compact, forest-green layout with portfolio links — built for independent creatives and contractors.',
    data: {
      fullName: 'Nina Torres',
      jobTitle: 'Freelance Illustrator',
      email: 'nina@ninatorres.art',
      website: 'https://ninatorres.art',
      socialLinks: [
        { platform: 'instagram', url: 'https://instagram.com/ninatorresart' },
      ],
      customLinks: [
        { label: 'Portfolio', url: 'https://ninatorres.art/portfolio' },
        { label: 'Shop', url: 'https://ninatorres.art/shop' },
      ],
      branding: {
        colorPresetId: 'forest',
        layoutPresetId: 'compact',
      },
    },
  },
]
