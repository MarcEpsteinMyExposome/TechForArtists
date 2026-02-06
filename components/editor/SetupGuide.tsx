'use client'

import { useState } from 'react'

interface SetupGuideProps {
  className?: string
}

type EmailClient = 'gmail' | 'outlook' | 'apple-mail' | 'other'

interface ClientOption {
  id: EmailClient
  label: string
  icon: string
}

const CLIENT_OPTIONS: ClientOption[] = [
  { id: 'gmail', label: 'Gmail', icon: '✉' },
  { id: 'outlook', label: 'Outlook', icon: '📧' },
  { id: 'apple-mail', label: 'Apple Mail', icon: '💌' },
  { id: 'other', label: 'Other', icon: '📨' },
]

const STEPS: Record<EmailClient, string[]> = {
  gmail: [
    'Open Gmail in your browser.',
    'Click the gear icon (Settings) in the top right.',
    'Click "See all settings".',
    'Scroll down to the "Signature" section.',
    'Click "Create new" and give it a name (or edit an existing one).',
    'Click inside the signature text box and paste (Ctrl+V on Windows, Cmd+V on Mac).',
    'Scroll to the bottom and click "Save Changes".',
  ],
  outlook: [
    'Open Outlook in your browser.',
    'Click the gear icon (Settings) in the top right.',
    'Go to Account \u2192 Signatures (or search for "Signatures" in settings).',
    'Click "+ New signature" and give it a name.',
    'Click inside the signature box and paste (Ctrl+V on Windows, Cmd+V on Mac).',
    'Click "Save".',
    'Optional: Set it as your default signature using the dropdown below.',
  ],
  'apple-mail': [
    'Open the Mail app.',
    'In the menu bar, click Mail \u2192 Settings.',
    'Click the "Signatures" tab.',
    'Select your email account on the left.',
    'Click the "+" button to add a new signature.',
    'Uncheck "Always match my default message font".',
    'Click in the preview area on the right and paste (Cmd+V).',
  ],
  other: [],
}

export default function SetupGuide({ className = '' }: SetupGuideProps) {
  const [selectedClient, setSelectedClient] = useState<EmailClient>('gmail')

  const steps = STEPS[selectedClient]

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Client Selector Tabs */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">Choose your email app</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {CLIENT_OPTIONS.map((client) => (
            <button
              key={client.id}
              type="button"
              onClick={() => setSelectedClient(client.id)}
              className={`flex flex-col items-center gap-1.5 px-3 py-3 rounded-lg border text-center transition-colors ${
                selectedClient === client.id
                  ? 'border-gray-900 bg-gray-50 ring-1 ring-gray-900'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
              aria-label={`${client.label} setup instructions`}
              aria-pressed={selectedClient === client.id}
            >
              <span className="text-xl" aria-hidden="true">{client.icon}</span>
              <span className="text-sm font-medium text-gray-900">{client.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
        {selectedClient === 'other' ? (
          <div className="text-sm text-gray-700 leading-relaxed space-y-3">
            <p>
              Most email apps let you add a signature in their <strong>Settings</strong> or{' '}
              <strong>Preferences</strong>.
            </p>
            <p>
              Look for a section called <strong>&quot;Signatures&quot;</strong> or{' '}
              <strong>&quot;Email Signature&quot;</strong>. Once you find it, create a new
              signature and paste what you copied!
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Tip: Use Ctrl+V (Windows) or Cmd+V (Mac) to paste.
            </p>
          </div>
        ) : (
          <ol className="space-y-3">
            {steps.map((step, index) => (
              <li key={index} className="flex gap-3 text-sm leading-relaxed">
                <span
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                  style={{ backgroundColor: '#D4A843' }}
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <span className="text-gray-700 pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        )}
      </div>

      {/* Helpful note */}
      <p className="text-xs text-gray-500 leading-relaxed">
        After pasting, your signature should appear with all your info, colors, and links
        intact. If it looks plain or loses its formatting, try using Google Chrome &mdash;
        it has the best support for rich-text pasting.
      </p>
    </div>
  )
}
