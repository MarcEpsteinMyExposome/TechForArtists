import { Signature } from '@/lib/schemas/signature.schema'

/**
 * Creates a mock signature with default values that can be overridden
 */
export function createMockSignature(overrides: Partial<Signature> = {}): Signature {
  const now = new Date().toISOString()
  return {
    id: crypto.randomUUID(),
    name: 'My Signature',
    fullName: 'Jane Artist',
    jobTitle: 'Illustrator',
    company: 'Creative Studio',
    email: 'jane@example.com',
    phone: '555-0100',
    website: 'https://janeartist.com',
    imageUrl: undefined,
    createdAt: now,
    updatedAt: now,
    ...overrides,
  }
}
