import { StateCreator } from 'zustand'
import { Signature } from '@/lib/schemas/signature.schema'

export interface SignatureSlice {
  // State
  signatures: Signature[]
  activeSignatureId: string | null

  // Actions
  addSignature: (signature: Signature) => void
  updateSignature: (id: string, updates: Partial<Signature>) => void
  deleteSignature: (id: string) => void
  setActiveSignatureId: (id: string | null) => void

  // Derived
  getActiveSignature: () => Signature | undefined
}

export const createSignatureSlice: StateCreator<SignatureSlice> = (set, get) => ({
  signatures: [],
  activeSignatureId: null,

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

  setActiveSignatureId: (id) =>
    set({ activeSignatureId: id }),

  getActiveSignature: () => {
    const { signatures, activeSignatureId } = get()
    return signatures.find((sig) => sig.id === activeSignatureId)
  },
})
