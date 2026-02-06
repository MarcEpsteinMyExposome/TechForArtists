import { z } from 'zod'
import { validate, formatZodErrors } from '@/lib/validation/helpers'

describe('validate', () => {
  const TestSchema = z.object({
    name: z.string().min(1),
    age: z.number().int().positive(),
  })

  it('returns success with parsed data for valid input', () => {
    const result = validate(TestSchema, { name: 'Jane', age: 30 })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.name).toBe('Jane')
      expect(result.data.age).toBe(30)
    }
  })

  it('returns errors for invalid input', () => {
    const result = validate(TestSchema, { name: '', age: -5 })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.errors.length).toBeGreaterThan(0)
    }
  })

  it('returns errors for missing fields', () => {
    const result = validate(TestSchema, {})
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.errors.length).toBeGreaterThan(0)
    }
  })
})

describe('formatZodErrors', () => {
  it('formats Zod errors into readable strings', () => {
    const schema = z.object({
      name: z.string().min(1, 'Name is required'),
      email: z.string().email('Invalid email'),
    })

    const result = schema.safeParse({ name: '', email: 'bad' })
    if (!result.success) {
      const messages = formatZodErrors(result.error)
      expect(messages).toHaveLength(2)
      expect(messages[0]).toContain('name')
      expect(messages[1]).toContain('email')
    }
  })
})
