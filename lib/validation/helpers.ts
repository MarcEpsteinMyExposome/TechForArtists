import { ZodSchema, ZodError } from 'zod'

/**
 * Validates data against a Zod schema and returns a result object
 */
export function validate<T>(schema: ZodSchema<T>, data: unknown): {
  success: true
  data: T
} | {
  success: false
  errors: string[]
} {
  const result = schema.safeParse(data)

  if (result.success) {
    return { success: true, data: result.data }
  }

  return {
    success: false,
    errors: result.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`),
  }
}

/**
 * Formats Zod errors into user-friendly messages
 */
export function formatZodErrors(error: ZodError): string[] {
  return error.errors.map((e) => {
    const path = e.path.length > 0 ? `${e.path.join('.')}: ` : ''
    return `${path}${e.message}`
  })
}
