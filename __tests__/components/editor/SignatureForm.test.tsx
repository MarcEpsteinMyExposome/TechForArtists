import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SignatureForm from '@/components/editor/SignatureForm'
import { useAppStore } from '@/lib/store/appStore'
import { createMockSignature } from '@/lib/testing/mockData'

jest.mock('@/lib/store/appStore', () => ({
  useAppStore: jest.fn(),
}))

const mockUseAppStore = useAppStore as unknown as jest.Mock

describe('SignatureForm', () => {
  const mockUpdateSignature = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders placeholder when no active signature', () => {
    mockUseAppStore.mockImplementation((selector: (state: Record<string, unknown>) => unknown) => {
      const state = {
        activeSignatureId: null,
        signatures: [],
        getActiveSignature: () => undefined,
        updateSignature: mockUpdateSignature,
      }
      return typeof selector === 'function' ? selector(state) : state
    })

    render(<SignatureForm />)

    expect(
      screen.getByText('No signature selected. Create or select a signature to start editing.')
    ).toBeInTheDocument()
  })

  it('renders all sections when active signature exists', () => {
    const mockSig = createMockSignature({ id: 'test-id' })

    mockUseAppStore.mockImplementation((selector: (state: Record<string, unknown>) => unknown) => {
      const state = {
        activeSignatureId: 'test-id',
        signatures: [mockSig],
        getActiveSignature: () => mockSig,
        updateSignature: mockUpdateSignature,
      }
      return typeof selector === 'function' ? selector(state) : state
    })

    render(<SignatureForm />)

    // Signature name field
    expect(screen.getByLabelText('Signature Name')).toBeInTheDocument()

    // Personal info section
    expect(screen.getByText('Personal Info')).toBeInTheDocument()
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Job Title')).toBeInTheDocument()
    expect(screen.getByLabelText('Company')).toBeInTheDocument()

    // Contact info section
    expect(screen.getByText('Contact Info')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Phone')).toBeInTheDocument()
    expect(screen.getByLabelText('Website')).toBeInTheDocument()

    // Social links section
    expect(screen.getByText('Social Links')).toBeInTheDocument()

    // Branding section
    expect(screen.getByText('Branding')).toBeInTheDocument()
  })

  it('populates form fields with signature data', () => {
    const mockSig = createMockSignature({
      id: 'test-id',
      name: 'Work Sig',
      fullName: 'Jane Artist',
      jobTitle: 'Illustrator',
      company: 'Creative Studio',
      email: 'jane@example.com',
      phone: '555-0100',
      website: 'https://janeartist.com',
    })

    mockUseAppStore.mockImplementation((selector: (state: Record<string, unknown>) => unknown) => {
      const state = {
        activeSignatureId: 'test-id',
        signatures: [mockSig],
        getActiveSignature: () => mockSig,
        updateSignature: mockUpdateSignature,
      }
      return typeof selector === 'function' ? selector(state) : state
    })

    render(<SignatureForm />)

    expect(screen.getByLabelText('Signature Name')).toHaveValue('Work Sig')
    expect(screen.getByLabelText('Full Name')).toHaveValue('Jane Artist')
    expect(screen.getByLabelText('Job Title')).toHaveValue('Illustrator')
    expect(screen.getByLabelText('Company')).toHaveValue('Creative Studio')
    expect(screen.getByLabelText('Email')).toHaveValue('jane@example.com')
    expect(screen.getByLabelText('Phone')).toHaveValue('555-0100')
    expect(screen.getByLabelText('Website')).toHaveValue('https://janeartist.com')
  })

  it('calls updateSignature when a field changes', async () => {
    const user = userEvent.setup()
    const mockSig = createMockSignature({ id: 'test-id', fullName: 'Jane' })

    mockUseAppStore.mockImplementation((selector: (state: Record<string, unknown>) => unknown) => {
      const state = {
        activeSignatureId: 'test-id',
        signatures: [mockSig],
        getActiveSignature: () => mockSig,
        updateSignature: mockUpdateSignature,
      }
      return typeof selector === 'function' ? selector(state) : state
    })

    render(<SignatureForm />)

    const nameInput = screen.getByLabelText('Signature Name')
    await user.clear(nameInput)
    await user.type(nameInput, 'New Name')

    expect(mockUpdateSignature).toHaveBeenCalledWith('test-id', expect.objectContaining({ name: expect.any(String) }))
  })
})
