---
name: add-web-page
description: >-
  Add a React Router page and route in apps/web for this Bun Turborepo. Use when
  creating pages, routes, layouts, or feature screens in the web app.
---

# Add Web Page

## Locations

- Pages: `apps/web/src/pages/<Name>Page.tsx`
- Feature components: `apps/web/src/components/`
- Router: `apps/web/src/router.tsx` (`createBrowserRouter`)
- Layout shell: `apps/web/src/components/Layout.tsx`
- UI primitives: import from `@repo/ui/<component>`, not local shadcn copies

## Steps

1. Create `apps/web/src/pages/FooPage.tsx` as a named export `FooPage`.
2. Register the route under the existing `Layout` children in `router.tsx`.
3. Add nav links in `Layout` only if the page should be discoverable.
4. Use `@repo/auth/client` for session-aware UI; call API routes under `/api/...`.
5. Keep page files thin: compose feature components + `@repo/ui`.

## Example route entry

```tsx
{
  path: "/foo",
  element: <FooPage />,
},
```

## Conventions

- PascalCase page files ending in `Page`.
- Prefer accessible landmarks/headings; match existing layout spacing/Tailwind patterns.
- Add a co-located test when the page has non-trivial interaction (`write-component-test`).
- Dev: `bun run dev` from repo root.
