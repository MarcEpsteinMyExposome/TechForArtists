import { render, screen, act } from '@testing-library/react'
import EditorPage from '@/app/editor/page'
import { useAppStore } from '@/lib/store/appStore'

jest.mock('@/lib/store/appStore', () => ({
  useAppStore: jest.fn(),
}))
const mockUseAppStore = useAppStore as unknown as jest.Mock

jest.mock('@/components/editor/SignatureForm', () => {
  return function MockSignatureForm() {
    return <div data-testid="signature-form">SignatureForm</div>
  }
})

jest.mock('@/components/editor/SignaturePreview', () => {
  return function MockSignaturePreview() {
    return <div data-testid="signature-preview">SignaturePreview</div>
  }
})

jest.mock('@/components/editor/CopyButton', () => {
  return function MockCopyButton() {
    return <div data-testid="copy-button">CopyButton</div>
  }
})

const mockAddSignature = jest.fn()
const mockSetActiveSignatureId = jest.fn()

function setupStore(overrides: Record<string, unknown> = {}) {
  const defaultState = {
    signatures: [{ id: 'sig-1', name: 'Test Signature' }],
    activeSignatureId: 'sig-1',
    addSignature: mockAddSignature,
    setActiveSignatureId: mockSetActiveSignatureId,
  }

  const state = { ...defaultState, ...overrides }

  mockUseAppStore.mockImplementation((selector: (s: typeof state) => unknown) => selector(state))
}

beforeEach(() => {
  jest.clearAllMocks()
})

describe('EditorPage', () => {
  it('renders the page heading', async () => {
    setupStore()
    await act(async () => { render(<EditorPage />) })
    expect(screen.getByRole('heading', { name: 'Signature Editor' })).toBeInTheDocument()
  })

  it('renders the subtitle', async () => {
    setupStore()
    await act(async () => { render(<EditorPage />) })
    expect(screen.getByText('Build and customize your email signature here.')).toBeInTheDocument()
  })

  it('renders SignatureForm component after mount', async () => {
    setupStore()
    await act(async () => { render(<EditorPage />) })
    expect(screen.getByTestId('signature-form')).toBeInTheDocument()
  })

  it('renders SignaturePreview component after mount', async () => {
    setupStore()
    await act(async () => { render(<EditorPage />) })
    expect(screen.getByTestId('signature-preview')).toBeInTheDocument()
  })

  it('renders CopyButton component after mount', async () => {
    setupStore()
    await act(async () => { render(<EditorPage />) })
    expect(screen.getByTestId('copy-button')).toBeInTheDocument()
  })

  it('auto-creates a signature when none exist', async () => {
    setupStore({ signatures: [], activeSignatureId: null })
    await act(async () => { render(<EditorPage />) })
    expect(mockAddSignature).toHaveBeenCalledTimes(1)
    expect(mockSetActiveSignatureId).toHaveBeenCalledTimes(1)

    const createdSignature = mockAddSignature.mock.calls[0][0]
    expect(createdSignature).toMatchObject({
      name: 'My Signature',
      fullName: '',
      socialLinks: [],
      customLinks: [],
      branding: { colorPresetId: 'charcoal', layoutPresetId: 'horizontal' },
    })
    expect(createdSignature.id).toBeDefined()
  })

  it('sets first signature as active when signatures exist but none is active', async () => {
    setupStore({
      signatures: [{ id: 'sig-1', name: 'Test' }, { id: 'sig-2', name: 'Test 2' }],
      activeSignatureId: null,
    })
    await act(async () => { render(<EditorPage />) })
    expect(mockSetActiveSignatureId).toHaveBeenCalledWith('sig-1')
    expect(mockAddSignature).not.toHaveBeenCalled()
  })

  it('does not create or set active when signatures exist and one is active', async () => {
    setupStore()
    await act(async () => { render(<EditorPage />) })
    expect(mockAddSignature).not.toHaveBeenCalled()
    expect(mockSetActiveSignatureId).not.toHaveBeenCalled()
  })

})
