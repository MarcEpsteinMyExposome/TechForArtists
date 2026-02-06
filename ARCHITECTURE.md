# Architecture Overview

**Project:** Tech For Artists - Email Signature Builder
**Last Updated:** 2026-02-06 (Iteration 2 — Waves 1-5 complete, 9/10 tasks + social media icons)
**Purpose:** Living document explaining how the codebase is structured and how pieces connect

---

## Tech Stack

### Core Technologies
- **Next.js 16.1.1** - React framework with App Router (file-based routing)
- **React 19.2.3** - UI library with hooks
- **TypeScript 5** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework

### State Management & Validation
- **Zustand 5.0.3** - Lightweight state management with persist middleware (localStorage)
- **Zod 3.24.1** - Schema validation with TypeScript type inference

### Testing
- **Jest 29.7.0** - Test runner and assertion library
- **React Testing Library 16.3.2** - Component testing utilities
- **@testing-library/jest-dom** - Custom Jest matchers for DOM
- **@testing-library/user-event** - Simulate user interactions

---

## Folder Structure

```
TechForArtists/
├── app/                          # Next.js App Router directory
│   ├── layout.tsx               # Root layout with navigation
│   ├── page.tsx                 # Home page with hero + CTA
│   ├── globals.css              # Tailwind imports and global styles
│   ├── editor/                  # Signature editor route
│   │   └── page.tsx             # Two-column editor (form + preview)
│   ├── templates/               # Template gallery route
│   │   └── page.tsx
│   └── settings/                # Settings/data management route
│       └── page.tsx             # Export/import/clear data
│
├── components/                   # React components
│   ├── editor/                  # Signature editor components
│   │   ├── SignatureForm.tsx     # Multi-section form orchestrator
│   │   ├── SignatureNameField.tsx
│   │   ├── PersonalInfoSection.tsx
│   │   ├── ContactInfoSection.tsx
│   │   ├── SocialLinksSection.tsx # Add/remove social + custom links
│   │   ├── BrandingSection.tsx   # Color swatches + layout picker
│   │   ├── SignaturePreview.tsx  # Live preview container
│   │   ├── CopyButton.tsx       # Copy-to-clipboard with feedback
│   │   └── preview/             # Layout-specific preview renderers
│   │       ├── HorizontalLayout.tsx
│   │       ├── StackedLayout.tsx
│   │       └── CompactLayout.tsx
│   ├── templates/               # Template components (future)
│   ├── ui/                      # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Card.tsx
│   │   └── SectionHeading.tsx
│   └── layout/                  # Layout components (future)
│
├── lib/                         # Business logic and utilities
│   ├── schemas/                 # Zod validation schemas
│   │   ├── signature.schema.ts  # Signature + social links + branding schemas
│   │   └── index.ts             # Barrel export
│   ├── store/                   # Zustand state management
│   │   ├── appStore.ts          # Main store with persist middleware
│   │   └── signatureSlice.ts    # Signature CRUD + activeSignatureId
│   ├── signature/               # HTML signature generation engine
│   │   ├── generateHtml.ts      # Layout router
│   │   ├── clipboard.ts         # Copy HTML to clipboard (ClipboardItem API)
│   │   ├── utils.ts             # escapeHtml, resolveColorPreset, getInitials, etc.
│   │   ├── socialIcons.ts       # Social/custom link HTML generation + CDN icon URL mapping
│   │   ├── iconUrls.ts          # Re-export of getSocialIconUrl (used by preview components)
│   │   └── layouts/             # Email-compatible table-based HTML
│   │       ├── horizontal.ts    # Photo left, info right
│   │       ├── stacked.ts       # Centered vertical stack
│   │       └── compact.ts       # Text-only, no photo
│   ├── validation/              # Validation helpers
│   │   └── helpers.ts
│   └── testing/                 # Mock data factories
│       └── mockData.ts
│
├── __tests__/                   # Test files (mirrors source structure)
│
├── .claude/                     # Claude Code workflow
│   └── tasks/                   # Active task specs
│       └── archive/             # Completed task specs
│
├── CLAUDE.md                    # Project context for Claude Code
├── TASKS.md                     # Central task tracking
├── SESSION.md                   # Session continuity notes
├── ARCHITECTURE.md              # This file
├── DECISIONS.md                 # Architectural decision records
├── PATTERNS.md                  # Code patterns and conventions
│
├── jest.config.js               # Jest test configuration
├── jest.setup.js                # Jest environment setup (+ clipboard mock)
├── next.config.ts               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
├── postcss.config.mjs           # PostCSS configuration
├── eslint.config.mjs            # ESLint rules
├── package.json                 # Dependencies and scripts
└── .gitignore                   # Git exclusions
```

---

## Data Flow Architecture

```
User Interaction (Editor Form)
    ↓
Event Handler (onChange in section component)
    ↓
Zustand Action (updateSignature via store)
    ↓
State Update (immutable, persisted to localStorage)
    ↓
React Re-render (automatic via Zustand selector)
    ↓
Live Preview Update (SignaturePreview reads from store)
```

**Example Flow: Editing a Signature**
1. User types in the "Full Name" field in PersonalInfoSection
2. onChange calls `onUpdate({ fullName: newValue })`
3. SignatureForm calls `updateSignature(activeSignatureId, updates)`
4. Zustand store updates the signature immutably, sets new updatedAt
5. Persist middleware writes to localStorage
6. SignaturePreview re-renders with new data
7. Preview shows updated name in real-time

**Example Flow: Copying a Signature**
1. User clicks "Copy Signature" button
2. CopyButton gets active signature via `getActiveSignature()`
3. Calls `generateSignatureHtml(signature)` — routes to correct layout
4. Layout generates table-based HTML with inline styles
5. Calls `copyHtmlToClipboard(html)` — uses ClipboardItem API with text/html
6. Button shows "Copied!" feedback for 2 seconds
7. User pastes into Gmail/Outlook — formatted signature appears

---

## Key Architectural Decisions

See `DECISIONS.md` for full ADR records.

- **Zustand** over Redux — simpler API, sufficient for this app
- **Zod** for validation — type inference, runtime safety
- **Jest + React Testing Library** — test user behavior, not implementation
- **Next.js App Router** — file-based routing, server components
- **Test-aware development** — tests required but not strict TDD
- **Table-based HTML** for email signatures — maximum email client compatibility
- **ClipboardItem API** with text/html — rich text paste into email clients
- **Inline styles only** in email HTML — email clients strip `<style>` blocks
- **Mounted guard** on editor page — prevents Zustand persist hydration mismatch

---

## Testing Strategy

### Test Types
1. **Unit Tests** - Individual functions (lib/*)
2. **Component Tests** - React components with user interactions
3. **Integration Tests** - Multiple components working together
4. **Schema Tests** - Zod validation (valid/invalid data)

### Current Stats
- **178 tests** passing across **16 test suites**
- Build passes, lint clean (0 errors)

### Coverage Goals
- **100%** on schemas and validation
- **80%+** on business logic (lib/*)
- **70%+** on components (critical paths)

---

## Current Implementation Status

### Completed
**Iteration 1: Foundation & Data Models**
- Signature schema, Zustand store, mock data factory, documentation system

**Iteration 2: Usable Editor + Deploy (9/10 tasks done)**
- Expanded schema with social links (12 platforms), custom links, branding (8 color presets, 3 layouts)
- localStorage persistence via Zustand persist middleware
- UI component library (Button, Input, Select, Card, SectionHeading)
- HTML signature generation engine (3 layouts, email-compatible)
- Multi-section editor form with live store integration
- Live signature preview with 3 layout renderers
- Copy-to-clipboard with rich text HTML + "Copied!" feedback
- Editor page assembly with two-column layout + auto-create signature
- Email HTML with initials avatar circle (table-based, email-client compatible)
- Social media icons via MageCDN (SVG icons for 10 platforms, text fallback for vimeo/etsy)
- Home page with hero + CTA, Settings with export/import/clear

### Remaining
- **IT2-10:** Vercel Deploy

---

**Note:** Update this file whenever new folders, components, or architectural changes are made.
