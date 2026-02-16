# Copilot Instructions for bun-react-starter

This repository is a Bun + React + TypeScript starter template using Tailwind CSS and Shadcn UI components.

## Project Structure & Module Organization

- `src/index.tsx` bootstraps the app via `src/index.html` and pulls shared styles from `styles/globals.css`; routing lives in `src/router.tsx` with pages under `src/pages`.
- UI primitives and composites sit in `src/components/ui` (Radix/Shadcn); layout pieces in `src/components`. Keep new shared widgets here rather than inside feature pages.
- Domain helpers go in `src/hooks`, `src/lib`, `src/utils`, and `src/store`. Favor the `@/` alias for imports so paths stay stable during moves.
- Tests are co-located next to components (e.g., `src/components/ui/avatar.test.tsx`) with common setup in `src/test/setup.ts`. Build artifacts land in `dist/` via `build.ts`.

## Build, Test, and Development Commands

- **Install**: `bun install`
- **Develop**: `bun run dev` for a hot Bun dev server from `src/index.tsx`
- **Production run**: `bun start`
- **Build**: `bun run build` (custom `build.ts` bundles all `src/**/*.html` to `dist`; options like `bun run build -- --outdir=dist --minify` are supported)
- **Quality checks**:
  - `bun run lint` / `bun run lint:fix` for ESLint
  - `bun run format` / `bun run format:check` for Prettier
- **Tests**: `bun run test`, `bun run test:watch`, or `bun run test:ui` for the Vitest UI

## Coding Style & Naming Conventions

- **Language**: TypeScript + React with the `@/` alias mapped to `./src`
- **Components**: Use PascalCase for component files; hooks start with `use*`
- **Prettier settings**: 2-space indent, semicolons, double quotes, trailing commas, 100-char width
- **ESLint**: Enforces React hooks rules, a11y basics, and unused-var hygiene via `eslint.config.js`
- **Type safety**: Prefer typed props and explicit returns in shared utilities
- **Styling**: Keep Tailwind classes in JSX and theme tokens in `styles/globals.css`

## Testing Guidelines

- **Stack**: Vitest + jsdom + Testing Library; DOM mocks live in `src/test/setup.ts`
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

- **Runtime**: Bun v1.3.0+
- **Framework**: React 19
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + Shadcn UI
- **Forms**: React Hook Form + Zod
- **Testing**: Vitest + Testing Library
- **Build**: Custom build script (`build.ts`)

## Key Dependencies

- Use Radix UI primitives via Shadcn for UI components
- Use `clsx` and `tailwind-merge` for conditional class names
- Use `lucide-react` for icons
- Use `zod` for schema validation
- Use `react-hook-form` with `@hookform/resolvers` for forms
