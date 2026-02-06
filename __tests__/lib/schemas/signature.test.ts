import { SignatureSchema, CreateSignatureSchema, SocialLinkSchema, CustomLinkSchema, BrandingSchema } from '@/lib/schemas/signature.schema'

describe('SignatureSchema', () => {
  const validSignature = {
    id: crypto.randomUUID(),
    name: 'Work Signature',
    fullName: 'Jane Artist',
    jobTitle: 'Illustrator',
    company: 'Creative Studio',
    email: 'jane@example.com',
    phone: '555-0100',
    website: 'https://janeartist.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  describe('valid data', () => {
    it('accepts a complete valid signature', () => {
      const result = SignatureSchema.safeParse(validSignature)
      expect(result.success).toBe(true)
    })

    it('accepts signature with only required fields', () => {
      const minimal = {
        id: crypto.randomUUID(),
        name: 'Minimal',
        fullName: 'Jane',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      const result = SignatureSchema.safeParse(minimal)
      expect(result.success).toBe(true)
    })

    it('accepts empty string for website', () => {
      const result = SignatureSchema.safeParse({
        ...validSignature,
        website: '',
      })
      expect(result.success).toBe(true)
    })
  })

  describe('invalid data', () => {
    it('rejects signature without name', () => {
      const invalid = { ...validSignature, name: '' }
      const result = SignatureSchema.safeParse(invalid)
      expect(result.success).toBe(false)
    })

    it('rejects signature without fullName', () => {
      const invalid = { ...validSignature, fullName: '' }
      const result = SignatureSchema.safeParse(invalid)
      expect(result.success).toBe(false)
    })

    it('rejects invalid email format', () => {
      const invalid = { ...validSignature, email: 'not-an-email' }
      const result = SignatureSchema.safeParse(invalid)
      expect(result.success).toBe(false)
    })

    it('rejects invalid website URL', () => {
      const invalid = { ...validSignature, website: 'not-a-url' }
      const result = SignatureSchema.safeParse(invalid)
      expect(result.success).toBe(false)
    })

    it('rejects name exceeding 100 characters', () => {
      const invalid = { ...validSignature, name: 'x'.repeat(101) }
      const result = SignatureSchema.safeParse(invalid)
      expect(result.success).toBe(false)
    })
  })

  describe('social links', () => {
    it('accepts signature with empty socialLinks array', () => {
      const result = SignatureSchema.safeParse({
        ...validSignature,
        socialLinks: [],
      })
      expect(result.success).toBe(true)
    })

    it('accepts signature with valid social links', () => {
      const result = SignatureSchema.safeParse({
        ...validSignature,
        socialLinks: [
          { platform: 'instagram', url: 'https://instagram.com/jane' },
          { platform: 'linkedin', url: 'https://linkedin.com/in/jane' },
          { platform: 'behance', url: 'https://behance.net/jane' },
        ],
      })
      expect(result.success).toBe(true)
    })

    it('rejects social link with invalid URL', () => {
      const result = SignatureSchema.safeParse({
        ...validSignature,
        socialLinks: [
          { platform: 'instagram', url: 'not-a-url' },
        ],
      })
      expect(result.success).toBe(false)
    })

    it('enforces max 10 social links', () => {
      const elevenLinks = Array.from({ length: 11 }, (_, i) => ({
        platform: 'instagram' as const,
        url: `https://instagram.com/user${i}`,
      }))
      const result = SignatureSchema.safeParse({
        ...validSignature,
        socialLinks: elevenLinks,
      })
      expect(result.success).toBe(false)
    })

    it('rejects invalid platform enum value', () => {
      const result = SocialLinkSchema.safeParse({
        platform: 'myspace',
        url: 'https://myspace.com/jane',
      })
      expect(result.success).toBe(false)
    })

    it('defaults socialLinks to empty array when omitted', () => {
      const result = SignatureSchema.safeParse(validSignature)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.socialLinks).toEqual([])
      }
    })
  })

  describe('custom links', () => {
    it('accepts signature with empty customLinks array', () => {
      const result = SignatureSchema.safeParse({
        ...validSignature,
        customLinks: [],
      })
      expect(result.success).toBe(true)
    })

    it('accepts signature with valid custom links', () => {
      const result = SignatureSchema.safeParse({
        ...validSignature,
        customLinks: [
          { label: 'Portfolio', url: 'https://portfolio.example.com' },
          { label: 'Shop', url: 'https://shop.example.com' },
        ],
      })
      expect(result.success).toBe(true)
    })

    it('enforces max 5 custom links', () => {
      const sixLinks = Array.from({ length: 6 }, (_, i) => ({
        label: `Link ${i}`,
        url: `https://example.com/${i}`,
      }))
      const result = SignatureSchema.safeParse({
        ...validSignature,
        customLinks: sixLinks,
      })
      expect(result.success).toBe(false)
    })

    it('rejects custom link with empty label', () => {
      const result = CustomLinkSchema.safeParse({
        label: '',
        url: 'https://example.com',
      })
      expect(result.success).toBe(false)
    })

    it('defaults customLinks to empty array when omitted', () => {
      const result = SignatureSchema.safeParse(validSignature)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.customLinks).toEqual([])
      }
    })
  })

  describe('branding', () => {
    it('applies branding defaults when omitted (backward compatibility)', () => {
      const result = SignatureSchema.safeParse(validSignature)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.branding).toEqual({
          colorPresetId: 'charcoal',
          layoutPresetId: 'horizontal',
        })
      }
    })

    it('accepts branding with valid preset IDs', () => {
      const result = SignatureSchema.safeParse({
        ...validSignature,
        branding: {
          colorPresetId: 'navy',
          layoutPresetId: 'stacked',
        },
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.branding.colorPresetId).toBe('navy')
        expect(result.data.branding.layoutPresetId).toBe('stacked')
      }
    })

    it('rejects invalid layout preset', () => {
      const result = BrandingSchema.safeParse({
        colorPresetId: 'charcoal',
        layoutPresetId: 'invalid-layout',
      })
      expect(result.success).toBe(false)
    })
  })
})

describe('CreateSignatureSchema', () => {
  it('accepts input without id, createdAt, updatedAt', () => {
    const input = {
      name: 'New Signature',
      fullName: 'Jane Artist',
      jobTitle: 'Designer',
    }
    const result = CreateSignatureSchema.safeParse(input)
    expect(result.success).toBe(true)
  })

  it('rejects input with missing required fields', () => {
    const input = { jobTitle: 'Designer' }
    const result = CreateSignatureSchema.safeParse(input)
    expect(result.success).toBe(false)
  })
})
