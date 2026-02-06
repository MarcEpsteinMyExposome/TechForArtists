import { render, screen, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CopyButton from '@/components/editor/CopyButton'
import { useAppStore } from '@/lib/store/appStore'
import { copyHtmlToClipboard } from '@/lib/signature/clipboard'
import { createMockSignature } from '@/lib/testing/mockData'

jest.mock('@/lib/store/appStore', () => ({
  useAppStore: jest.fn(),
}))

jest.mock('@/lib/signature/clipboard', () => ({
  copyHtmlToClipboard: jest.fn(),
}))

jest.mock('@/lib/signature/generateHtml', () => ({
  generateSignatureHtml: jest.fn(() => '<div>Mock HTML</div>'),
}))

const mockUseAppStore = useAppStore as unknown as jest.Mock
const mockCopyHtml = copyHtmlToClipboard as jest.Mock

function setupWithSignature() {
  mockUseAppStore.mockImplementation((selector: (state: Record<string, unknown>) => unknown) => {
    const state = {
      activeSignatureId: 'test-id',
      signatures: [createMockSignature({ id: 'test-id' })],
      getActiveSignature: () => state.signatures[0],
      updateSignature: jest.fn(),
    }
    return typeof selector === 'function' ? selector(state) : state
  })
}

function setupWithoutSignature() {
  mockUseAppStore.mockImplementation((selector: (state: Record<string, unknown>) => unknown) => {
    const state = {
      activeSignatureId: null,
      signatures: [],
      getActiveSignature: () => undefined,
    }
    return typeof selector === 'function' ? selector(state) : state
  })
}

describe('CopyButton', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
    mockCopyHtml.mockResolvedValue(true)
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('renders with "Copy Signature" text', () => {
    setupWithSignature()
    render(<CopyButton />)
    expect(screen.getByRole('button', { name: 'Copy Signature' })).toBeInTheDocument()
  })

  it('is disabled when no active signature', () => {
    setupWithoutSignature()
    render(<CopyButton />)
    expect(screen.getByRole('button', { name: 'Copy Signature' })).toBeDisabled()
  })

  it('is enabled when active signature exists', () => {
    setupWithSignature()
    render(<CopyButton />)
    expect(screen.getByRole('button', { name: 'Copy Signature' })).toBeEnabled()
  })

  it('copies HTML to clipboard on click', async () => {
    setupWithSignature()
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    render(<CopyButton />)

    await user.click(screen.getByRole('button', { name: 'Copy Signature' }))

    await waitFor(() => {
      expect(mockCopyHtml).toHaveBeenCalledWith('<div>Mock HTML</div>')
    })
  })

  it('shows "Copied!" feedback after successful copy', async () => {
    setupWithSignature()
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    render(<CopyButton />)

    await user.click(screen.getByRole('button', { name: 'Copy Signature' }))

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Copied!' })).toBeInTheDocument()
    })
  })

  it('reverts to "Copy Signature" after 2 seconds', async () => {
    setupWithSignature()
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    render(<CopyButton />)

    await user.click(screen.getByRole('button', { name: 'Copy Signature' }))

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Copied!' })).toBeInTheDocument()
    })

    act(() => {
      jest.advanceTimersByTime(2000)
    })

    expect(screen.getByRole('button', { name: 'Copy Signature' })).toBeInTheDocument()
  })

  it('shows "Failed to copy" when clipboard fails', async () => {
    setupWithSignature()
    mockCopyHtml.mockResolvedValue(false)
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    render(<CopyButton />)

    await user.click(screen.getByRole('button', { name: 'Copy Signature' }))

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Failed to copy' })).toBeInTheDocument()
    })
  })
})
