import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Input from '@/components/ui/Input'

describe('Input', () => {
  it('renders label connected to input', () => {
    render(<Input label="Full Name" />)
    const input = screen.getByLabelText('Full Name')
    expect(input).toBeInTheDocument()
    expect(input.tagName).toBe('INPUT')
  })

  it('generates id from label when id is not provided', () => {
    render(<Input label="Email Address" />)
    const input = screen.getByLabelText('Email Address')
    expect(input).toHaveAttribute('id', 'email-address')
  })

  it('uses provided id instead of generating one', () => {
    render(<Input label="Email Address" id="custom-id" />)
    const input = screen.getByLabelText('Email Address')
    expect(input).toHaveAttribute('id', 'custom-id')
  })

  it('shows error message when error prop is provided', () => {
    render(<Input label="Email" error="Email is required" />)
    expect(screen.getByRole('alert')).toHaveTextContent('Email is required')
  })

  it('sets aria-invalid when error is present', () => {
    render(<Input label="Email" error="Invalid email" />)
    const input = screen.getByLabelText('Email')
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('does not set aria-invalid when there is no error', () => {
    render(<Input label="Email" />)
    const input = screen.getByLabelText('Email')
    expect(input).not.toHaveAttribute('aria-invalid')
  })

  it('shows helper text when helperText prop is provided', () => {
    render(<Input label="Website" helperText="Include https://" />)
    expect(screen.getByText('Include https://')).toBeInTheDocument()
  })

  it('shows error instead of helper text when both are provided', () => {
    render(<Input label="Website" helperText="Include https://" error="Invalid URL" />)
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid URL')
    expect(screen.queryByText('Include https://')).not.toBeInTheDocument()
  })

  it('connects error message via aria-describedby', () => {
    render(<Input label="Email" error="Required" />)
    const input = screen.getByLabelText('Email')
    const errorId = input.getAttribute('aria-describedby')
    expect(errorId).toBeTruthy()
    expect(screen.getByRole('alert')).toHaveAttribute('id', errorId)
  })

  it('connects helper text via aria-describedby', () => {
    render(<Input label="Website" helperText="Include https://" />)
    const input = screen.getByLabelText('Website')
    const helperId = input.getAttribute('aria-describedby')
    expect(helperId).toBeTruthy()
    expect(screen.getByText('Include https://')).toHaveAttribute('id', helperId)
  })

  it('applies error styling when error is present', () => {
    render(<Input label="Email" error="Required" />)
    const input = screen.getByLabelText('Email')
    expect(input.className).toContain('border-red-500')
  })

  it('applies normal styling when there is no error', () => {
    render(<Input label="Email" />)
    const input = screen.getByLabelText('Email')
    expect(input.className).toContain('border-gray-300')
  })

  it('accepts user input', async () => {
    const user = userEvent.setup()
    render(<Input label="Name" />)
    const input = screen.getByLabelText('Name')

    await user.type(input, 'John Doe')
    expect(input).toHaveValue('John Doe')
  })
})
