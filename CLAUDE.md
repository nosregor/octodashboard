# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
```

All scripts require `NODE_OPTIONS='--openssl-legacy-provider'` (handled by `cross-env` in package.json) due to Node.js OpenSSL compatibility.

There is no test suite. Linting runs automatically via husky pre-commit hooks (ESLint + Prettier via `pretty-quick`).

To lint manually: `npx eslint --fix <file>`

## Architecture

This is a **Next.js** app (v9) with two pages:

- `pages/index.js` — Landing page with a username input form; on submit, routes to `/user?id=<username>`
- `pages/user.js` — Dashboard page; fetches GitHub data client-side and renders components

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

## Current Migration Strategy
- We are migrating a legacy Next.js v9 Pages Router app to the latest version.
- Goal 1: Remove Babel completely and switch to the native Rust-based Next.js SWC compiler.
- Goal 2: Safely upgrade Next.js and React dependencies incrementally via Bun.
- Goal 3: Setup TypeScript.
- Goal 4: Migrate from styled-components to Tailwind CSS.
- Crucial: Take an incremental approach. Do not mix dependency updates with styling updates.
