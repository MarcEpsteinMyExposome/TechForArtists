import { escapeHtml, resolveColorPreset, stripProtocol, formatPlatformName } from '@/lib/signature/utils'

describe('escapeHtml', () => {
  it('escapes ampersands', () => {
    expect(escapeHtml('A & B')).toBe('A &amp; B')
  })

  it('escapes less-than signs', () => {
    expect(escapeHtml('<script>')).toBe('&lt;script&gt;')
  })

  it('escapes greater-than signs', () => {
    expect(escapeHtml('a > b')).toBe('a &gt; b')
  })

  it('escapes double quotes', () => {
    expect(escapeHtml('"hello"')).toBe('&quot;hello&quot;')
  })

  it('escapes single quotes', () => {
    expect(escapeHtml("it's")).toBe('it&#39;s')
  })

  it('escapes all special characters together', () => {
    expect(escapeHtml('<a href="x">&\'test\'')).toBe(
      '&lt;a href=&quot;x&quot;&gt;&amp;&#39;test&#39;'
    )
  })

  it('returns empty string unchanged', () => {
    expect(escapeHtml('')).toBe('')
  })

  it('returns plain text unchanged', () => {
    expect(escapeHtml('Hello World')).toBe('Hello World')
  })
})

describe('resolveColorPreset', () => {
  it('returns the correct preset for a known ID', () => {
    const preset = resolveColorPreset('navy')
    expect(preset.id).toBe('navy')
    expect(preset.primary).toBe('#1a365d')
    expect(preset.accent).toBe('#2b6cb0')
  })

  it('returns charcoal preset for each known ID', () => {
    const preset = resolveColorPreset('charcoal')
    expect(preset.id).toBe('charcoal')
    expect(preset.primary).toBe('#333333')
  })

  it('falls back to charcoal for an unknown ID', () => {
    const preset = resolveColorPreset('nonexistent')
    expect(preset.id).toBe('charcoal')
    expect(preset.primary).toBe('#333333')
    expect(preset.accent).toBe('#666666')
  })

  it('falls back to charcoal for an empty string', () => {
    const preset = resolveColorPreset('')
    expect(preset.id).toBe('charcoal')
  })
})

describe('stripProtocol', () => {
  it('strips https:// from a URL', () => {
    expect(stripProtocol('https://example.com')).toBe('example.com')
  })

  it('strips http:// from a URL', () => {
    expect(stripProtocol('http://example.com')).toBe('example.com')
  })

  it('strips trailing slash', () => {
    expect(stripProtocol('https://example.com/')).toBe('example.com')
  })

  it('strips both protocol and trailing slash', () => {
    expect(stripProtocol('https://example.com/')).toBe('example.com')
  })

  it('preserves path segments', () => {
    expect(stripProtocol('https://example.com/path/to/page')).toBe('example.com/path/to/page')
  })

  it('returns string unchanged if no protocol', () => {
    expect(stripProtocol('example.com')).toBe('example.com')
  })
})

describe('formatPlatformName', () => {
  it('formats LinkedIn with special casing', () => {
    expect(formatPlatformName('linkedin')).toBe('LinkedIn')
  })

  it('formats GitHub with special casing', () => {
    expect(formatPlatformName('github')).toBe('GitHub')
  })

  it('formats TikTok with special casing', () => {
    expect(formatPlatformName('tiktok')).toBe('TikTok')
  })

  it('formats YouTube with special casing', () => {
    expect(formatPlatformName('youtube')).toBe('YouTube')
  })

  it('capitalizes first letter for generic platforms', () => {
    expect(formatPlatformName('instagram')).toBe('Instagram')
  })

  it('capitalizes first letter for behance', () => {
    expect(formatPlatformName('behance')).toBe('Behance')
  })

  it('capitalizes first letter for twitter', () => {
    expect(formatPlatformName('twitter')).toBe('Twitter')
  })

  it('capitalizes first letter for dribbble', () => {
    expect(formatPlatformName('dribbble')).toBe('Dribbble')
  })
})
