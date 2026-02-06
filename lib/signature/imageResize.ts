/**
 * Client-side image resizer using the Canvas API.
 *
 * Takes a File (from an <input type="file">) and returns a base64 JPEG
 * data URL, resized so the longest side fits within `maxSize` pixels.
 *
 * No external dependencies — uses native HTMLCanvasElement + Image.
 */

/** Threshold (bytes) above which we log a console warning */
const FILE_SIZE_WARN_BYTES = 5 * 1024 * 1024 // 5 MB

/**
 * Resize an image file to fit within a square of `maxSize` pixels,
 * maintaining aspect ratio, and return a base64 JPEG data URL.
 *
 * @param file       - The image File from a file input
 * @param maxSize    - Maximum width/height in pixels (default 150)
 * @returns            A `data:image/jpeg;base64,...` string
 */
export async function resizeImage(file: File, maxSize = 150): Promise<string> {
  if (!file.type.startsWith('image/')) {
    throw new Error('The selected file is not an image.')
  }

  if (file.size > FILE_SIZE_WARN_BYTES) {
    console.warn(
      `Image file is ${(file.size / 1024 / 1024).toFixed(1)} MB. ` +
        'Large files may take a moment to process.'
    )
  }

  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()

    reader.onerror = () => reject(new Error('Failed to read the image file.'))

    reader.onload = () => {
      const img = new Image()

      img.onerror = () => reject(new Error('Failed to load the image. The file may be corrupt.'))

      img.onload = () => {
        try {
          // Calculate new dimensions preserving aspect ratio
          let width = img.width
          let height = img.height

          if (width > maxSize || height > maxSize) {
            if (width >= height) {
              height = Math.round((height / width) * maxSize)
              width = maxSize
            } else {
              width = Math.round((width / height) * maxSize)
              height = maxSize
            }
          }

          const canvas = document.createElement('canvas')
          canvas.width = width
          canvas.height = height

          const ctx = canvas.getContext('2d')
          if (!ctx) {
            reject(new Error('Canvas 2D context is not available.'))
            return
          }

          ctx.drawImage(img, 0, 0, width, height)
          const dataUrl = canvas.toDataURL('image/jpeg', 0.8)
          resolve(dataUrl)
        } catch (err) {
          reject(new Error('Failed to resize the image.'))
        }
      }

      img.src = reader.result as string
    }

    reader.readAsDataURL(file)
  })
}
