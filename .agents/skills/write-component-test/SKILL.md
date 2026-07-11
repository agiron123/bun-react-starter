---
name: write-component-test
description: >-
  Write Vitest + Testing Library component tests co-located with source in this
  monorepo. Use when adding tests for packages/ui, apps/web, or shared utilities,
  or when the user asks for unit/component coverage.
---

# Write Component Test

## Stack

- **Vitest** (via `bun run test` / Turbo) — not `bun:test` / Jest
- `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`
- UI setup: `packages/ui/vitest.setup.ts` + `packages/ui/vitest.config.ts`

## File placement

- Co-locate: `packages/ui/src/components/button.test.tsx` next to `button.tsx`
- Web feature tests: `apps/web/src/**/*.test.tsx`
- Shared utils: `packages/shared/src/*.test.ts`

## Template

```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./button";

describe("Button", () => {
  it("renders with accessible name", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={handleClick}>Click me</Button>);
    await user.click(screen.getByRole("button", { name: "Click me" }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## Guidelines

- Query by role/label first; avoid brittle CSS-only selectors unless asserting variants.
- Cover happy path + one edge (disabled, empty, error) when behavior exists.
- Snapshot only stable primitives.
- Mock network with `vi.fn` / `vi.mock` — keep tests deterministic.
- Run: `bun run test` or package-scoped `cd packages/ui && bun run test`.
