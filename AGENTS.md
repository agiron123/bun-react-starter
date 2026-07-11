# Repository Guidelines

Single source of truth for coding agents (Cursor, Claude Code, Copilot, Codex, and others). Tool-specific paths (`CLAUDE.md`, `.github/copilot-instructions.md`) symlink here — edit **this file only**.

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
| `bun run typecheck` | Typecheck all packages (runs `prisma:generate` first) |
| `bun run lint` / `lint:fix` | ESLint across packages |
| `bun run format` / `format:check` | Prettier repo-wide |
| `bun run test` / `test:watch` / `test:ui` | Vitest via Turbo |
| `bun run prisma:generate` | Generate Prisma client |
| `bun run db:migrate` | Migrate (`packages/database`) |
| `bun run db:seed` | Seed DB |

Docker hot-reload: `docker compose -f docker-compose.dev.yml up --build` → `http://localhost:3000`.

## Bun Conventions

Prefer Bun over Node/npm/pnpm/yarn/vite for this repo.

- `bun <file>` instead of `node` / `ts-node`
- `bun install` / `bun run <script>` for packages and scripts
- `Bun.serve()` for HTTP/WebSocket routes in `apps/api` — not Express/Fastify/Hono
- Prefer `Bun.file` over `node:fs` readFile/writeFile when working in Bun server code
- Bun loads `.env` automatically — avoid adding dotenv for Bun-run processes
- Frontend: HTML imports + Bun bundler in `apps/web` (not Vite)

**Tests:** This monorepo uses **Vitest** via `bun run test` / Turbo — not `bun test` / `bun:test` / Jest.

## Coding Style & Naming Conventions

- TypeScript + React. Components: PascalCase. Hooks: `use*`.
- Prettier: 2-space indent, semicolons, double quotes, trailing commas, 100-char width.
- ESLint: React hooks, a11y, unused-var hygiene.
- Typed props and explicit returns in shared utilities.
- Tailwind in JSX; theme tokens in shared/global CSS (not one-off hex in components).

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

All skills live in **`.agents/skills/`** (agent-agnostic). Read the matching `SKILL.md` before that work:

| Skill | Use when |
| --- | --- |
| `add-shadcn-component` | Adding or updating Shadcn UI in `packages/ui` |
| `prisma-database` | Schema, migrate, generate, or seed |
| `add-api-route` | New/changed `Bun.serve` routes in `apps/api` |
| `write-component-test` | Vitest + Testing Library specs for this repo |
| `add-web-page` | New React Router page in `apps/web` |
| `vercel-react-best-practices` | React performance / composition reviews |
| `shadcn-ui` | General Shadcn patterns (prefer `add-shadcn-component` for this monorepo’s layout) |
| `vitest-testing` | Broader Vitest guidance (prefer `write-component-test` for co-location) |

Also use the Shadcn MCP (`shadcn`) when searching/adding registry components.

## Agent Config Layout

| Path | Role |
| --- | --- |
| `AGENTS.md` | Canonical instructions (edit this) |
| `CLAUDE.md` | Symlink → `AGENTS.md` |
| `.github/copilot-instructions.md` | Symlink → `AGENTS.md` |
| `.agents/skills/` | All skills (project + ecosystem) |
| `.cursor/mcp.json` | Cursor-only MCP servers (tool-specific; not portable) |
