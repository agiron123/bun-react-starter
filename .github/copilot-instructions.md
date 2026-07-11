# Copilot Instructions for bun-react-starter

Canonical guidelines live in [AGENTS.md](../AGENTS.md). Keep this file aligned when structure or commands change.

This repository is a Turborepo monorepo with Bun + React + TypeScript, Tailwind CSS, and Shadcn UI.

## Monorepo Structure (Turborepo)

- **Workspaces**: `apps/*` and `packages/*` (Bun workspaces)
- **Apps**:
  - `apps/web` — React frontend (routing in `src/router.tsx`, pages in `src/pages`)
  - `apps/api` — Bun backend API (`Bun.serve` routes)
- **Packages**:
  - `packages/ui` — Shadcn/Radix UI primitives (`@repo/ui/<component>`)
  - `packages/auth` — Shared auth (`@repo/auth/server`, `middleware`, `client`)
  - `packages/database` — Prisma schema and client (`@repo/database`)
  - `packages/shared` — Shared utilities (`cn`, etc.)
  - `packages/config-eslint`, `config-typescript`, `config-tailwind` — Shared configs
- **Tests**: Co-located `.test.tsx` / `.test.ts`; Vitest via Turbo (`bun run test`)

## Commands

Use Bun at the repo root: `bun install`, `bun run dev`, `bun run build`, `bun run lint`, `bun run test`, `bun run prisma:generate`, `bun run db:migrate`, `bun run db:seed`.

## Agent skills

Project workflows: `.cursor/skills/` (`add-shadcn-component`, `prisma-database`, `add-api-route`, `write-component-test`, `add-web-page`). Ecosystem: `.agents/skills/` (`vercel-react-best-practices`, `shadcn-ui`, `vitest-testing`).
