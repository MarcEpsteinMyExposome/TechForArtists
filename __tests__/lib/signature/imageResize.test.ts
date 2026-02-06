import { resizeImage } from '@/lib/signature/imageResize'

// Mock the Canvas API since jsdom doesn't support it
function createMockCanvas(
  toDataURLReturn = 'data:image/jpeg;base64,mockBase64Data'
) {
  const ctx = {
    drawImage: jest.fn(),
  }
  const canvas = {
    width: 0,
    height: 0,
    getContext: jest.fn().mockReturnValue(ctx),
    toDataURL: jest.fn().mockReturnValue(toDataURLReturn),
  }
  jest.spyOn(document, 'createElement').mockImplementation((tag: string) => {
    if (tag === 'canvas') return canvas as unknown as HTMLCanvasElement
    return document.createElement(tag)
  })
  return { canvas, ctx }
}

// Helper to create a mock File
function createMockFile(
  name = 'photo.jpg',
  type = 'image/jpeg',
  size = 1024
): File {
  const content = new ArrayBuffer(size)
  return new File([content], name, { type })
}

describe('resizeImage', () => {
  let originalCreateElement: typeof document.createElement
  let originalFileReader: typeof FileReader
  let originalImage: typeof Image

  beforeEach(() => {
    originalCreateElement = document.createElement.bind(document)
    originalFileReader = global.FileReader
    originalImage = global.Image
  })

  afterEach(() => {
    jest.restoreAllMocks()
    global.FileReader = originalFileReader
    global.Image = originalImage
  })

  it('rejects non-image files', async () => {
    const file = new File(['hello'], 'doc.txt', { type: 'text/plain' })
    await expect(resizeImage(file)).rejects.toThrow('not an image')
  })

  it('warns for files over 5MB', async () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation()

    // Create a mock that will trigger the size warning but then fail
    // (we just want to check the warning fires)
    const bigFile = createMockFile('big.jpg', 'image/jpeg', 6 * 1024 * 1024)

    // Mock FileReader to trigger onerror so the promise settles
    const MockFileReader = jest.fn().mockImplementation(() => ({
      readAsDataURL: jest.fn(function (this: { onload?: () => void; onerror?: () => void }) {
        // Trigger error to settle the promise
        setTimeout(() => this.onerror?.(), 0)
      }),
      onerror: null as (() => void) | null,
      onload: null as (() => void) | null,
      result: null,
    }))
    global.FileReader = MockFileReader as unknown as typeof FileReader

    try {
      await resizeImage(bigFile)
    } catch {
      // Expected to fail
    }

    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('MB')
    )
  })

  it('resizes a landscape image maintaining aspect ratio', async () => {
    const { canvas, ctx } = createMockCanvas()

    // Mock FileReader
    const MockFileReader = jest.fn().mockImplementation(() => {
      const instance = {
        readAsDataURL: jest.fn(function (this: { onload: () => void; result: string }) {
          this.result = 'data:image/jpeg;base64,fakedata'
          setTimeout(() => this.onload(), 0)
        }),
        onerror: null,
        onload: null as (() => void) | null,
        result: null as string | null,
      }
      return instance
    })
    global.FileReader = MockFileReader as unknown as typeof FileReader

    // Mock Image
    const MockImage = jest.fn().mockImplementation(() => {
      const img = {
        width: 0,
        height: 0,
        src: '',
        onload: null as (() => void) | null,
        onerror: null as (() => void) | null,
      }
      // When src is set, simulate load with a 300x200 landscape image
      Object.defineProperty(img, 'src', {
        set() {
          img.width = 300
          img.height = 200
          setTimeout(() => img.onload?.(), 0)
        },
      })
      return img
    })
    global.Image = MockImage as unknown as typeof Image

    const file = createMockFile('photo.jpg', 'image/jpeg')
    const result = await resizeImage(file, 150)

    expect(result).toBe('data:image/jpeg;base64,mockBase64Data')
    // Width should be maxSize (150), height scaled proportionally: 200/300 * 150 = 100
    expect(canvas.width).toBe(150)
    expect(canvas.height).toBe(100)
    expect(ctx.drawImage).toHaveBeenCalledWith(expect.anything(), 0, 0, 150, 100)
    expect(canvas.toDataURL).toHaveBeenCalledWith('image/jpeg', 0.8)
  })

  it('resizes a portrait image maintaining aspect ratio', async () => {
    const { canvas, ctx } = createMockCanvas()

    const MockFileReader = jest.fn().mockImplementation(() => ({
      readAsDataURL: jest.fn(function (this: { onload: () => void; result: string }) {
        this.result = 'data:image/jpeg;base64,fakedata'
        setTimeout(() => this.onload(), 0)
      }),
      onerror: null,
      onload: null as (() => void) | null,
      result: null as string | null,
    }))
    global.FileReader = MockFileReader as unknown as typeof FileReader

    const MockImage = jest.fn().mockImplementation(() => {
      const img = {
        width: 0,
        height: 0,
        src: '',
        onload: null as (() => void) | null,
        onerror: null as (() => void) | null,
      }
      Object.defineProperty(img, 'src', {
        set() {
          img.width = 200
          img.height = 400
          setTimeout(() => img.onload?.(), 0)
        },
      })
      return img
    })
    global.Image = MockImage as unknown as typeof Image

    const file = createMockFile('portrait.jpg', 'image/jpeg')
    const result = await resizeImage(file, 150)

    expect(result).toBe('data:image/jpeg;base64,mockBase64Data')
    // Height should be maxSize (150), width scaled: 200/400 * 150 = 75
    expect(canvas.width).toBe(75)
    expect(canvas.height).toBe(150)
    expect(ctx.drawImage).toHaveBeenCalledWith(expect.anything(), 0, 0, 75, 150)
  })

  it('does not upscale small images', async () => {
    const { canvas } = createMockCanvas()

    const MockFileReader = jest.fn().mockImplementation(() => ({
      readAsDataURL: jest.fn(function (this: { onload: () => void; result: string }) {
        this.result = 'data:image/jpeg;base64,fakedata'
        setTimeout(() => this.onload(), 0)
      }),
      onerror: null,
      onload: null as (() => void) | null,
      result: null as string | null,
    }))
    global.FileReader = MockFileReader as unknown as typeof FileReader

    const MockImage = jest.fn().mockImplementation(() => {
      const img = {
        width: 0,
        height: 0,
        src: '',
        onload: null as (() => void) | null,
        onerror: null as (() => void) | null,
      }
      Object.defineProperty(img, 'src', {
        set() {
          img.width = 80
          img.height = 60
          setTimeout(() => img.onload?.(), 0)
        },
      })
      return img
    })
    global.Image = MockImage as unknown as typeof Image

    const file = createMockFile('small.jpg', 'image/jpeg')
    await resizeImage(file, 150)

    // Should keep original dimensions since both are under maxSize
    expect(canvas.width).toBe(80)
    expect(canvas.height).toBe(60)
  })

  it('rejects when FileReader fails', async () => {
    const MockFileReader = jest.fn().mockImplementation(() => ({
      readAsDataURL: jest.fn(function (this: { onerror: () => void }) {
        setTimeout(() => this.onerror(), 0)
      }),
      onerror: null as (() => void) | null,
      onload: null,
      result: null,
    }))
    global.FileReader = MockFileReader as unknown as typeof FileReader

    const file = createMockFile('photo.jpg', 'image/jpeg')
    await expect(resizeImage(file)).rejects.toThrow('Failed to read')
  })

  it('rejects when Image fails to load', async () => {
    const MockFileReader = jest.fn().mockImplementation(() => ({
      readAsDataURL: jest.fn(function (this: { onload: () => void; result: string }) {
        this.result = 'data:image/jpeg;base64,fakedata'
        setTimeout(() => this.onload(), 0)
      }),
      onerror: null,
      onload: null as (() => void) | null,
      result: null as string | null,
    }))
    global.FileReader = MockFileReader as unknown as typeof FileReader

    const MockImage = jest.fn().mockImplementation(() => {
      const img = {
        src: '',
        onload: null as (() => void) | null,
        onerror: null as (() => void) | null,
      }
      Object.defineProperty(img, 'src', {
        set() {
          setTimeout(() => img.onerror?.(), 0)
        },
      })
      return img
    })
    global.Image = MockImage as unknown as typeof Image

    const file = createMockFile('corrupt.jpg', 'image/jpeg')
    await expect(resizeImage(file)).rejects.toThrow('Failed to load')
  })

  it('rejects when canvas context is unavailable', async () => {
    // Mock canvas with null context
    const canvas = {
      width: 0,
      height: 0,
      getContext: jest.fn().mockReturnValue(null),
      toDataURL: jest.fn(),
    }
    jest.spyOn(document, 'createElement').mockImplementation((tag: string) => {
      if (tag === 'canvas') return canvas as unknown as HTMLCanvasElement
      return originalCreateElement(tag)
    })

    const MockFileReader = jest.fn().mockImplementation(() => ({
      readAsDataURL: jest.fn(function (this: { onload: () => void; result: string }) {
        this.result = 'data:image/jpeg;base64,fakedata'
        setTimeout(() => this.onload(), 0)
      }),
      onerror: null,
      onload: null as (() => void) | null,
      result: null as string | null,
    }))
    global.FileReader = MockFileReader as unknown as typeof FileReader

    const MockImage = jest.fn().mockImplementation(() => {
      const img = {
        width: 0,
        height: 0,
        src: '',
        onload: null as (() => void) | null,
        onerror: null as (() => void) | null,
      }
      Object.defineProperty(img, 'src', {
        set() {
          img.width = 300
          img.height = 200
          setTimeout(() => img.onload?.(), 0)
        },
      })
      return img
    })
    global.Image = MockImage as unknown as typeof Image

    const file = createMockFile('photo.jpg', 'image/jpeg')
    await expect(resizeImage(file)).rejects.toThrow('Canvas 2D context')
  })
})
