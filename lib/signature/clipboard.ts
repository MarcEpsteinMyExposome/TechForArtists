/**
 * Strip HTML tags from a string to produce plain text.
 */
function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, '')
}

/**
 * Copy HTML string to clipboard as rich text (text/html).
 * Falls back to plain text clipboard if ClipboardItem is not supported.
 * Returns true on success, false on failure.
 */
export async function copyHtmlToClipboard(html: string): Promise<boolean> {
  try {
    const htmlBlob = new Blob([html], { type: 'text/html' })
    const textBlob = new Blob([stripHtmlTags(html)], { type: 'text/plain' })
    const clipboardItem = new ClipboardItem({
      'text/html': htmlBlob,
      'text/plain': textBlob,
    })
    await navigator.clipboard.write([clipboardItem])
    return true
  } catch {
    // Fallback: copy raw HTML as plain text
    try {
      await navigator.clipboard.writeText(html)
      return true
    } catch {
      return false
    }
  }
}
