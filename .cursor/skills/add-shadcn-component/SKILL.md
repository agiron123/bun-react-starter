---
name: add-shadcn-component
description: >-
  Add or update Shadcn/Radix UI components in packages/ui for this Bun Turborepo.
  Use when adding shadcn components, installing registry items, wiring @repo/ui
  exports, or when the user mentions shadcn, Radix, or UI primitives.
---

# Add Shadcn Component

## Where components live

- Source: `packages/ui/src/components/<name>.tsx`
- Public export: add `"./<name>": "./src/components/<name>.tsx"` to `packages/ui/package.json` `exports`
- Import in apps: `import { Button } from "@repo/ui/button"`
- Shared `cn`: `@repo/shared` (not a local `@/lib/utils` in packages)

Do **not** add primitives under `apps/web/src/components/ui`. Feature/layout widgets stay in `apps/web`; design-system primitives stay in `packages/ui`.

## Preferred workflow

1. Prefer the **Shadcn MCP** (`search_items_in_registries`, `get_add_command_for_items`, `view_items_in_registries`).
2. Run the add command from the **repo root** with Bun, targeting `packages/ui` if the CLI supports a path/cwd flag; otherwise add then move files into `packages/ui/src/components`.
3. Style: **new-york**, **neutral** base, CSS variables, **lucide** icons (see root `components.json`). `rsc: false`.
4. Fix imports to use `@repo/shared` for `cn` and relative imports for sibling UI pieces.
5. Export the component from `packages/ui/package.json`.
6. Add a co-located `*.test.tsx` (see `write-component-test` skill).
7. Run `bun run test --filter=@repo/ui` or `cd packages/ui && bun run test`.

## Checklist

- [ ] File in `packages/ui/src/components/`
- [ ] `package.json` export added
- [ ] No duplicate under `apps/web`
- [ ] Test covers render + primary interaction
- [ ] Uses existing tokens/variants; no one-off purple/glow aesthetics unless requested
