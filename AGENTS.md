# Repository Guidelines

## Project Structure & Module Organization
- `src/index.tsx` bootstraps the app via `src/index.html` and pulls shared styles from `styles/globals.css`; routing lives in `src/router.tsx` with pages under `src/pages`.
- UI primitives and composites sit in `src/components/ui` (Radix/Shadcn); layout pieces in `src/components`. Keep new shared widgets here rather than inside feature pages.
- Domain helpers go in `src/hooks`, `src/lib`, `src/utils`, and `src/store`. Favor the `@/` alias for imports so paths stay stable during moves.
- Tests are co-located next to components (e.g., `src/components/ui/avatar.test.tsx`) with common setup in `src/test/setup.ts`. Build artifacts land in `dist/` via `build.ts`.

## Build, Test, and Development Commands
- Install: `bun install`.
- Develop: `bun run dev` for a hot Bun dev server from `src/index.tsx`.
- Production run: `bun start`.
- Build: `bun run build` (custom `build.ts` bundles all `src/**/*.html` to `dist`; options like `bun run build -- --outdir=dist --minify` are supported).
- Quality: `bun run lint` / `bun run lint:fix`, `bun run format` / `bun run format:check`.
- Tests: `bun run test`, `bun run test:watch`, or `bun run test:ui` for the Vitest UI.

## Coding Style & Naming Conventions
- TypeScript + React with the `@/` alias mapped to `./src`. Keep component files PascalCase; hooks start with `use*`.
- Prettier is source of truth: 2-space indent, semicolons, double quotes, trailing commas, 100-char width.
- ESLint (`eslint.config.js`) enforces React hooks rules, a11y basics, and unused-var hygiene; keep new rules local if experimental.
- Prefer typed props and explicit returns in shared utilities; keep Tailwind classes in JSX and theme tokens in `styles/globals.css`.

## Testing Guidelines
- Vitest + jsdom + Testing Library; DOM mocks live in `src/test/setup.ts`.
- Co-locate component/unit specs using `.test.tsx` filenames; use `screen` and `userEvent` patterns for readability.
- Cover new stories’ happy paths plus edge states (loading/empty/error) and accessible roles/labels. Snapshot only for stable UI primitives.
- Run `bun run test` (and `bun run lint`) before opening a PR.

## Commit & Pull Request Guidelines
- Commit subjects should be concise and imperative (e.g., `Add accordion variants`, `Fix panel resize bug`); avoid bundling unrelated changes.
- PRs should include a short summary, commands/tests run, linked issue or ticket, and before/after screenshots for UI changes.
- Call out new dependencies or config changes in the description. Keep branches rebased; avoid force-pushing over collaborative work without notice.
