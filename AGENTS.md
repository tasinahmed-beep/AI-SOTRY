# Repository Guidelines

## Project Structure & Module Organization
- `src/` – app code (TypeScript + React).
  - `src/pages/` – route views (e.g., `Index.tsx`, `About.tsx`).
  - `src/components/` – feature/components; prefer PascalCase (e.g., `Header.tsx`).
  - `src/components/ui/` – reusable shadcn-style primitives; keep kebab-case (e.g., `alert-dialog.tsx`).
  - `src/assets/` – images and static media.
- `public/` – static files served by Vite (e.g., `favicon.ico`).
- Root config: `vite.config.ts`, `tailwind.config.ts`, `postcss.config.js`, `eslint.config.js`, `tsconfig*.json`, `index.html`.

Favor feature folders when changes span components, hooks, and utils.

## Build, Test, and Development Commands
- `npm install` (or `bun install`) – install deps.
- `npm run dev` (or `bun dev`) – start Vite dev server with HMR.
- `npm run build` – production build to `dist/`.
- `npm run build:dev` – dev-mode build (useful for quick checks).
- `npm run preview` – preview the production build locally.
- `npm run lint` – run ESLint across the repo.

## Coding Style & Naming Conventions
- TypeScript strictness per `tsconfig*.json`; no implicit any.
- Indentation: 2 spaces; UTF-8; LF line endings.
- Naming: camelCase for vars/functions; PascalCase for React components; kebab-case for files in `ui/`.
- Imports: prefer absolute from `src` if configured; otherwise relative.
- Run `npm run lint` and fix warnings before PRs.

## Testing Guidelines
- No test framework is configured yet. If adding tests, prefer Vitest + React Testing Library.
- Place tests alongside code as `*.test.ts(x)` or under `tests/` mirroring `src/`.
- Aim for concise, deterministic tests; avoid network and timers unless mocked.

## Commit & Pull Request Guidelines
- Conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`, `style:`, `test:`.
- Keep commits small and scoped (e.g., `feat(header): add sticky behavior`).
- PRs: include a clear description, linked issue, and screenshots for UI changes. Ensure `lint` passes and app builds.

## Security & Configuration Tips
- Environment vars use Vite’s `VITE_` prefix (e.g., `VITE_API_URL`). Do not commit secrets.
- Use `.env.local` for local secrets; consider adding `.env.example` for non‑secret keys.
- Review third‑party deps; avoid unused packages.

## Agent-Specific Instructions
- Do not edit generated output in `dist/`.
- Keep changes minimal and consistent with existing patterns.
- Place new shared primitives under `src/components/ui/`; feature-level components in `src/components/`.

## Project-Specific Notes for Agents

- Gallery Data Model
  - Items live in `src/data/gallery/<id>/` with two files:
    - `image.jpg|png|webp` (the actual image)
    - `meta.json` with fields: `id`, `title`, `prompt`, `negativePrompt`, `style`, `aspectRatio` (e.g., `5:7`), `size` (e.g., `640 X 896`), `orientation` (`portrait`|`landscape`), `tags` (string[]), optional `description`.
  - The app loads items via `import.meta.glob` in `src/data/loadGallery.ts` and sorts by numeric `id`.
  - Do not reintroduce per-item imports in pages; always use the loader.

- Validation & Scripts
  - Run `npm run validate:gallery` to validate and auto-fix gallery metadata.
    - Enforces required fields, removes deprecated `file` field, checks tag/length limits, and ensures an `image.*` exists per folder.

- Routing & Deep Links
  - Index page supports deep linking: `/p/:id` opens the item modal.
  - Routes are defined in `src/App.tsx`; Index is used for `/` and `/p/:id`.
  - Modal state is URL-driven; avoid adding internal modal state in grid components.

- Search
  - Fuzzy search uses a lightweight built-in matcher (no external deps) across `title`, `tags`, and `prompt`. See `src/lib/search.ts`.
  - Implement query behavior in `src/pages/Index.tsx`; prefer updating this central logic instead of scattering searches.

- Keyboard Navigation
  - When modal is open, ArrowLeft/ArrowRight navigates prev/next within the current filtered list; Escape closes.
  - Handled in `src/pages/Index.tsx` with a `keydown` listener.

- Theming & UI
  - `ThemeProvider` wraps the app; `ModeToggle` sits in the header.
  - Keep icon-only buttons accessible with `aria-label`.

- Tailwind
  - Tailwind scans only `src/**/*.{ts,tsx}`. Add classes within `src` to ensure they’re included.

- Adding Items
  - Prefer the folder pattern above; after adding, run `npm run validate:gallery`.
  - If adding automation, place scripts under `scripts/` and update `package.json` scripts.

## Image Pipeline (Phase 2)
- Generate responsive images and placeholders with `npm run build:images` (requires `sharp`).
  - Produces `image-400w.webp`, `image-800w.webp`, `image-1200w.webp` and `meta.generated.json` (width, height, placeholder) in each `src/data/gallery/<id>/` folder.
  - App will automatically pick up `srcSet`, `width/height`, and `placeholder` if present via the loader.
- Do not commit large unnecessary derivatives beyond what the script generates; keep the original `image.*` in each folder.

## Pre-rendering (Phase 3 SEO)
- We pre-render key routes and all `/p/:id` to static HTML for better SEO.
- Commands:
  - `npm run build:ssg` → builds, prerenders HTML, and generates `public/sitemap.xml`.
  - Requires `puppeteer` to be installed: `npm i -D puppeteer`.
- Implementation details:
  - Script `scripts/prerender.mjs` serves `dist/` locally and snapshots HTML for: `/`, `/about`, `/privacy`, `/terms`, `/disclaimer`, and every gallery id at `/p/:id`.
  - Pages set titles, meta descriptions, canonical, and JSON-LD client‑side (`Seo` + `StructuredData`), which prerender captures.
