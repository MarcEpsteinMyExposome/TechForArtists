'use client'

import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="relative py-24 text-center overflow-hidden rounded-lg">
      {/* Mosaic background with light overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-12"
        style={{ backgroundImage: "url('/images/mosaic-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-white/40" />

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Email Signature Builder
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Create professional email signatures for Gmail, Outlook, and other email apps.
          Customize colors, layouts, and social links.
        </p>
        <div className="mt-8">
          <Link
            href="/editor"
            className="inline-block rounded-md bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
          >
            Create Your Signature
          </Link>
        </div>
        <p className="mt-12 text-sm text-gray-400">
          Built by Technology for Artists
        </p>
      </div>
    </div>
  )
}
