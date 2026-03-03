# Copilot Instructions for bun-react-starter

This repository is a Turborepo monorepo with Bun + React + TypeScript, Tailwind CSS, and Shadcn UI components.

## Monorepo Structure (Turborepo)

- **Workspaces**: `apps/*` and `packages/*` (Bun workspaces)
- **Apps**:
  - `apps/web` — React frontend (routing in `src/router.tsx`, pages in `src/pages`)
  - `apps/api` — Bun backend API
- **Packages**:
  - `packages/ui` — Shadcn/Radix UI primitives and composites
  - `packages/auth` — Shared auth logic (server + client)
  - `packages/database` — Prisma schema and client
  - `packages/shared` — Shared utilities
  - `packages/config-eslint`, `config-typescript`, `config-tailwind` — Shared configs
- **Naming**: Apps use `@repo/web`, `@repo/api`; packages use `@repo/ui`, `@repo/auth`, etc.
- **Tests**: Co-located next to components (e.g., `.test.tsx`); build outputs in `dist/`, `build/`, or `.next/` per package

## Build, Test, and Development Commands

All commands run via **Turbo** at the repo root. Use `bun run dev`, `bun run build`, etc.—not per-package scripts unless you are working inside a specific app.

- **Install**: `bun install`
- **Develop**: `bun run dev` — runs `turbo dev` (loads `.env`); starts dev servers for `apps/web` and `apps/api`
- **Production run**: `bun start` — runs `turbo start`
- **Build**: `bun run build` — runs `turbo build`; respects task dependencies (`^build`)
- **Quality checks**:
  - `bun run lint` / `bun run lint:fix` — ESLint across packages
  - `bun run format` / `bun run format:check` — Prettier (repo-wide)
- **Tests**: `bun run test`, `bun run test:watch`, or `bun run test:ui` — Vitest via Turbo
- **Database**:
  - `bun run prisma:generate` — generates Prisma client
  - `bun run db:migrate` — runs migrations in `packages/database`
  - `bun run db:seed` — seeds DB from `packages/database`

## Coding Style & Naming Conventions

- **Language**: TypeScript + React; apps use the `@/` alias mapped to `./src`
- **Components**: Use PascalCase for component files; hooks start with `use*`
- **Shared code**: Place in `packages/ui`, `packages/shared`, or `packages/auth`; import via `@repo/` workspaces
- **Prettier settings**: 2-space indent, semicolons, double quotes, trailing commas, 100-char width
- **ESLint**: Enforces React hooks rules, a11y basics, and unused-var hygiene via `eslint.config.js`
- **Type safety**: Prefer typed props and explicit returns in shared utilities
- **Styling**: Keep Tailwind classes in JSX and theme tokens in `styles/globals.css`

## Testing Guidelines

- **Stack**: Vitest + jsdom + Testing Library; setup in `packages/ui/vitest.setup.ts` and `packages/ui/vitest.config.ts`
- **File naming**: Co-locate component/unit specs using `.test.tsx` filenames
- **Patterns**: Use `screen` and `userEvent` patterns for readability
- **Coverage**: Cover new stories' happy paths plus edge states (loading/empty/error) and accessible roles/labels
- **Snapshots**: Use snapshot tests only for stable UI primitives
- **Pre-PR**: Run `bun run test` and `bun run lint` before opening a PR

## Commit & Pull Request Guidelines

- **Commit messages**: Use concise, imperative subjects (e.g., `Add accordion variants`, `Fix panel resize bug`); avoid bundling unrelated changes
- **PR content**: Include a short summary, commands/tests run, linked issue or ticket, and before/after screenshots for UI changes
- **Dependencies**: Call out new dependencies or config changes in the description
- **Branch management**: Keep branches rebased; avoid force-pushing over collaborative work without notice

## Technology Stack

- **Monorepo**: Turborepo v2 with Bun workspaces
- **Runtime**: Bun v1.3.0+
- **Framework**: React 19
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + Shadcn UI
- **Forms**: React Hook Form + Zod
- **Testing**: Vitest + Testing Library
- **Build**: Turbo orchestrates builds; `apps/web` uses custom `build.ts`; `apps/api` uses Bun directly

## Key Dependencies

- Use Radix UI primitives via Shadcn for UI components
- Use `clsx` and `tailwind-merge` for conditional class names
- Use `lucide-react` for icons
- Use `zod` for schema validation
- Use `react-hook-form` with `@hookform/resolvers` for forms
