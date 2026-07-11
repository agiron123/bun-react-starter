---
name: add-api-route
description: >-
  Add or change Bun.serve API routes in apps/api using Prisma and @repo/auth.
  Use when creating endpoints, auth-protected routes, or editing apps/api/src/index.tsx.
---

# Add API Route

## Location

- Server entry: `apps/api/src/index.tsx`
- Runtime: Bun `serve({ routes: { ... } })`
- DB: `import prisma from "@repo/database"`
- Auth: `@repo/auth/server` (hash/verify/token), `@repo/auth/middleware` (`authenticateRequest`)

## Pattern

Add routes on the existing `serve({ routes })` object. Prefer method maps for REST:

```ts
"/api/widgets": {
  async GET(req) {
    // list
    return Response.json(items);
  },
  async POST(req) {
    const body = await req.json();
    // validate → mutate → respond
    return Response.json(created, { status: 201 });
  },
},

"/api/widgets/:id": {
  async GET(req) {
    const id = Number(req.params.id);
    // ...
  },
},
```

## Auth-protected routes

Follow existing `/api/auth/me`-style handling:

1. `authenticateRequest(req)` inside try/catch.
2. On `UnauthorizedError`, return `401` JSON.
3. Use the authenticated user id for scoped queries — do not trust client-supplied user ids alone.

## Response conventions

- JSON via `Response.json(...)` or `new Response(JSON.stringify(...), { headers: { "Content-Type": "application/json" } })`.
- Validation errors: `400` with `{ message }`.
- Auth failures: `401`.
- Not found: `404`.
- Avoid Express/Fastify/Hono — stay on `Bun.serve` routes.

## After changes

- Run API with `bun run dev` (Turbo) or `cd apps/api && bun run dev`.
- Typecheck: `bun run typecheck`.
- If the route needs new tables/fields, use the `prisma-database` skill first.
