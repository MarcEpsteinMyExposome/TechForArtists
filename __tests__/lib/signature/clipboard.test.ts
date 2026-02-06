import { copyHtmlToClipboard } from '@/lib/signature/clipboard'

describe('copyHtmlToClipboard', () => {
  const sampleHtml = '<div><strong>Hello</strong> World</div>'

  beforeEach(() => {
    jest.clearAllMocks()
    // Reset to successful defaults
    ;(navigator.clipboard.write as jest.Mock).mockResolvedValue(undefined)
    ;(navigator.clipboard.writeText as jest.Mock).mockResolvedValue(undefined)
    ;(global.ClipboardItem as unknown) = class ClipboardItem {
      items: Record<string, Blob>
      constructor(items: Record<string, Blob>) {
        this.items = items
      }
    }
  })

  it('copies HTML using ClipboardItem API', async () => {
    const result = await copyHtmlToClipboard(sampleHtml)

    expect(result).toBe(true)
    expect(navigator.clipboard.write).toHaveBeenCalledTimes(1)

    const call = (navigator.clipboard.write as jest.Mock).mock.calls[0]
    const clipboardItems = call[0]
    expect(clipboardItems).toHaveLength(1)
    expect(clipboardItems[0]).toBeInstanceOf(ClipboardItem)
  })

  it('returns true on successful copy', async () => {
    const result = await copyHtmlToClipboard(sampleHtml)
    expect(result).toBe(true)
  })

  it('falls back to writeText when ClipboardItem constructor throws', async () => {
    ;(global.ClipboardItem as unknown) = class ClipboardItem {
      constructor() {
        throw new Error('ClipboardItem not supported')
      }
    }

    const result = await copyHtmlToClipboard(sampleHtml)

    expect(result).toBe(true)
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(sampleHtml)
  })

  it('falls back to writeText when clipboard.write rejects', async () => {
    ;(navigator.clipboard.write as jest.Mock).mockRejectedValue(
      new Error('write failed')
    )

    const result = await copyHtmlToClipboard(sampleHtml)

    expect(result).toBe(true)
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(sampleHtml)
  })

  it('returns false when both write and writeText fail', async () => {
    ;(navigator.clipboard.write as jest.Mock).mockRejectedValue(
      new Error('write failed')
    )
    ;(navigator.clipboard.writeText as jest.Mock).mockRejectedValue(
      new Error('writeText failed')
    )

    const result = await copyHtmlToClipboard(sampleHtml)

    expect(result).toBe(false)
  })
})
