import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createSignatureSlice, SignatureSlice } from './signatureSlice'

type AppStore = SignatureSlice

export const useAppStore = create<AppStore>()(
  persist(
    (...a) => ({
      ...createSignatureSlice(...a),
    }),
    {
      name: 'tech-for-artists-store',
      version: 1,
      partialize: (state) => ({ signatures: state.signatures, activeSignatureId: state.activeSignatureId }),
    }
  )
)
