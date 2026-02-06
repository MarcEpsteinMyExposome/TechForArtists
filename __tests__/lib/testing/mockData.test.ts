import { createMockSignature } from '@/lib/testing/mockData'
import { SignatureSchema } from '@/lib/schemas/signature.schema'

describe('createMockSignature', () => {
  it('creates a valid signature', () => {
    const sig = createMockSignature()
    const result = SignatureSchema.safeParse(sig)
    expect(result.success).toBe(true)
  })

  it('uses default values', () => {
    const sig = createMockSignature()
    expect(sig.fullName).toBe('Jane Artist')
    expect(sig.jobTitle).toBe('Illustrator')
  })

  it('allows overriding fields', () => {
    const sig = createMockSignature({ fullName: 'Custom Name', jobTitle: 'Painter' })
    expect(sig.fullName).toBe('Custom Name')
    expect(sig.jobTitle).toBe('Painter')
  })

  it('generates unique IDs', () => {
    const sig1 = createMockSignature()
    const sig2 = createMockSignature()
    expect(sig1.id).not.toBe(sig2.id)
  })
})
