# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # install dependencies (first time / after pulling)
npm run dev       # dev server at http://localhost:4321
npm run build     # production build → dist/
npm run preview   # serve dist/ locally to verify build
```

No test runner or linter is configured.

## Architecture

This is an Astro 4 static blog with GitHub Pages deployment via `.github/workflows/deploy.yml`.

**Data flow:** Markdown files in `src/content/blog/` are validated by the Zod schema in `src/content/config.ts`, then consumed by `src/pages/index.astro` (post list) and `src/pages/blog/[slug].astro` (individual posts). The RSS feed at `src/pages/rss.xml.js` reads the same collection and requires `site` to be set in `astro.config.mjs`.

**Adding a post:** Create `src/content/blog/<post-slug>/index.md` with this frontmatter:

```markdown
---
title: 'Post Title'
description: 'Short description shown in the list and RSS.'
pubDate: 'Apr 19 2026'
updatedDate: 'Apr 20 2026'  # optional
---
```

Images and media go in the same folder as `index.md` and are referenced with relative paths (e.g. `![alt](./image.jpg)`). Astro processes them through its asset pipeline automatically.

**Layout chain:** `BlogPost.astro` wraps `BaseLayout.astro`. The `<link rel="alternate">` RSS autodiscovery tag lives in `BaseLayout.astro`.

**Site URL:** Update `site` (and optionally `base`) in `astro.config.mjs` before deploying. For a GitHub project site, uncomment `base: '/repo-name'` and update links accordingly. `SITE_TITLE` and `SITE_DESCRIPTION` are in `src/consts.ts`.

**GitHub Pages setup:** In the repo settings, set Pages source to "GitHub Actions". The workflow triggers on push to `main`.
