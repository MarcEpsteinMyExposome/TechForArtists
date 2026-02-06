'use client'

import Link from 'next/link'

export default function TemplatesPage() {
  return (
    <div className="py-16 text-center">
      <h1 className="text-2xl font-bold text-gray-900">Signature Templates</h1>
      <p className="mt-4 text-gray-600 max-w-lg mx-auto">
        Pre-built signature templates are coming soon. In the meantime, build your
        signature from scratch in the editor.
      </p>
      <div className="mt-6">
        <Link href="/editor" className="text-sm font-medium text-gray-900 underline hover:text-gray-700">
          Go to Editor
        </Link>
      </div>
    </div>
  )
}
