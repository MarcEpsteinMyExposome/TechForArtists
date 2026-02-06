# Architecture Overview

**Project:** Tech For Artists - Email Signature Builder
**Last Updated:** 2026-02-06 (Initial Setup)
**Purpose:** Living document explaining how the codebase is structured and how pieces connect

---

## Tech Stack

### Core Technologies
- **Next.js 16.1.1** - React framework with App Router (file-based routing)
- **React 19.2.3** - UI library with hooks
- **TypeScript 5** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework

### State Management & Validation
- **Zustand 5.0.3** - Lightweight state management
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
│   ├── page.tsx                 # Home page
│   ├── globals.css              # Tailwind imports and global styles
│   ├── editor/                  # Signature editor route
│   │   └── page.tsx
│   ├── templates/               # Template gallery route
│   │   └── page.tsx
│   └── settings/                # Settings/data management route
│       └── page.tsx
│
├── components/                   # React components
│   ├── editor/                  # Signature editor components (future)
│   ├── templates/               # Template components (future)
│   ├── ui/                      # Reusable UI components (future)
│   └── layout/                  # Layout components (future)
│
├── lib/                         # Business logic and utilities
│   ├── schemas/                 # Zod validation schemas
│   │   ├── signature.schema.ts  # Signature data model
│   │   └── index.ts             # Barrel export
│   ├── store/                   # Zustand state management
│   │   ├── appStore.ts          # Main store
│   │   └── signatureSlice.ts    # Signature CRUD slice
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
├── jest.setup.js                # Jest environment setup
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
User Interaction (UI Component)
    ↓
Event Handler (component)
    ↓
Zustand Action (store/slices/*)
    ↓
State Update (validated with Zod schema)
    ↓
React Re-render (automatic)
    ↓
UI Update (reflects new state)
```

**Example Flow: Creating a Signature**
1. User fills form in SignatureForm component
2. Clicks "Create Signature" button
3. Form calls `addSignature()` action from Zustand store
4. Action validates data using `SignatureSchema` (Zod)
5. If valid, adds signature to `signatures[]` array in store
6. React detects state change, re-renders signature list
7. New signature appears in UI

---

## Key Architectural Decisions

See `DECISIONS.md` for full ADR records.

- **Zustand** over Redux — simpler API, sufficient for this app
- **Zod** for validation — type inference, runtime safety
- **Jest + React Testing Library** — test user behavior, not implementation
- **Next.js App Router** — file-based routing, server components
- **Test-aware development** — tests required but not strict TDD

---

## Testing Strategy

### Test Types
1. **Unit Tests** - Individual functions (lib/*)
2. **Component Tests** - React components with user interactions
3. **Integration Tests** - Multiple components working together
4. **Schema Tests** - Zod validation (valid/invalid data)

### Coverage Goals
- **100%** on schemas and validation
- **80%+** on business logic (lib/*)
- **70%+** on components (critical paths)

---

## Current Implementation Status

### In Progress
**Iteration 1: Foundation & Data Models**
- Signature schema defined
- Zustand store with signature slice
- Mock data factory
- Placeholder pages (Home, Editor, Templates, Settings)

### Future Iterations
- **Iteration 2:** Signature editor UI with live preview
- **Iteration 3:** Templates and copy-to-clipboard
- **Iteration 4:** Data persistence (LocalStorage)
- **Iteration 5:** Advanced features (social icons, branding, etc.)

---

**Note:** Update this file whenever new folders, components, or architectural changes are made.
