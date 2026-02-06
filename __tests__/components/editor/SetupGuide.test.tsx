import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SetupGuide from '@/components/editor/SetupGuide'
import SetupGuideModal from '@/components/editor/SetupGuideModal'

describe('SetupGuide', () => {
  it('renders all email client selector buttons', () => {
    render(<SetupGuide />)

    expect(screen.getByRole('button', { name: 'Gmail setup instructions' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Outlook setup instructions' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Apple Mail setup instructions' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Other setup instructions' })).toBeInTheDocument()
  })

  it('shows Gmail instructions by default', () => {
    render(<SetupGuide />)

    expect(screen.getByText(/See all settings/)).toBeInTheDocument()
    expect(screen.getByText(/Signature/)).toBeInTheDocument()
    expect(screen.getByText(/Save Changes/)).toBeInTheDocument()

    // Gmail button should be pressed
    expect(screen.getByRole('button', { name: 'Gmail setup instructions' })).toHaveAttribute(
      'aria-pressed',
      'true'
    )
  })

  it('shows Outlook instructions when Outlook is clicked', async () => {
    const user = userEvent.setup()
    render(<SetupGuide />)

    await user.click(screen.getByRole('button', { name: 'Outlook setup instructions' }))

    expect(screen.getByText(/Signatures/)).toBeInTheDocument()
    expect(screen.getByText(/New signature/i)).toBeInTheDocument()
    expect(screen.getByText(/Click "Save"/)).toBeInTheDocument()

    // Outlook button should be pressed, Gmail should not
    expect(screen.getByRole('button', { name: 'Outlook setup instructions' })).toHaveAttribute(
      'aria-pressed',
      'true'
    )
    expect(screen.getByRole('button', { name: 'Gmail setup instructions' })).toHaveAttribute(
      'aria-pressed',
      'false'
    )
  })

  it('shows Apple Mail instructions when Apple Mail is clicked', async () => {
    const user = userEvent.setup()
    render(<SetupGuide />)

    await user.click(screen.getByRole('button', { name: 'Apple Mail setup instructions' }))

    expect(screen.getByText(/Mail → Settings/)).toBeInTheDocument()
    expect(screen.getByText(/"Signatures" tab/)).toBeInTheDocument()
    expect(screen.getByText(/Always match my default message font/)).toBeInTheDocument()
  })

  it('shows generic instructions when Other is clicked', async () => {
    const user = userEvent.setup()
    render(<SetupGuide />)

    await user.click(screen.getByRole('button', { name: 'Other setup instructions' }))

    expect(screen.getByText(/Most email apps let you add a signature/)).toBeInTheDocument()
    expect(screen.getByText(/Settings/)).toBeInTheDocument()
    expect(screen.getByText(/Preferences/)).toBeInTheDocument()
  })

  it('switches back to Gmail after selecting another client', async () => {
    const user = userEvent.setup()
    render(<SetupGuide />)

    // Switch to Outlook
    await user.click(screen.getByRole('button', { name: 'Outlook setup instructions' }))
    expect(screen.getByText(/Click "Save"/)).toBeInTheDocument()

    // Switch back to Gmail
    await user.click(screen.getByRole('button', { name: 'Gmail setup instructions' }))
    expect(screen.getByText(/Save Changes/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Gmail setup instructions' })).toHaveAttribute(
      'aria-pressed',
      'true'
    )
  })

  it('renders 7 numbered steps for Gmail', () => {
    render(<SetupGuide />)

    const listItems = screen.getAllByRole('listitem')
    expect(listItems).toHaveLength(7)
  })

  it('renders 7 numbered steps for Outlook', async () => {
    const user = userEvent.setup()
    render(<SetupGuide />)

    await user.click(screen.getByRole('button', { name: 'Outlook setup instructions' }))

    const listItems = screen.getAllByRole('listitem')
    expect(listItems).toHaveLength(7)
  })

  it('renders 7 numbered steps for Apple Mail', async () => {
    const user = userEvent.setup()
    render(<SetupGuide />)

    await user.click(screen.getByRole('button', { name: 'Apple Mail setup instructions' }))

    const listItems = screen.getAllByRole('listitem')
    expect(listItems).toHaveLength(7)
  })

  it('does not render an ordered list for Other', async () => {
    const user = userEvent.setup()
    render(<SetupGuide />)

    await user.click(screen.getByRole('button', { name: 'Other setup instructions' }))

    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })
})

describe('SetupGuideModal', () => {
  const mockOnClose = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('does not render when isOpen is false', () => {
    render(<SetupGuideModal isOpen={false} onClose={mockOnClose} />)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.queryByText('How to Add Your Signature')).not.toBeInTheDocument()
  })

  it('renders modal content when isOpen is true', () => {
    render(<SetupGuideModal isOpen={true} onClose={mockOnClose} />)

    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('shows the title "How to Add Your Signature"', () => {
    render(<SetupGuideModal isOpen={true} onClose={mockOnClose} />)

    expect(screen.getByText('How to Add Your Signature')).toBeInTheDocument()
  })

  it('shows the subtitle about signature being copied', () => {
    render(<SetupGuideModal isOpen={true} onClose={mockOnClose} />)

    expect(
      screen.getByText(/Your signature has been copied/)
    ).toBeInTheDocument()
  })

  it('contains the SetupGuide content with email client buttons', () => {
    render(<SetupGuideModal isOpen={true} onClose={mockOnClose} />)

    expect(screen.getByRole('button', { name: 'Gmail setup instructions' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Outlook setup instructions' })).toBeInTheDocument()
  })

  it('"Got it" button calls onClose', async () => {
    const user = userEvent.setup()
    render(<SetupGuideModal isOpen={true} onClose={mockOnClose} />)

    await user.click(screen.getByRole('button', { name: 'Got it' }))

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('pressing Escape key calls onClose', () => {
    render(<SetupGuideModal isOpen={true} onClose={mockOnClose} />)

    fireEvent.keyDown(document, { key: 'Escape' })

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('clicking the backdrop calls onClose', async () => {
    const user = userEvent.setup()
    render(<SetupGuideModal isOpen={true} onClose={mockOnClose} />)

    // The backdrop is the element with aria-hidden="true" inside the dialog
    const dialog = screen.getByRole('dialog')
    const backdrop = dialog.querySelector('[aria-hidden="true"]')!
    await user.click(backdrop)

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('has aria-modal attribute set to true', () => {
    render(<SetupGuideModal isOpen={true} onClose={mockOnClose} />)

    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true')
  })
})
