# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package Manager

Use **Bun** for all commands and package management. Never use `npm`, `npx`, or `yarn`.

```bash
bun run dev      # Start dev server (localhost:3000) with Turbopack
bun run build    # Production build
bun run start    # Start production server
```

Linting runs automatically via husky pre-commit hooks (ESLint + Prettier via `pretty-quick`).

To lint manually: `bunx eslint --fix <file>`

## Architecture

This is a **Next.js 16** app using the **Pages Router** with full TypeScript. All files use `.tsx` (components/pages) or `.ts` (pure logic).

```
pages/
  _app.tsx          # Global CSS import only
  _document.tsx     # HTML shell with lang="en"
  index.tsx         # Landing page — username input, routes to /user?id=<username>
  user.tsx          # Dashboard — fetches GitHub data client-side, renders all components

components/
  Head.tsx          # <head> meta, OG tags, favicons
  UserInfo.tsx      # Avatar, name, stats
  Charts.tsx        # Three Chart.js canvases (pie, bar, doughnut)
  Repos.tsx         # Top repositories list
  Footer.tsx        # Footer with links
  Corner.tsx        # GitHub corner ribbon
  Error.tsx         # Error state display
  RateLimit.tsx     # API rate limit warning

utils/
  buildChart.ts     # Chart.js v2 factory — typed with BuildChartConfig interface
  langColors.ts     # Record<string, string> mapping language names to hex colors
  mockUserData.ts   # Dev-only mock for GitHubUser
  mockRepoData.ts   # Dev-only mock for GitHubRepo[]
  mockLangData.ts   # Dev-only mock for LangStat[]
  index.ts          # Barrel — exports buildChart, langColors, color arrays, mocks

types/
  github.ts         # Shared interfaces: GitHubUser, GitHubRepo, LangStat, RateLimitCore, AppError
```

**Data flow in `pages/user.tsx`:**
1. On mount, calls three data sources in parallel:
   - `https://api.github.com/users/<username>` → `userData`
   - `GhPolyglot.userStats()` (wraps GitHub API for language aggregation) → `langData`
   - `https://api.github.com/users/<username>/repos?per_page=100` → `repoData`
2. Also checks `https://api.github.com/rate_limit` and shows `<RateLimit>` if near the limit
3. All API calls are unauthenticated; 403 errors indicate GitHub API rate limiting

**Mock data for local development:** uncomment the import and usage lines in `pages/user.tsx` to swap in mock data from `utils/`.

**Charts** (`components/Charts.tsx`): Three Chart.js v2 canvases built via `utils/buildChart.ts`:
- `langChart` — Pie chart of top most used languages (from `langData`)
- `starChart` — Bar chart of top 5 most-starred repos (from `repoData`)
- `thirdChart` — Doughnut chart of stars per language (computed from `repoData`)

Charts are initialized imperatively in `useEffect` by grabbing canvas elements by ID.

## Styling

**Tailwind CSS v4** — styled-components and the legacy `style/` folder are completely removed.

- Global styles live in `styles/globals.css` with `@import "tailwindcss"` at the top
- Custom animations and shared CSS classes (e.g. `.section-heading`, `.octo-arm`) are defined in `styles/globals.css` below the import
- Use Tailwind utility classes directly in JSX; no theme object, no mixins, no CSS-in-JS

## Deployment

Vercel with native Bun lockfile detection — no configuration required. The old `now.json` has been superseded by `vercel.json` for any project-level overrides.
