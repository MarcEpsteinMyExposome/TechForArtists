# TASKS.md - Central Task Tracking

> Track all tasks across iterations. Update status as work progresses.

## Current Status

**Active Iteration:** 2 - Usable Editor + Deploy
**Tests:** 178 passing (16 test suites)
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

## Iteration 2 (In Progress)

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
| IT2-10 | Build Verification & Vercel Deploy | PENDING | 5 |

**Completed:** 9/10 tasks (Waves 1-5 done) + social media icons feature
**Next:** Wave 6 — IT2-10 (Vercel Deploy)

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

## Iteration 3 (Planned)

Branding, polish, and templates.

| Task | Description | Status |
|------|-------------|--------|
| IT3-01 | Technology for Artists branding refresh — logo, typography, color palette, consistent identity across all pages | PENDING |
| IT3-02 | Landing page graphics — hero illustrations or visuals, polish home page with distinctive design | PENDING |
| IT3-03 | Pre-built signature templates — curated starter templates users can select and customize | PENDING |

---

## Future Ideas

- **Profile image upload** — Allow users to upload a photo or provide an image URL to replace the initials circle avatar
- **Multiple signature management** — UI for switching between and managing multiple signatures
- **Custom color picker** — Allow arbitrary colors beyond the 8 presets
- **Font selection** — Choose from email-safe fonts
