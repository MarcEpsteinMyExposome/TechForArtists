import { z } from 'zod'

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
