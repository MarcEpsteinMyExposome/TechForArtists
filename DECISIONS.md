# Architectural Decision Records (ADR)

**Project:** Tech For Artists - Email Signature Builder
**Purpose:** Document WHY we made specific architectural and technical choices

---

## How to Use This File

When making a significant architectural decision:
1. Add a new entry with date and decision number
2. Explain the context (what problem are we solving?)
3. List options considered
4. State the decision and rationale
5. Note consequences (trade-offs)

---

## Decision Log

### ADR-001: Use Zustand for State Management
**Date:** 2026-02-06
**Status:** Accepted

**Context:**
Need state management to share signature data between editor, preview, and template components.

**Decision:** Use **Zustand** for state management.

**Rationale:**
- Minimal boilerplate, hooks-based API
- Good TypeScript support, no providers needed
- Proven pattern from previous project (Bang Your Dead)
- Sufficient for this app's complexity

**Consequences:**
- Smaller ecosystem than Redux (acceptable trade-off)
- Pattern: store → hook → component

---

### ADR-002: Use Zod for Schema Validation
**Date:** 2026-02-06
**Status:** Accepted

**Context:**
Need runtime validation for signature data. TypeScript only validates at compile time.

**Decision:** Use **Zod** for all data validation.

**Rationale:**
- Type inference eliminates duplicate type definitions
- Schemas serve as both validation and documentation
- Proven pattern from previous project

**Consequences:**
- Single source of truth (schema = validation + types)
- All data entering the system must be validated

---

### ADR-003: Use Jest + React Testing Library
**Date:** 2026-02-06
**Status:** Accepted

**Context:**
Need testing framework for unit, component, and integration tests.

**Decision:** Use **Jest + React Testing Library**.

**Rationale:**
- Tests user behavior, not implementation
- Best Next.js integration
- Proven pattern from previous project (1000+ tests)

**Consequences:**
- Tests may run slower than Vitest (acceptable trade-off)
- Encourages accessible component design

---

### ADR-004: Next.js App Router with File-based Routing
**Date:** 2026-02-06
**Status:** Accepted

**Context:**
Need routing for different views (editor, templates, settings).

**Decision:** Use **Next.js App Router**.

**Rationale:**
- Built-in, no extra dependency
- File-based routing is intuitive
- Server components by default

---

### ADR-005: Test-Aware Development (Not Strict TDD)
**Date:** 2026-02-06
**Status:** Accepted

**Context:**
Need a testing strategy that balances quality with development speed.

**Decision:** Use **test-aware development** — tests required for task completion, but not strict TDD.

**Rationale:**
- Balances quality with iteration speed
- Tests are NOT optional (part of "Definition of Done")
- Proven approach from previous project

**Pattern:**
1. Implement feature
2. Write tests (or alongside implementation)
3. Verify tests pass
4. Only then mark task complete

---

### ADR-006: Table-Based HTML for Email Signatures
**Date:** 2026-02-06
**Status:** Accepted

**Context:**
Need to generate HTML signatures that render consistently across Gmail, Outlook, Apple Mail, and other email clients.

**Options considered:**
1. CSS flexbox/grid layout
2. Table-based layout with inline styles

**Decision:** Use **table-based HTML with inline styles**.

**Rationale:**
- Email clients strip `<style>` blocks and ignore most CSS
- Tables are universally supported across all email clients
- Inline styles on every element ensure consistent rendering
- Proven approach used by major email signature tools

**Consequences:**
- More verbose HTML output
- Two rendering paths: Tailwind preview (React) vs. table HTML (email)

---

### ADR-007: ClipboardItem API for Rich Text Copy
**Date:** 2026-02-06
**Status:** Accepted

**Context:**
Users need to copy signatures and paste them as formatted content into email clients.

**Decision:** Use **ClipboardItem API** with `text/html` MIME type, falling back to `writeText()`.

**Rationale:**
- ClipboardItem with text/html preserves formatting when pasting
- Fallback ensures basic functionality on older browsers
- Include both text/html and text/plain blobs in ClipboardItem

**Consequences:**
- Requires HTTPS in production (Clipboard API security requirement)
- Some older browsers may only get plain text fallback

---

### ADR-008: Mounted Guard for Zustand Persist + SSR
**Date:** 2026-02-06
**Status:** Accepted

**Context:**
Zustand persist middleware hydrates from localStorage on the client, causing server/client HTML mismatch (hydration error).

**Decision:** Use a `mounted` state guard — render a loading placeholder until after first client-side render.

**Rationale:**
- Server renders with empty store state
- Client hydrates from localStorage with real data
- Mismatch causes React hydration error
- Mounted guard ensures both render the same placeholder initially

---

### ADR-009: CDN-Hosted Social Media Icons (MageCDN)
**Date:** 2026-02-06
**Status:** Accepted

**Context:**
Social links in email signatures rendered as plain text ("Facebook", "LinkedIn"). Users expect recognizable brand icons.

**Options considered:**
1. Self-hosted PNG icons
2. Simple Icons (SVG via CDN) — 3000+ brands but SVG-only, poor email client support
3. MageCDN Social Icons (SVG via Cloudflare CDN) — 20+ platforms, free, reliable
4. dmhendricks/signature-social-icons (jsDelivr CDN) — limited platform support

**Decision:** Use **MageCDN Social Icons** (`https://s.magecdn.com/social/tc-{platform}.svg`) with text fallback for unsupported platforms.

**Rationale:**
- SVG via `<img>` tags works in all major email clients (Gmail, Outlook web, Apple Mail)
- Cloudflare-hosted CDN — fast, reliable, free
- Covers 10 of our 12 platforms (vimeo and etsy fall back to text)
- Simple URL pattern, no API keys or setup needed

**Consequences:**
- External CDN dependency — icons break if MageCDN goes down (low risk, Cloudflare-backed)
- Two rendering paths: `<img>` icons in email HTML, same CDN icons in React preview
- Platforms without icons gracefully degrade to text labels

---

## Future Decisions to Document

- Image handling (upload, URL, base64) — currently using initials avatar, URL input is planned
- Template storage format
- Vercel deployment configuration

---

## Update History

**2026-02-06** - Social media icons ADR added
- ADR-009: CDN-hosted social media icons (MageCDN)

**2026-02-06** - Iteration 2 ADRs added
- ADR-006: Table-based HTML for email signatures
- ADR-007: ClipboardItem API for rich text copy
- ADR-008: Mounted guard for Zustand persist + SSR

**2026-02-06** - Initial ADR document created
- ADR-001: Zustand for state management
- ADR-002: Zod for validation
- ADR-003: Jest + React Testing Library
- ADR-004: Next.js App Router
- ADR-005: Test-aware development approach

---

**Note:** Add new decisions as they arise during development. Each decision should explain context, options, choice, and consequences.
