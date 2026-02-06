# TASKS.md - Central Task Tracking

> Track all tasks across iterations. Update status as work progresses.

## Current Status

**Active Iteration:** 3 - Branding, Templates & Features
**Tests:** 198 passing (18 test suites)
**Build:** Passes (all routes static)
**Lint:** 0 errors, 2 warnings

---

## Iteration 1 (DONE)

Foundation & data models — completed 2026-02-06.
- Project scaffold with Next.js 16.1 + TypeScript + Tailwind 4
- Signature Zod schema, Zustand store, mock data factory
- Jest + React Testing Library configured
- Documentation system established

---

## Iteration 2 (DONE)

| Task | Description | Status | Wave |
|------|-------------|--------|------|
| IT2-01 | Expand Schema — Social Links & Branding | DONE | 1 |
| IT2-02 | localStorage Persistence | DONE | 2 |
| IT2-03 | App Branding & UI Foundation Components | DONE | 2 |
| IT2-04 | Signature Editor Form | DONE | 3 |
| IT2-05 | Live Signature Preview | DONE | 3 |
| IT2-06 | HTML Signature Generation | DONE | 2 |
| IT2-07 | Copy-to-Clipboard | DONE | 4 |
| IT2-08 | Editor Page Assembly | DONE | 5 |
| IT2-09 | Update Other Pages | DONE | 2 |
| IT2-10 | Build Verification & Vercel Deploy | DONE | 6 |

**Completed:** 10/10 tasks + social media icons feature
**Live URL:** https://tech-for-artists.vercel.app

---

## Task Management Protocol

When completing a task:
1. Mark status as `DONE` in this file
2. Update the task file with completion notes
3. **Move task file to `.claude/tasks/archive/`**
4. Update `SESSION.md` with session notes
5. Update `CLAUDE.md` if features changed

Task specs live in `.claude/tasks/` (active) and `.claude/tasks/archive/` (completed).

---

## Iteration 3 (In Progress)

Branding, polish, templates, and new features.

| Task | Description | Status |
|------|-------------|--------|
| IT3-01 | Branding refresh — wordmark, typography (Google Font), color accent, footer, nav polish | DONE |
| IT3-02 | Landing page graphics — mosaic hero background | DONE |
| IT3-03 | Pre-built signature templates — 5-6 curated starters with "Use Template" flow | DONE |
| IT3-04 | Profile image upload — photo/URL to replace initials avatar in signatures | DONE |
| IT3-05 | Custom color picker — arbitrary hex colors beyond the 8 presets | DONE |
| IT3-06 | "How to use" setup guide — post-copy wizard asking email client, Gmail web step-by-step, polite fallback for others | PENDING |

---

## Future Ideas

- **Multiple signature management** — UI for switching between and managing multiple signatures
- **Font selection** — Choose from email-safe fonts
