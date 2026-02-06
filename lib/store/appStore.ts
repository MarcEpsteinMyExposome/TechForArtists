import { create } from 'zustand'
import { createSignatureSlice, SignatureSlice } from './signatureSlice'

type AppStore = SignatureSlice

export const useAppStore = create<AppStore>()((...a) => ({
  ...createSignatureSlice(...a),
}))
