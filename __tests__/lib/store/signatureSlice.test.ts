import { useAppStore } from '@/lib/store/appStore'
import { createMockSignature } from '@/lib/testing/mockData'

describe('signatureSlice', () => {
  beforeEach(() => {
    localStorage.clear()
    useAppStore.setState({ signatures: [] })
  })

  describe('addSignature', () => {
    it('adds a signature to the store', () => {
      const sig = createMockSignature()
      useAppStore.getState().addSignature(sig)

      expect(useAppStore.getState().signatures).toHaveLength(1)
      expect(useAppStore.getState().signatures[0].fullName).toBe('Jane Artist')
    })

    it('adds multiple signatures', () => {
      const sig1 = createMockSignature({ name: 'Work' })
      const sig2 = createMockSignature({ name: 'Personal' })

      useAppStore.getState().addSignature(sig1)
      useAppStore.getState().addSignature(sig2)

      expect(useAppStore.getState().signatures).toHaveLength(2)
    })
  })

  describe('updateSignature', () => {
    it('updates a signature by id', () => {
      const sig = createMockSignature()
      useAppStore.getState().addSignature(sig)

      useAppStore.getState().updateSignature(sig.id, { fullName: 'Updated Name' })

      const updated = useAppStore.getState().signatures[0]
      expect(updated.fullName).toBe('Updated Name')
    })

    it('does not modify other signatures', () => {
      const sig1 = createMockSignature({ name: 'First' })
      const sig2 = createMockSignature({ name: 'Second' })

      useAppStore.getState().addSignature(sig1)
      useAppStore.getState().addSignature(sig2)
      useAppStore.getState().updateSignature(sig1.id, { fullName: 'Changed' })

      expect(useAppStore.getState().signatures[1].name).toBe('Second')
    })
  })

  describe('deleteSignature', () => {
    it('removes a signature by id', () => {
      const sig = createMockSignature()
      useAppStore.getState().addSignature(sig)

      useAppStore.getState().deleteSignature(sig.id)

      expect(useAppStore.getState().signatures).toHaveLength(0)
    })

    it('only removes the targeted signature', () => {
      const sig1 = createMockSignature({ name: 'Keep' })
      const sig2 = createMockSignature({ name: 'Delete' })

      useAppStore.getState().addSignature(sig1)
      useAppStore.getState().addSignature(sig2)
      useAppStore.getState().deleteSignature(sig2.id)

      expect(useAppStore.getState().signatures).toHaveLength(1)
      expect(useAppStore.getState().signatures[0].name).toBe('Keep')
    })
  })

  describe('persistence', () => {
    it('persists signatures to localStorage', () => {
      const sig = createMockSignature()
      useAppStore.getState().addSignature(sig)

      const stored = localStorage.getItem('tech-for-artists-store')
      expect(stored).not.toBeNull()
      const parsed = JSON.parse(stored!)
      expect(parsed.state.signatures).toHaveLength(1)
      expect(parsed.state.signatures[0].id).toBe(sig.id)
    })
  })
})
