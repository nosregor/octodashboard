# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun run dev      # Start dev server (localhost:3000)
bun run build    # Production build
bun run start    # Start production server
```

All scripts require `NODE_OPTIONS='--openssl-legacy-provider'` (handled by `cross-env` in package.json) due to Node.js OpenSSL compatibility.

There is no test suite. Linting runs automatically via husky pre-commit hooks (ESLint + Prettier via `pretty-quick`).

To lint manually: `npx eslint --fix <file>`

## Architecture

This is a **Next.js 14** app (Pages Router) with TypeScript being adopted incrementally. New and converted files use `.tsx`; legacy files remain `.js` until migrated.

Pages:
- `pages/index.tsx` — Landing page with a username input form; on submit, routes to `/user?id=<username>`
- `pages/user.js` — Dashboard page; fetches GitHub data client-side and renders components (not yet converted to TS)

**Data flow in `pages/user.js`:**
1. On mount, calls three data sources in parallel:
   - `https://api.github.com/users/<username>` → `userData`
   - `GhPolyglot.userStats()` (wraps GitHub API for language aggregation) → `langData`
   - `https://api.github.com/users/<username>/repos?per_page=100` → `repoData`
2. Also checks `https://api.github.com/rate_limit` and shows `<RateLimit>` if near the limit
3. All API calls are unauthenticated; 403 errors indicate GitHub API rate limiting

**Mock data for local development:** `utils/mockUserData.js`, `utils/mockRepoData.js`, `utils/mockLangData.js` exist and can be swapped in by uncommenting the import/usage lines in `pages/user.js` (they're commented out).

**Charts** (`components/Charts.js`): Three Chart.js canvases rendered via `utils/buildChart.js`:
- `langChart` — Pie chart of top languages (from `langData`)
- `starChart` — Bar chart of top 5 most-starred repos (from `repoData`)
- `thirdChart` — Doughnut chart of stars per language (computed from `repoData`)

Charts are initialized imperatively in `useEffect` by grabbing canvas elements by ID.

**Styling:** Styled-components throughout. Central theme at `style/theme.js` (colors, fonts, transition). Shared mixins at `style/mixins.js`. Responsive breakpoints at `style/media.js`. Import from `style/` barrel via `import { theme, mixins, media, GlobalStyle, Section } from '../style'`.

**Deployment:** Vercel (formerly Zeit Now). Config in `now.json`; deploy with `now` CLI.

## Migration Status
- **Done — Goal 1:** Babel removed; SWC compiler active.
- **Done — Goal 2:** Next.js 14.2, React 18, ESLint 8 + eslint-config-next.
- **Done — Goal 3:** TypeScript installed; `tsconfig.json` configured with `moduleResolution: bundler`; `pages/index.tsx` converted.
- **Pending — Goal 4:** Migrate from styled-components to Tailwind CSS.
- Rule: incremental approach — do not mix dependency upgrades with styling changes.
