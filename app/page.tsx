'use client'

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Email Signature Builder
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Create professional email signatures for Gmail and other email apps.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-indigo-600">Iteration 1</h2>
          <p className="mt-1 text-sm text-gray-500">Foundation & Data Models</p>
          <span className="mt-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">
            Next Up
          </span>
        </div>
      </div>
    </div>
  )
}
