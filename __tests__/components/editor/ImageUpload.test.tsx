import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ImageUpload from '@/components/editor/ImageUpload'
import { createMockSignature } from '@/lib/testing/mockData'
import * as imageResize from '@/lib/signature/imageResize'

jest.mock('@/lib/signature/imageResize', () => ({
  resizeImage: jest.fn(),
}))

const mockResizeImage = imageResize.resizeImage as jest.MockedFunction<typeof imageResize.resizeImage>

describe('ImageUpload', () => {
  const mockOnUpdate = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders section heading', () => {
    const sig = createMockSignature()
    render(<ImageUpload signature={sig} onUpdate={mockOnUpdate} />)

    expect(screen.getByText('Profile Image')).toBeInTheDocument()
    expect(screen.getByText('Upload a headshot or logo for your signature')).toBeInTheDocument()
  })

  it('shows initials avatar when no image is set', () => {
    const sig = createMockSignature({ fullName: 'Jane Artist', imageUrl: undefined })
    render(<ImageUpload signature={sig} onUpdate={mockOnUpdate} />)

    expect(
      screen.getByLabelText('Avatar placeholder for Jane Artist')
    ).toHaveTextContent('JA')
  })

  it('shows "Upload Photo" button when no image', () => {
    const sig = createMockSignature({ imageUrl: undefined })
    render(<ImageUpload signature={sig} onUpdate={mockOnUpdate} />)

    expect(screen.getByRole('button', { name: 'Upload Photo' })).toBeInTheDocument()
  })

  it('shows "Change Photo" button when image is set', () => {
    const sig = createMockSignature({ imageUrl: 'data:image/jpeg;base64,fakedata' })
    render(<ImageUpload signature={sig} onUpdate={mockOnUpdate} />)

    expect(screen.getByRole('button', { name: 'Change Photo' })).toBeInTheDocument()
  })

  it('shows image preview when imageUrl is set', () => {
    const sig = createMockSignature({ imageUrl: 'data:image/jpeg;base64,fakedata' })
    render(<ImageUpload signature={sig} onUpdate={mockOnUpdate} />)

    const img = screen.getByAltText('Jane Artist')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'data:image/jpeg;base64,fakedata')
  })

  it('shows Remove button when image is set', () => {
    const sig = createMockSignature({ imageUrl: 'data:image/jpeg;base64,fakedata' })
    render(<ImageUpload signature={sig} onUpdate={mockOnUpdate} />)

    expect(screen.getByRole('button', { name: 'Remove' })).toBeInTheDocument()
  })

  it('does not show Remove button when no image', () => {
    const sig = createMockSignature({ imageUrl: undefined })
    render(<ImageUpload signature={sig} onUpdate={mockOnUpdate} />)

    expect(screen.queryByRole('button', { name: 'Remove' })).not.toBeInTheDocument()
  })

  it('calls onUpdate with empty string when Remove is clicked', async () => {
    const user = userEvent.setup()
    const sig = createMockSignature({ imageUrl: 'data:image/jpeg;base64,fakedata' })
    render(<ImageUpload signature={sig} onUpdate={mockOnUpdate} />)

    await user.click(screen.getByRole('button', { name: 'Remove' }))

    expect(mockOnUpdate).toHaveBeenCalledWith({ imageUrl: '' })
  })

  it('processes uploaded file and calls onUpdate with base64', async () => {
    const user = userEvent.setup()
    mockResizeImage.mockResolvedValue('data:image/jpeg;base64,resizedData')

    const sig = createMockSignature({ imageUrl: undefined })
    render(<ImageUpload signature={sig} onUpdate={mockOnUpdate} />)

    const file = new File(['fake-image-data'], 'photo.jpg', { type: 'image/jpeg' })
    const input = screen.getByLabelText('Upload profile image')

    await user.upload(input, file)

    await waitFor(() => {
      expect(mockResizeImage).toHaveBeenCalledWith(file, 150)
      expect(mockOnUpdate).toHaveBeenCalledWith({ imageUrl: 'data:image/jpeg;base64,resizedData' })
    })
  })

  it('shows error message when image processing fails', async () => {
    const user = userEvent.setup()
    mockResizeImage.mockRejectedValue(new Error('The selected file is not an image.'))

    const sig = createMockSignature({ imageUrl: undefined })
    render(<ImageUpload signature={sig} onUpdate={mockOnUpdate} />)

    const file = new File(['bad-data'], 'corrupt.jpg', { type: 'image/jpeg' })
    const input = screen.getByLabelText('Upload profile image')

    await user.upload(input, file)

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('The selected file is not an image.')
    })

    expect(mockOnUpdate).not.toHaveBeenCalled()
  })

  it('shows "?" when fullName is empty and no image', () => {
    const sig = createMockSignature({ fullName: '', imageUrl: undefined })
    render(<ImageUpload signature={sig} onUpdate={mockOnUpdate} />)

    expect(
      screen.getByLabelText('Avatar placeholder for user')
    ).toHaveTextContent('?')
  })

  it('has a hidden file input that accepts jpeg and png', () => {
    const sig = createMockSignature()
    render(<ImageUpload signature={sig} onUpdate={mockOnUpdate} />)

    const input = screen.getByLabelText('Upload profile image')
    expect(input).toHaveAttribute('type', 'file')
    expect(input).toHaveAttribute('accept', 'image/jpeg,image/png')
    expect(input).toHaveClass('hidden')
  })
})
