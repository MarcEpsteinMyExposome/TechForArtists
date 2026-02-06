import { render, screen } from '@testing-library/react'
import SignaturePreview from '@/components/editor/SignaturePreview'
import { useAppStore } from '@/lib/store/appStore'
import { createMockSignature } from '@/lib/testing/mockData'
import { Signature } from '@/lib/schemas/signature.schema'

// Mock the store
jest.mock('@/lib/store/appStore', () => ({
  useAppStore: jest.fn(),
}))

const mockUseAppStore = useAppStore as unknown as jest.Mock

function setupMockStore(overrides: { activeSignatureId?: string | null; signatures?: Signature[] } = {}) {
  const state = {
    activeSignatureId: overrides.activeSignatureId ?? null,
    signatures: overrides.signatures ?? [],
    getActiveSignature: () =>
      state.signatures.find((s) => s.id === state.activeSignatureId),
  }

  mockUseAppStore.mockImplementation((selector: (s: typeof state) => unknown) => {
    return typeof selector === 'function' ? selector(state) : state
  })

  return state
}

describe('SignaturePreview', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  // 1. Shows placeholder when no active signature
  it('shows placeholder when no active signature', () => {
    setupMockStore({ activeSignatureId: null, signatures: [] })

    render(<SignaturePreview />)

    expect(
      screen.getByText('Start filling in your details to see a preview')
    ).toBeInTheDocument()
  })

  // 2. Renders signature data (name, title, company, email, phone, website)
  it('renders signature data', () => {
    const sig = createMockSignature({
      id: 'test-id',
      fullName: 'Jane Artist',
      jobTitle: 'Illustrator',
      company: 'Creative Studio',
      email: 'jane@example.com',
      phone: '555-0100',
      website: 'https://janeartist.com',
    })

    setupMockStore({ activeSignatureId: 'test-id', signatures: [sig] })

    render(<SignaturePreview />)

    expect(screen.getByText('Jane Artist')).toBeInTheDocument()
    expect(screen.getByText('Illustrator | Creative Studio')).toBeInTheDocument()
    expect(screen.getByText('jane@example.com | 555-0100')).toBeInTheDocument()
    expect(screen.getByText('janeartist.com')).toBeInTheDocument()
  })

  // 3. Shows social links in preview (as icons for supported platforms)
  it('shows social links in preview', () => {
    const sig = createMockSignature({
      id: 'test-id',
      socialLinks: [
        { platform: 'linkedin', url: 'https://linkedin.com/in/jane' },
        { platform: 'instagram', url: 'https://instagram.com/jane' },
        { platform: 'github', url: 'https://github.com/jane' },
      ],
    })

    setupMockStore({ activeSignatureId: 'test-id', signatures: [sig] })

    render(<SignaturePreview />)

    // Platforms with CDN icons render as img elements with alt text
    expect(screen.getByAltText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByAltText('Instagram')).toBeInTheDocument()
    expect(screen.getByAltText('GitHub')).toBeInTheDocument()
  })

  // 4. Shows custom links in preview
  it('shows custom links in preview', () => {
    const sig = createMockSignature({
      id: 'test-id',
      customLinks: [
        { label: 'Portfolio', url: 'https://portfolio.com' },
        { label: 'Shop', url: 'https://shop.com' },
      ],
    })

    setupMockStore({ activeSignatureId: 'test-id', signatures: [sig] })

    render(<SignaturePreview />)

    expect(screen.getByText('Portfolio')).toBeInTheDocument()
    expect(screen.getByText('Shop')).toBeInTheDocument()
  })

  // 5. Renders horizontal layout by default
  it('renders horizontal layout by default', () => {
    const sig = createMockSignature({
      id: 'test-id',
      branding: { colorPresetId: 'charcoal', layoutPresetId: 'horizontal' },
    })

    setupMockStore({ activeSignatureId: 'test-id', signatures: [sig] })

    render(<SignaturePreview />)

    // Horizontal layout uses a flex row with photo on left, info on right
    expect(screen.getByText('Jane Artist')).toBeInTheDocument()
    // Horizontal layout should have the avatar with initials
    expect(screen.getByLabelText('Avatar for Jane Artist')).toBeInTheDocument()
  })

  // 6. Switches to stacked layout when branding.layoutPresetId is 'stacked'
  it('switches to stacked layout when branding.layoutPresetId is stacked', () => {
    const sig = createMockSignature({
      id: 'test-id',
      branding: { colorPresetId: 'charcoal', layoutPresetId: 'stacked' },
    })

    setupMockStore({ activeSignatureId: 'test-id', signatures: [sig] })

    render(<SignaturePreview />)

    // Stacked layout still renders the same data but centered
    expect(screen.getByText('Jane Artist')).toBeInTheDocument()
    expect(screen.getByLabelText('Avatar for Jane Artist')).toBeInTheDocument()
  })

  // 7. Switches to compact layout when branding.layoutPresetId is 'compact'
  it('switches to compact layout when branding.layoutPresetId is compact', () => {
    const sig = createMockSignature({
      id: 'test-id',
      fullName: 'Jane Artist',
      jobTitle: 'Illustrator',
      company: 'Creative Studio',
      branding: { colorPresetId: 'charcoal', layoutPresetId: 'compact' },
    })

    setupMockStore({ activeSignatureId: 'test-id', signatures: [sig] })

    render(<SignaturePreview />)

    // Compact layout shows pipe-separated text, no photo
    expect(screen.getByText('Jane Artist | Illustrator | Creative Studio')).toBeInTheDocument()
    // No avatar in compact layout
    expect(screen.queryByLabelText('Avatar for Jane Artist')).not.toBeInTheDocument()
  })

  // 8. Applies color preset colors (check style attributes)
  it('applies color preset colors', () => {
    const sig = createMockSignature({
      id: 'test-id',
      fullName: 'Jane Artist',
      branding: { colorPresetId: 'navy', layoutPresetId: 'horizontal' },
    })

    setupMockStore({ activeSignatureId: 'test-id', signatures: [sig] })

    render(<SignaturePreview />)

    const nameEl = screen.getByText('Jane Artist')
    // Navy preset: primary = #1a365d
    expect(nameEl).toHaveStyle({ color: '#1a365d' })
  })

  // 9. Shows initials avatar when no imageUrl provided
  it('shows initials avatar when no imageUrl provided', () => {
    const sig = createMockSignature({
      id: 'test-id',
      fullName: 'Jane Artist',
      imageUrl: undefined,
      branding: { colorPresetId: 'charcoal', layoutPresetId: 'horizontal' },
    })

    setupMockStore({ activeSignatureId: 'test-id', signatures: [sig] })

    render(<SignaturePreview />)

    const avatar = screen.getByLabelText('Avatar for Jane Artist')
    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveTextContent('JA')
    // Charcoal primary = #333333
    expect(avatar).toHaveStyle({ backgroundColor: '#333333' })
  })

  // Additional: Shows the "Preview" label
  it('shows the Preview label', () => {
    const sig = createMockSignature({ id: 'test-id' })

    setupMockStore({ activeSignatureId: 'test-id', signatures: [sig] })

    render(<SignaturePreview />)

    expect(screen.getByText('Preview')).toBeInTheDocument()
  })

  // Additional: Placeholder also shows the "Preview" label
  it('shows Preview label even for placeholder state', () => {
    setupMockStore({ activeSignatureId: null, signatures: [] })

    render(<SignaturePreview />)

    expect(screen.getByText('Preview')).toBeInTheDocument()
  })

  // Additional: Social links in compact layout render as icons
  it('shows social link icons in compact layout', () => {
    const sig = createMockSignature({
      id: 'test-id',
      socialLinks: [
        { platform: 'instagram', url: 'https://instagram.com/jane' },
        { platform: 'linkedin', url: 'https://linkedin.com/in/jane' },
      ],
      branding: { colorPresetId: 'charcoal', layoutPresetId: 'compact' },
    })

    setupMockStore({ activeSignatureId: 'test-id', signatures: [sig] })

    render(<SignaturePreview />)

    // Compact layout now renders icons for supported platforms
    expect(screen.getByAltText('Instagram')).toBeInTheDocument()
    expect(screen.getByAltText('LinkedIn')).toBeInTheDocument()
  })

  // Additional: Platforms without CDN icons fall back to text
  it('falls back to text for platforms without CDN icons', () => {
    const sig = createMockSignature({
      id: 'test-id',
      socialLinks: [
        { platform: 'vimeo', url: 'https://vimeo.com/jane' },
        { platform: 'etsy', url: 'https://etsy.com/shop/jane' },
      ],
      branding: { colorPresetId: 'charcoal', layoutPresetId: 'horizontal' },
    })

    setupMockStore({ activeSignatureId: 'test-id', signatures: [sig] })

    render(<SignaturePreview />)

    // Vimeo and Etsy don't have CDN icons, so they fall back to text
    expect(screen.getByText('Vimeo')).toBeInTheDocument()
    expect(screen.getByText('Etsy')).toBeInTheDocument()
  })
})
