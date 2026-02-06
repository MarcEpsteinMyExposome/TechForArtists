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

## Future Decisions to Document

- HTML signature generation approach (inline styles vs. table-based layout)
- Clipboard API strategy (copy as HTML vs. copy as rich text)
- Image handling (upload, URL, base64)
- Template storage format
- Social media icon library choice

---

## Update History

**2026-02-06** - Initial ADR document created
- ADR-001: Zustand for state management
- ADR-002: Zod for validation
- ADR-003: Jest + React Testing Library
- ADR-004: Next.js App Router
- ADR-005: Test-aware development approach

---

**Note:** Add new decisions as they arise during development. Each decision should explain context, options, choice, and consequences.
