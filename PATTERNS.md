# Code Patterns & Conventions

**Project:** Tech For Artists - Email Signature Builder
**Purpose:** Document coding patterns, conventions, and examples to follow
**Last Updated:** 2026-02-06 (Initial Setup)

---

## How to Use This File

This file contains:
- Coding conventions and style guides
- Example code snippets to follow
- Common patterns for components, tests, schemas, etc.
- Anti-patterns to avoid

**Update this file when:**
- You establish a new pattern
- You discover a better way to do something
- You encounter a common mistake to document

---

## File Naming Conventions

### Components
- **Format:** PascalCase with descriptive names
- **Location:** `components/[category]/[ComponentName].tsx`
- **Examples:**
  - `components/editor/SignatureForm.tsx`
  - `components/ui/Button.tsx`
  - `components/templates/TemplateCard.tsx`

### Tests
- **Format:** Same name as file being tested with `.test.tsx` or `.test.ts`
- **Location:** `__tests__/[mirrors-source-path]/[filename].test.ts`
- **Examples:**
  - `__tests__/components/editor/SignatureForm.test.tsx`
  - `__tests__/lib/schemas/signature.test.ts`

### Schemas
- **Format:** Descriptive name with `.schema.ts` suffix
- **Location:** `lib/schemas/[name].schema.ts`
- **Examples:**
  - `lib/schemas/signature.schema.ts`
  - `lib/schemas/template.schema.ts`

---

## Testing Patterns

### Component Test Pattern

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ExampleButton } from '@/components/ui/ExampleButton'

describe('ExampleButton', () => {
  it('renders with correct text', () => {
    render(<ExampleButton>Click me</ExampleButton>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('calls onClick handler when clicked', async () => {
    const handleClick = jest.fn()
    const user = userEvent.setup()

    render(<ExampleButton onClick={handleClick}>Click me</ExampleButton>)
    await user.click(screen.getByRole('button'))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

**Key principles:**
- Use `describe()` to group related tests
- Use `it()` with clear, readable descriptions
- Arrange -> Act -> Assert pattern
- Use accessible queries (getByRole, getByLabelText)
- Test user behavior, not implementation

### Schema Test Pattern

```typescript
import { SignatureSchema } from '@/lib/schemas/signature.schema'

describe('SignatureSchema', () => {
  it('accepts valid signature data', () => {
    const valid = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'Work Signature',
      fullName: 'Jane Artist',
      jobTitle: 'Illustrator',
      email: 'jane@example.com',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    const result = SignatureSchema.safeParse(valid)
    expect(result.success).toBe(true)
  })

  it('rejects signature with missing name', () => {
    const invalid = { id: '123', fullName: 'Jane' }
    const result = SignatureSchema.safeParse(invalid)
    expect(result.success).toBe(false)
  })
})
```

---

## TypeScript Conventions

### Type vs Interface
- **Use `type`** for unions, intersections, primitives
- **Use `interface`** for object shapes that may be extended
- **Infer from Zod schemas** when possible (DRY principle)

### Naming Conventions
- **Types/Interfaces:** PascalCase (e.g., `Signature`, `Template`)
- **Functions/Variables:** camelCase (e.g., `addSignature`, `fullName`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `MAX_NAME_LENGTH`)
- **Components:** PascalCase (e.g., `SignatureForm`)

---

## Zustand Store Patterns

```typescript
import { StateCreator } from 'zustand'

export interface ExampleSlice {
  items: Item[]
  addItem: (item: Item) => void
  updateItem: (id: string, updates: Partial<Item>) => void
  deleteItem: (id: string) => void
}

export const createExampleSlice: StateCreator<ExampleSlice> = (set) => ({
  items: [],
  addItem: (item) => set((state) => ({
    items: [...state.items, item]
  })),
  updateItem: (id, updates) => set((state) => ({
    items: state.items.map(i => i.id === id ? { ...i, ...updates } : i)
  })),
  deleteItem: (id) => set((state) => ({
    items: state.items.filter(i => i.id !== id)
  })),
})
```

**Key principles:**
- Separate interface and implementation
- Immutable updates (spread operators, map, filter)
- Clear action names (addX, updateX, deleteX)

---

## Git Commit Patterns

```
<type>: <short summary>

<optional detailed description>

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```

**Types:** `feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `style:`, `chore:`

---

## Anti-Patterns to Avoid

### Don't: Test implementation details
```typescript
// BAD
expect(component.state.count).toBe(5)
// GOOD
expect(screen.getByText('Count: 5')).toBeInTheDocument()
```

### Don't: Mutate state directly
```typescript
// BAD
state.signatures.push(newSig)
// GOOD
setState({ signatures: [...state.signatures, newSig] })
```

### Don't: Skip TypeScript types
```typescript
// BAD
function update(data: any) { }
// GOOD
function update(data: Partial<Signature>) { }
```

### Don't: Use Tailwind 3 opacity syntax
```typescript
// BAD (Tailwind 3)
className="bg-indigo-900 bg-opacity-30"
// GOOD (Tailwind 4)
className="bg-indigo-900/30"
```

### Don't: Commit without tests
- Every feature needs tests
- Task isn't complete without passing tests

---

**Note:** Update this file as new patterns are established during development.
