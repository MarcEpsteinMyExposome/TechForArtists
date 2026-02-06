import { SignatureSchema, CreateSignatureSchema } from '@/lib/schemas/signature.schema'

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
