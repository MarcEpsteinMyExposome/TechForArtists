import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SettingsPage from '@/app/settings/page'
import { useAppStore } from '@/lib/store/appStore'
import { createMockSignature } from '@/lib/testing/mockData'

beforeEach(() => {
  localStorage.clear()
  useAppStore.setState({ signatures: [] })
})

describe('SettingsPage', () => {
  it('renders all sections', () => {
    render(<SettingsPage />)
    expect(screen.getByText('Export Data')).toBeInTheDocument()
    expect(screen.getByText('Import Data')).toBeInTheDocument()
    expect(screen.getByText('Clear Data')).toBeInTheDocument()
  })

  it('shows signature count in export button', () => {
    const sig = createMockSignature()
    useAppStore.setState({ signatures: [sig] })
    render(<SettingsPage />)
    expect(screen.getByText('Export Signatures (1)')).toBeInTheDocument()
  })

  it('clears all data after confirmation', async () => {
    const user = userEvent.setup()
    const sig = createMockSignature()
    useAppStore.setState({ signatures: [sig] })
    render(<SettingsPage />)

    await user.click(screen.getByText('Clear All Data'))
    await user.click(screen.getByText('Yes, Delete Everything'))

    expect(useAppStore.getState().signatures).toHaveLength(0)
  })

  it('can cancel clear confirmation', async () => {
    const user = userEvent.setup()
    render(<SettingsPage />)

    await user.click(screen.getByText('Clear All Data'))
    expect(screen.getByText('Yes, Delete Everything')).toBeInTheDocument()

    await user.click(screen.getByText('Cancel'))
    expect(screen.queryByText('Yes, Delete Everything')).not.toBeInTheDocument()
  })
})
