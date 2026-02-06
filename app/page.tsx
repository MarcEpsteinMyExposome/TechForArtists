'use client'

import Link from 'next/link'

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <div className="relative py-24 text-center overflow-hidden rounded-lg">
        {/* Mosaic background with light overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-12"
          style={{ backgroundImage: "url('/images/mosaic-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-white/40" />

        {/* Content */}
        <div className="relative z-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-500 mb-3">
            Technology for Artists
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Email Signature Builder
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Create professional email signatures for Gmail, Outlook, and other email apps.
            Customize colors, layouts, and social links.
          </p>
          <div className="mt-8">
            <Link
              href="/editor"
              className="inline-block rounded-md bg-accent-500 px-6 py-3 text-sm font-semibold text-white hover:bg-accent-600 transition-colors shadow-sm"
            >
              Create Your Signature
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
        <div className="text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-accent-50 text-accent-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-gray-900">Customize Design</h3>
          <p className="mt-1 text-sm text-gray-500">Choose colors, layouts, and branding that match your style.</p>
        </div>
        <div className="text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-accent-50 text-accent-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-gray-900">Add Social Links</h3>
          <p className="mt-1 text-sm text-gray-500">Include links to your portfolio, Instagram, Behance, and more.</p>
        </div>
        <div className="text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-accent-50 text-accent-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9.75a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-gray-900">Copy &amp; Paste</h3>
          <p className="mt-1 text-sm text-gray-500">One-click copy your signature directly into Gmail or Outlook.</p>
        </div>
      </div>
    </div>
  )
}
