import { StateCreator } from 'zustand'
import { Signature } from '@/lib/schemas/signature.schema'

export interface SignatureSlice {
  // State
  signatures: Signature[]

  // Actions
  addSignature: (signature: Signature) => void
  updateSignature: (id: string, updates: Partial<Signature>) => void
  deleteSignature: (id: string) => void
}

export const createSignatureSlice: StateCreator<SignatureSlice> = (set) => ({
  signatures: [],

  addSignature: (signature) =>
    set((state) => ({
      signatures: [...state.signatures, signature],
    })),

  updateSignature: (id, updates) =>
    set((state) => ({
      signatures: state.signatures.map((sig) =>
        sig.id === id ? { ...sig, ...updates, updatedAt: new Date().toISOString() } : sig
      ),
    })),

  deleteSignature: (id) =>
    set((state) => ({
      signatures: state.signatures.filter((sig) => sig.id !== id),
    })),
})
