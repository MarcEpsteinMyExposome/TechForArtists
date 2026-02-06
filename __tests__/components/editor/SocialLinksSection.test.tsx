import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SocialLinksSection from '@/components/editor/SocialLinksSection'
import { createMockSignature } from '@/lib/testing/mockData'
import { Signature } from '@/lib/schemas/signature.schema'

describe('SocialLinksSection', () => {
  const mockOnUpdate = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  function renderSection(overrides: Partial<Signature> = {}) {
    const signature = createMockSignature(overrides)
    render(<SocialLinksSection signature={signature} onUpdate={mockOnUpdate} />)
    return signature
  }

  it('renders the section heading', () => {
    renderSection()
    expect(screen.getByText('Social Links')).toBeInTheDocument()
  })

  it('renders existing social links', () => {
    renderSection({
      socialLinks: [
        { platform: 'instagram', url: 'https://instagram.com/jane' },
        { platform: 'linkedin', url: 'https://linkedin.com/in/jane' },
      ],
    })

    expect(screen.getByText('Instagram')).toBeInTheDocument()
    expect(screen.getByText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByText('https://instagram.com/jane')).toBeInTheDocument()
    expect(screen.getByText('https://linkedin.com/in/jane')).toBeInTheDocument()
  })

  it('can add a social link', async () => {
    const user = userEvent.setup()
    renderSection()

    // Select a platform
    const platformSelect = screen.getByLabelText('Platform')
    await user.selectOptions(platformSelect, 'instagram')

    // Enter a URL
    const urlInput = screen.getByLabelText('Profile URL')
    await user.type(urlInput, 'https://instagram.com/jane')

    // Click add
    const addButton = screen.getByRole('button', { name: 'Add Social Link' })
    await user.click(addButton)

    expect(mockOnUpdate).toHaveBeenCalledWith({
      socialLinks: [{ platform: 'instagram', url: 'https://instagram.com/jane' }],
    })
  })

  it('can remove a social link', async () => {
    const user = userEvent.setup()
    renderSection({
      socialLinks: [
        { platform: 'instagram', url: 'https://instagram.com/jane' },
        { platform: 'linkedin', url: 'https://linkedin.com/in/jane' },
      ],
    })

    const removeButton = screen.getByRole('button', { name: 'Remove Instagram' })
    await user.click(removeButton)

    expect(mockOnUpdate).toHaveBeenCalledWith({
      socialLinks: [{ platform: 'linkedin', url: 'https://linkedin.com/in/jane' }],
    })
  })

  it('filters out already-used platforms from dropdown', () => {
    renderSection({
      socialLinks: [
        { platform: 'instagram', url: 'https://instagram.com/jane' },
      ],
    })

    const platformSelect = screen.getByLabelText('Platform')
    const options = Array.from(platformSelect.querySelectorAll('option'))
    const optionValues = options.map((opt) => opt.value)

    // Instagram should not be in the dropdown
    expect(optionValues).not.toContain('instagram')

    // Other platforms should still be available
    expect(optionValues).toContain('linkedin')
    expect(optionValues).toContain('behance')
  })

  it('disables add button when platform or URL is empty', () => {
    renderSection()

    const addButton = screen.getByRole('button', { name: 'Add Social Link' })
    expect(addButton).toBeDisabled()
  })

  it('shows custom links section', () => {
    renderSection()
    expect(screen.getByText('Custom Links')).toBeInTheDocument()
  })

  it('renders existing custom links', () => {
    renderSection({
      customLinks: [
        { label: 'Portfolio', url: 'https://portfolio.com' },
      ],
    })

    expect(screen.getByText('Portfolio')).toBeInTheDocument()
    expect(screen.getByText('https://portfolio.com')).toBeInTheDocument()
  })

  it('can add a custom link', async () => {
    const user = userEvent.setup()
    renderSection()

    const labelInput = screen.getByLabelText('Label')
    await user.type(labelInput, 'Portfolio')

    const urlInput = screen.getByLabelText('URL')
    await user.type(urlInput, 'https://portfolio.com')

    const addButton = screen.getByRole('button', { name: 'Add Custom Link' })
    await user.click(addButton)

    expect(mockOnUpdate).toHaveBeenCalledWith({
      customLinks: [{ label: 'Portfolio', url: 'https://portfolio.com' }],
    })
  })

  it('can remove a custom link', async () => {
    const user = userEvent.setup()
    renderSection({
      customLinks: [
        { label: 'Portfolio', url: 'https://portfolio.com' },
        { label: 'Store', url: 'https://store.com' },
      ],
    })

    const removeButton = screen.getByRole('button', { name: 'Remove Portfolio' })
    await user.click(removeButton)

    expect(mockOnUpdate).toHaveBeenCalledWith({
      customLinks: [{ label: 'Store', url: 'https://store.com' }],
    })
  })
})
