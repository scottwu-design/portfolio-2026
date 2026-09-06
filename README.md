# Scott Wu — Portfolio

Personal portfolio site, rebuilt from the original IM Creator site as a static
Next.js app.

## Stack

- **Next.js** (App Router, static export)
- **TypeScript**
- **Tailwind CSS v4**

## Project structure

```
src/
  app/                 routes (Home, Work, Work/[slug], About, Resume)
  components/          Header, Footer, SectionRenderer, ProjectGrid, ...
  data/
    types.ts            shared content types
    resume.ts            hand-authored resume data
    content/*.json       per-page structured content (parsed from the
                          original site) — projects-index.json drives the
                          Work grid, the rest feed each case-study page
  lib/content.ts        typed accessors over the JSON content
public/
  images/               every image asset from the original site, downloaded
                          locally (filenames are content hashes)
```

Editing content: the case-study pages render generically from
`src/data/content/<slug>.json` via `SectionRenderer` — each section is either
`{ kind: "content", nodes, images }` (nodes are `heading` / `para` / `list`)
or `{ kind: "roleTeamDuration", role, team, duration, images }`. Edit the
JSON directly, or replace a project's page with fully custom JSX under
`src/app/work/[slug]` if you want bespoke layouts for specific case studies.

Home, About, and Resume are hand-authored components (not generic) — edit
`src/app/page.tsx`, `src/app/about/page.tsx`, `src/app/resume/page.tsx`, and
`src/data/resume.ts` directly.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Building

```bash
npm run build
```

This produces a fully static export in `out/` (see `output: "export"` in
`next.config.ts`) — no Node server needed to host it.

## Deploying to GitHub Pages

A workflow at `.github/workflows/deploy.yml` builds and deploys `out/` to
GitHub Pages automatically on every push to `main`.

One-time setup after pushing this repo to GitHub:

1. Go to the repo's **Settings → Pages**.
2. Under "Build and deployment", set **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the Actions tab).

The site will be available at `https://<username>.github.io/<repo-name>/`
(or your custom domain, if you configure one in the same Pages settings —
add a `public/CNAME` file with your domain).

The workflow sets `NEXT_PUBLIC_BASE_PATH` automatically for project pages
(`/repo-name`); if you use a custom domain or a `<username>.github.io` root
repo, GitHub's `configure-pages` action reports an empty base path and no
extra config is needed.

## Content notes

- All 16 case studies from the original **Selected Works** grid are
  included, plus Home, Work, About, and Resume.
- Four pages that existed in the original editor but were never linked from
  the public site (an OOBE case-study duplicate, a design-patents page, an
  FxOS Smart Watch concept, and an internal "confidential" duplicate of the
  KaiOS Smart Touch case study) were intentionally left out of this rebuild.
- The **KaiOS Smart Touch** case study was password-protected on the
  original live site; this rebuild publishes it as a normal public page,
  using the full content that existed in the (unlocked) editor.
