# Repository Guidelines

Turborepo monorepo with Bun workspaces: React 19 frontend, Bun API, Prisma (SQLite), Tailwind v4, and Shadcn/Radix UI.

## Project Structure & Module Organization

- **Workspaces**: `apps/*` and `packages/*`
- **Apps**:
  - `apps/web` — React frontend (`src/router.tsx`, pages in `src/pages`, feature components in `src/components`)
  - `apps/api` — Bun `Bun.serve()` API + production static serving of `apps/web/dist`
- **Packages**:
  - `packages/ui` — Shadcn/Radix primitives; import as `@repo/ui/<component>`
  - `packages/auth` — Auth helpers (`@repo/auth/server`, `@repo/auth/middleware`, `@repo/auth/client`)
  - `packages/database` — Prisma schema/client (`@repo/database`); canonical schema is `packages/database/prisma/schema.prisma`
  - `packages/shared` — Shared utilities (e.g. `cn`)
  - `packages/config-*` — Shared ESLint, TypeScript, and Tailwind configs
- Prefer `@/` inside an app’s `src`, and `@repo/<pkg>` across workspaces.
- Co-locate tests next to source (e.g. `button.test.tsx`). Build outputs land in `dist/` / `build/`.

## Build, Test, and Development Commands

Run from the repo root via Turbo + Bun (not npm/pnpm/yarn).

| Command | Purpose |
| --- | --- |
| `bun install` | Install workspaces |
| `bun run dev` | `turbo dev` (loads `.env`); web + api |
| `bun start` | Production start via Turbo |
| `bun run build` | Turbo build (`^build` deps) |
| `bun run typecheck` | Typecheck all packages |
| `bun run lint` / `lint:fix` | ESLint across packages |
| `bun run format` / `format:check` | Prettier repo-wide |
| `bun run test` / `test:watch` / `test:ui` | Vitest via Turbo |
| `bun run prisma:generate` | Generate Prisma client |
| `bun run db:migrate` | Migrate (`packages/database`) |
| `bun run db:seed` | Seed DB |

Docker hot-reload: `docker compose -f docker-compose.dev.yml up --build` → `http://localhost:3000`.

## Coding Style & Naming Conventions

- TypeScript + React. Components: PascalCase. Hooks: `use*`.
- Prettier: 2-space indent, semicolons, double quotes, trailing commas, 100-char width.
- ESLint: React hooks, a11y, unused-var hygiene.
- Typed props and explicit returns in shared utilities.
- Tailwind in JSX; theme tokens in shared/global CSS (not one-off hex in components).
- Package manager/runtime: **Bun**. Tests in this repo: **Vitest** via `bun run test` (not `bun test` / jest).

## Testing Guidelines

- Vitest + jsdom + Testing Library; UI setup in `packages/ui/vitest.setup.ts`.
- Co-locate `.test.tsx` / `.test.ts`; prefer `screen` + `userEvent`.
- Cover happy path plus loading/empty/error and accessible roles/labels.
- Snapshot only stable UI primitives.
- Before a PR: `bun run test` and `bun run lint`.

## Commit & Pull Request Guidelines

- Concise imperative subjects (e.g. `Add accordion variants`, `Fix panel resize bug`); no unrelated bundling.
- PRs: short summary, commands/tests run, linked issue, UI screenshots when relevant.
- Call out new deps or config changes. Rebase; avoid force-push on shared branches without notice.

## Agent Skills

### Project skills (`.cursor/skills/`)

Read the matching `SKILL.md` before that work:

| Skill | Use when |
| --- | --- |
| `add-shadcn-component` | Adding or updating Shadcn UI in `packages/ui` |
| `prisma-database` | Schema, migrate, generate, or seed |
| `add-api-route` | New/changed `Bun.serve` routes in `apps/api` |
| `write-component-test` | Vitest + Testing Library specs for this repo |
| `add-web-page` | New React Router page in `apps/web` |

### Installed ecosystem skills (`.agents/skills/`)

| Skill | Use when |
| --- | --- |
| `vercel-react-best-practices` | React performance / composition reviews |
| `shadcn-ui` | General Shadcn patterns (prefer project `add-shadcn-component` for this monorepo’s `packages/ui` layout) |
| `vitest-testing` | Broader Vitest guidance (prefer project `write-component-test` for co-location conventions) |

Also use the Shadcn MCP (`shadcn`) when searching/adding registry components.
