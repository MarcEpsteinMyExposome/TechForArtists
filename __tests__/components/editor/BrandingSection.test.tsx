import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BrandingSection from '@/components/editor/BrandingSection'
import { createMockSignature } from '@/lib/testing/mockData'
import { COLOR_PRESETS, Signature } from '@/lib/schemas/signature.schema'

describe('BrandingSection', () => {
  const mockOnUpdate = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  function renderSection(overrides: Partial<Signature> = {}) {
    const signature = createMockSignature(overrides)
    render(<BrandingSection signature={signature} onUpdate={mockOnUpdate} />)
    return signature
  }

  it('renders the section heading', () => {
    renderSection()
    expect(screen.getByText('Branding')).toBeInTheDocument()
  })

  it('renders all color preset swatches', () => {
    renderSection()

    for (const preset of COLOR_PRESETS) {
      expect(
        screen.getByRole('button', { name: `${preset.label} color scheme` })
      ).toBeInTheDocument()
    }
  })

  it('marks the current color preset as selected', () => {
    renderSection({
      branding: { colorPresetId: 'navy', layoutPresetId: 'horizontal' },
    })

    const navyButton = screen.getByRole('button', { name: 'Navy color scheme' })
    expect(navyButton).toHaveAttribute('aria-pressed', 'true')

    const charcoalButton = screen.getByRole('button', { name: 'Charcoal color scheme' })
    expect(charcoalButton).toHaveAttribute('aria-pressed', 'false')
  })

  it('calls onUpdate with new colorPresetId when a swatch is clicked', async () => {
    const user = userEvent.setup()
    renderSection({
      branding: { colorPresetId: 'charcoal', layoutPresetId: 'horizontal' },
    })

    const oceanButton = screen.getByRole('button', { name: 'Ocean color scheme' })
    await user.click(oceanButton)

    expect(mockOnUpdate).toHaveBeenCalledWith({
      branding: { colorPresetId: 'ocean', layoutPresetId: 'horizontal' },
    })
  })

  it('renders all layout options', () => {
    renderSection()

    expect(screen.getByRole('button', { name: 'Horizontal layout' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Stacked layout' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Compact layout' })).toBeInTheDocument()
  })

  it('marks the current layout as selected', () => {
    renderSection({
      branding: { colorPresetId: 'charcoal', layoutPresetId: 'stacked' },
    })

    const stackedButton = screen.getByRole('button', { name: 'Stacked layout' })
    expect(stackedButton).toHaveAttribute('aria-pressed', 'true')

    const horizontalButton = screen.getByRole('button', { name: 'Horizontal layout' })
    expect(horizontalButton).toHaveAttribute('aria-pressed', 'false')
  })

  it('calls onUpdate with new layoutPresetId when a layout is clicked', async () => {
    const user = userEvent.setup()
    renderSection({
      branding: { colorPresetId: 'charcoal', layoutPresetId: 'horizontal' },
    })

    const compactButton = screen.getByRole('button', { name: 'Compact layout' })
    await user.click(compactButton)

    expect(mockOnUpdate).toHaveBeenCalledWith({
      branding: { colorPresetId: 'charcoal', layoutPresetId: 'compact' },
    })
  })
})
