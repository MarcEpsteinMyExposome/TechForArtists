# CLAUDE.md - Project Context

## Project Overview

**Project:** Tech For Artists - Email Signature Builder
**Status:** Iteration 1 - Foundation (In Progress)
**Next:** Define schemas, store, and basic editor UI

An email signature builder that allows users to create professional email signatures they can use in Gmail and other email apps. Features signature templates, live preview, and one-click copy.

---

## Tech Stack

- **Framework:** Next.js 16.1 (App Router with Turbopack)
- **Language:** TypeScript 5
- **UI:** React 19.2 + Tailwind CSS 4
- **State:** Zustand 5.0.3 with persist middleware
- **Validation:** Zod 3.24.1
- **Testing:** Jest 29.7.0 + React Testing Library

---

## Key Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm test         # Run tests
npm run build    # Production build
npm run lint     # Run ESLint
```

---

## Key Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Landing with iteration status cards |
| Editor | `/editor` | Signature builder with live preview |
| Templates | `/templates` | Pre-built signature templates |
| Settings | `/settings` | Export/import data |

---

## Documentation Files

| File | Purpose |
|------|---------|
| `CLAUDE.md` | **This file** - Start here |
| `TASKS.md` | Task list with status |
| `SESSION.md` | Session notes for continuity |
| `ARCHITECTURE.md` | System architecture, data flow |
| `DECISIONS.md` | Architectural Decision Records |
| `PATTERNS.md` | Code patterns, testing conventions |

---

## Project Structure

```
app/                    # Next.js pages
├── editor/             # Signature editor (/editor)
├── templates/          # Signature templates (/templates)
├── settings/           # Data management (/settings)
└── layout.tsx          # Root layout with navigation

components/             # React components
├── editor/             # SignatureForm, SignaturePreview
├── templates/          # TemplateCard, TemplateList
├── ui/                 # Reusable UI components
└── layout/             # Navigation, providers

lib/                    # Business logic
├── schemas/            # Zod validation schemas
├── store/              # Zustand store + slices
├── validation/         # helpers.ts
└── testing/            # Mock data factories

__tests__/              # Jest tests (mirrors src structure)
```

---

## Current Features

- Project scaffold with Next.js 16.1 + TypeScript + Tailwind 4
- Signature Zod schema with validation
- Zustand store with signature slice (CRUD)
- Jest + React Testing Library configured
- Full workflow documentation system

---

## Task Management Protocol

**When completing a task:**
1. Mark status as `DONE` in `TASKS.md`
2. Update the task file with completion notes
3. **Move task file to `.claude/tasks/archive/`**
4. Update `SESSION.md` with session notes
5. Update `CLAUDE.md` if features changed

Task specs live in `.claude/tasks/` (active) and `.claude/tasks/archive/` (completed).

### Task-Based Workflow
**IMPORTANT:** Always break projects into discrete tasks before starting implementation. This enables:
- Parallel execution where tasks are independent
- Better visibility into progress
- Clearer scope for each piece of work

Create task files in `.claude/tasks/` for each discrete unit of work. Use IDs like `IT1-01`, `IT1-02` for iteration 1 tasks. Run independent tasks in parallel when possible.

### Documentation Updates
**IMPORTANT:** Keep documentation current without being asked. After completing any significant work:
- Update **TASKS.md** with task status
- Update **CLAUDE.md** if project status, features list, or next steps changed
- Update **SESSION.md** with session notes

Do this proactively as part of completing work, not only when explicitly requested.

### Task Completion Validation
**IMPORTANT:** When spawning sub-agents via the Task tool, the calling agent must:
1. Wait for the task to complete
2. Validate the task completed successfully (check test results, verify files created)
3. Update documentation files (TASKS.md, CLAUDE.md) with any new features or status changes
4. Move completed task files to `.claude/tasks/archive/`

Sub-agents focus on implementation; the parent is responsible for documentation updates after task completion.

---

## Common Issues

### Zustand Selector Infinite Loop
**Problem:** Calling selector functions during subscription causes infinite re-renders.
```typescript
// WRONG - causes infinite loop
const signatures = useAppStore((state) => state.getSortedSignatures())

// CORRECT
const getSortedSignatures = useAppStore((state) => state.getSortedSignatures)
const sortedSignatures = getSortedSignatures()
```

### Tailwind CSS 4 Opacity Syntax
**Problem:** Old `bg-opacity-30` syntax doesn't work in Tailwind 4.
```typescript
// CORRECT (Tailwind 4)
className="bg-indigo-900/30 border-indigo-500/50"

// WRONG (Tailwind 3 syntax, breaks in Tailwind 4)
className="bg-indigo-900 bg-opacity-30"
```

### Testing Patterns
- Use accessible queries: `getByRole`, `getByLabelText` (not test IDs)
- Test user behavior, not implementation details
- All features require tests before completion

### Zod Validation
- Schemas are source of truth for TypeScript types
- Use `safeParse()` for user input validation
- All data entering system must be validated

---

## Completed Iterations

_None yet — starting Iteration 1._
