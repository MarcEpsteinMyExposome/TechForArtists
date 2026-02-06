import { generateSignatureHtml } from '@/lib/signature/generateHtml'
import { generateHorizontalHtml } from '@/lib/signature/layouts/horizontal'
import { generateStackedHtml } from '@/lib/signature/layouts/stacked'
import { generateCompactHtml } from '@/lib/signature/layouts/compact'
import { createMockSignature } from '@/lib/testing/mockData'

describe('generateHorizontalHtml', () => {
  const colors = { primary: '#333333', accent: '#666666' }

  it('contains the full name in the output', () => {
    const sig = createMockSignature({ fullName: 'Alice Wonder' })
    const html = generateHorizontalHtml(sig, colors)
    expect(html).toContain('Alice Wonder')
  })

  it('contains a <table> element', () => {
    const sig = createMockSignature()
    const html = generateHorizontalHtml(sig, colors)
    expect(html).toContain('<table')
  })

  it('has inline styles', () => {
    const sig = createMockSignature()
    const html = generateHorizontalHtml(sig, colors)
    expect(html).toContain('style="')
  })

  it('omits email row when email is empty', () => {
    const sig = createMockSignature({ email: undefined, phone: undefined })
    const html = generateHorizontalHtml(sig, colors)
    expect(html).not.toContain('mailto:')
  })

  it('includes email as a mailto link when present', () => {
    const sig = createMockSignature({ email: 'test@example.com' })
    const html = generateHorizontalHtml(sig, colors)
    expect(html).toContain('mailto:test@example.com')
    expect(html).toContain('test@example.com')
  })

  it('includes social links when present', () => {
    const sig = createMockSignature({
      socialLinks: [
        { platform: 'instagram', url: 'https://instagram.com/alice' },
        { platform: 'linkedin', url: 'https://linkedin.com/in/alice' },
      ],
    })
    const html = generateHorizontalHtml(sig, colors)
    expect(html).toContain('Instagram')
    expect(html).toContain('LinkedIn')
    expect(html).toContain('https://instagram.com/alice')
  })

  it('omits social links row when no links present', () => {
    const sig = createMockSignature({ socialLinks: [], customLinks: [] })
    const html = generateHorizontalHtml(sig, colors)
    // Should not have a row with link-style font-size: 12px
    expect(html).not.toContain('font-size: 12px')
  })

  it('includes image when imageUrl is provided', () => {
    const sig = createMockSignature({ imageUrl: 'https://example.com/photo.jpg' })
    const html = generateHorizontalHtml(sig, colors)
    expect(html).toContain('<img')
    expect(html).toContain('https://example.com/photo.jpg')
    expect(html).toContain('border-radius: 50%')
  })

  it('omits image cell when imageUrl is not provided', () => {
    const sig = createMockSignature({ imageUrl: undefined })
    const html = generateHorizontalHtml(sig, colors)
    expect(html).not.toContain('<img')
  })

  it('renders job title and company separated by pipe', () => {
    const sig = createMockSignature({ jobTitle: 'Designer', company: 'Acme Inc' })
    const html = generateHorizontalHtml(sig, colors)
    expect(html).toContain('Designer | Acme Inc')
  })

  it('omits title/company row when both are empty', () => {
    const sig = createMockSignature({ jobTitle: undefined, company: undefined })
    const html = generateHorizontalHtml(sig, colors)
    expect(html).not.toContain('font-size: 13px; color: #666666; padding-bottom: 6px')
  })

  it('displays website with stripped protocol', () => {
    const sig = createMockSignature({ website: 'https://janeartist.com' })
    const html = generateHorizontalHtml(sig, colors)
    expect(html).toContain('janeartist.com')
    expect(html).toContain('href="https://janeartist.com"')
  })
})

describe('generateStackedHtml', () => {
  const colors = { primary: '#1a365d', accent: '#2b6cb0' }

  it('contains center-aligned text', () => {
    const sig = createMockSignature()
    const html = generateStackedHtml(sig, colors)
    expect(html).toContain('text-align: center')
  })

  it('contains the full name', () => {
    const sig = createMockSignature({ fullName: 'Bob Stacked' })
    const html = generateStackedHtml(sig, colors)
    expect(html).toContain('Bob Stacked')
  })

  it('includes image when imageUrl is provided', () => {
    const sig = createMockSignature({ imageUrl: 'https://example.com/photo.jpg' })
    const html = generateStackedHtml(sig, colors)
    expect(html).toContain('<img')
  })

  it('uses the provided colors in inline styles', () => {
    const sig = createMockSignature()
    const html = generateStackedHtml(sig, colors)
    expect(html).toContain('#1a365d')
    expect(html).toContain('#2b6cb0')
  })
})

describe('generateCompactHtml', () => {
  const colors = { primary: '#333333', accent: '#666666' }

  it('does not include an <img> tag', () => {
    const sig = createMockSignature({ imageUrl: 'https://example.com/photo.jpg' })
    const html = generateCompactHtml(sig, colors)
    expect(html).not.toContain('<img')
  })

  it('contains the full name', () => {
    const sig = createMockSignature({ fullName: 'Charlie Compact' })
    const html = generateCompactHtml(sig, colors)
    expect(html).toContain('Charlie Compact')
  })

  it('uses compact padding values', () => {
    const sig = createMockSignature()
    const html = generateCompactHtml(sig, colors)
    expect(html).toContain('padding-bottom: 2px')
  })

  it('combines email, phone, and website in one row', () => {
    const sig = createMockSignature({
      email: 'compact@test.com',
      phone: '123-4567',
      website: 'https://compact.com',
    })
    const html = generateCompactHtml(sig, colors)
    expect(html).toContain('compact@test.com')
    expect(html).toContain('123-4567')
    expect(html).toContain('compact.com')
  })
})

describe('HTML escaping in layouts', () => {
  const colors = { primary: '#333333', accent: '#666666' }

  it('escapes HTML entities in company name with ampersand', () => {
    const sig = createMockSignature({ company: 'Art & Design' })
    const html = generateHorizontalHtml(sig, colors)
    expect(html).toContain('Art &amp; Design')
    expect(html).not.toContain('Art & Design')
  })

  it('escapes HTML in full name', () => {
    const sig = createMockSignature({ fullName: '<script>alert("xss")</script>' })
    const html = generateHorizontalHtml(sig, colors)
    expect(html).toContain('&lt;script&gt;')
    expect(html).not.toContain('<script>')
  })
})

describe('colors from presets appear in inline styles', () => {
  it('horizontal layout uses preset colors', () => {
    const sig = createMockSignature({
      branding: { colorPresetId: 'ocean', layoutPresetId: 'horizontal' },
    })
    const html = generateHorizontalHtml(sig, { primary: '#2a4365', accent: '#3182ce' })
    expect(html).toContain('#2a4365')
    expect(html).toContain('#3182ce')
  })

  it('stacked layout uses preset colors', () => {
    const sig = createMockSignature({
      branding: { colorPresetId: 'forest', layoutPresetId: 'stacked' },
    })
    const html = generateStackedHtml(sig, { primary: '#22543d', accent: '#38a169' })
    expect(html).toContain('#22543d')
    expect(html).toContain('#38a169')
  })

  it('compact layout uses preset colors', () => {
    const sig = createMockSignature({
      branding: { colorPresetId: 'wine', layoutPresetId: 'compact' },
    })
    const html = generateCompactHtml(sig, { primary: '#742a2a', accent: '#c53030' })
    expect(html).toContain('#742a2a')
    expect(html).toContain('#c53030')
  })
})

describe('generateSignatureHtml', () => {
  it('routes to horizontal layout', () => {
    const sig = createMockSignature({
      branding: { colorPresetId: 'charcoal', layoutPresetId: 'horizontal' },
    })
    const html = generateSignatureHtml(sig)
    // Horizontal layout has vertical-align: top on cells
    expect(html).toContain('vertical-align: top')
    expect(html).toContain('<table')
  })

  it('routes to stacked layout', () => {
    const sig = createMockSignature({
      branding: { colorPresetId: 'charcoal', layoutPresetId: 'stacked' },
    })
    const html = generateSignatureHtml(sig)
    expect(html).toContain('text-align: center')
  })

  it('routes to compact layout', () => {
    const sig = createMockSignature({
      fullName: 'Compact User',
      imageUrl: 'https://example.com/photo.jpg',
      branding: { colorPresetId: 'charcoal', layoutPresetId: 'compact' },
    })
    const html = generateSignatureHtml(sig)
    // Compact layout never includes images
    expect(html).not.toContain('<img')
    expect(html).toContain('Compact User')
  })

  it('uses the correct color preset colors', () => {
    const sig = createMockSignature({
      branding: { colorPresetId: 'navy', layoutPresetId: 'horizontal' },
    })
    const html = generateSignatureHtml(sig)
    expect(html).toContain('#1a365d')
    expect(html).toContain('#2b6cb0')
  })

  it('falls back to charcoal for unknown color preset', () => {
    const sig = createMockSignature({
      branding: { colorPresetId: 'unknown-preset', layoutPresetId: 'horizontal' },
    })
    const html = generateSignatureHtml(sig)
    expect(html).toContain('#333333')
    expect(html).toContain('#666666')
  })
})
