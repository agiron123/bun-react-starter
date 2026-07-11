---
name: prisma-database
description: >-
  Manage Prisma schema, migrations, client generate, and seeding for
  packages/database in this Bun Turborepo. Use when changing models, running
  migrate/seed/generate, or working with SQLite DATABASE_URL / Prisma Client.
---

# Prisma Database

## Canonical location

- Schema: `packages/database/prisma/schema.prisma`
- Client export: `packages/database` → `@repo/database`
- Seed: `packages/database/prisma/seed.ts`
- Provider: **SQLite** via `DATABASE_URL` (typically `file:./dev.db`)

Ignore or avoid editing the legacy root `prisma/` copy unless the user explicitly asks to sync Docker/legacy paths.

## Commands (repo root)

```bash
bun run prisma:generate   # turbo prisma:generate
bun run db:migrate        # packages/database migrate dev
bun run db:seed           # packages/database seed
```

Inside the package:

```bash
cd packages/database
bunx prisma studio
bunx prisma migrate dev --name <descriptive_name>
bunx prisma db push       # prototyping only; prefer migrate for shared work
```

## Workflow

1. Edit `packages/database/prisma/schema.prisma`.
2. `bun run db:migrate` with a clear migration name.
3. `bun run prisma:generate` if client types are stale.
4. Update seed if new required data is needed.
5. Use `import prisma from "@repo/database"` in `apps/api` and `@repo/auth` — never instantiate a second client in apps.

## Conventions

- Keep auth-sensitive fields (e.g. `password`) hashed via `@repo/auth/server` helpers — do not store plaintext.
- After schema changes, typecheck API/auth: `bun run typecheck`.
- Docker compose may still reference root `prisma/schema.prisma`; if migrate behavior diverges, call that out and align schemas.
