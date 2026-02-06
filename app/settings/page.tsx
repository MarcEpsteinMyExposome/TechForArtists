'use client'

import { useState } from 'react'
import { useAppStore } from '@/lib/store/appStore'

export default function SettingsPage() {
  const signatures = useAppStore((state) => state.signatures)
  const [importStatus, setImportStatus] = useState<string | null>(null)
  const [showClearConfirm, setShowClearConfirm] = useState(false)

  // EXPORT: Download store data as JSON
  const handleExport = () => {
    const data = JSON.stringify({ signatures }, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'email-signatures.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  // IMPORT: Upload JSON file and replace store
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        if (data.signatures && Array.isArray(data.signatures)) {
          useAppStore.setState({ signatures: data.signatures })
          setImportStatus('Data imported successfully.')
        } else {
          setImportStatus('Invalid file format.')
        }
      } catch {
        setImportStatus('Failed to parse file.')
      }
      // Clear status after 3 seconds
      setTimeout(() => setImportStatus(null), 3000)
    }
    reader.readAsText(file)
    // Reset file input so same file can be re-imported
    event.target.value = ''
  }

  // CLEAR: Remove all data
  const handleClear = () => {
    useAppStore.setState({ signatures: [] })
    localStorage.removeItem('tech-for-artists-store')
    setShowClearConfirm(false)
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      <p className="mt-2 text-gray-600">Manage your signature data.</p>

      <div className="mt-8 space-y-8">
        {/* Export Section */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900">Export Data</h2>
          <p className="mt-1 text-sm text-gray-600">
            Download all your signatures as a JSON file.
          </p>
          <button
            onClick={handleExport}
            className="mt-3 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
          >
            Export Signatures ({signatures.length})
          </button>
        </section>

        {/* Import Section */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900">Import Data</h2>
          <p className="mt-1 text-sm text-gray-600">
            Upload a previously exported JSON file to restore your signatures.
          </p>
          <label className="mt-3 inline-block cursor-pointer rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Choose File
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
              aria-label="Import signatures file"
            />
          </label>
          {importStatus && (
            <p className="mt-2 text-sm text-gray-600">{importStatus}</p>
          )}
        </section>

        {/* Clear Section */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900">Clear Data</h2>
          <p className="mt-1 text-sm text-gray-600">
            Permanently delete all signatures. This cannot be undone.
          </p>
          {!showClearConfirm ? (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="mt-3 rounded-md border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              Clear All Data
            </button>
          ) : (
            <div className="mt-3 flex items-center gap-3">
              <button
                onClick={handleClear}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors"
              >
                Yes, Delete Everything
              </button>
              <button
                onClick={() => setShowClearConfirm(false)}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
