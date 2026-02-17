# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `pnpm dev` — Start development server (port 3000)
- `pnpm build` — Production build
- `pnpm start` — Start production server
- `pnpm lint` — Run ESLint

## Architecture

This is a Next.js 16 app using the **App Router** (`src/app/` directory), React 19, TypeScript (strict mode), and Tailwind CSS v4.

- **Path alias**: `@/*` maps to `./src/*`
- **Styling**: Tailwind CSS v4 with `@tailwindcss/postcss`; theme uses CSS custom properties in `globals.css` with light/dark mode via `prefers-color-scheme`
- **Fonts**: Playfair Display (serif, headings) and Instrument Sans (sans, body) loaded via `next/font/google`. Mapped in Tailwind theme as `font-serif` and `font-sans`. All `h1`–`h6` use `font-serif` via `@layer base`
- **ESLint**: Flat config format (ESLint 9) with Next.js core web vitals and TypeScript rules
- **CMS**: Sanity (headless). Studio intégré à `/studio`. Config dans `sanity.config.ts`, client et schémas dans `src/sanity/`. Requêtes via GROQ avec `next-sanity`
  - **Singletons**: Le type `settings` est configuré comme singleton via `src/structure/index.ts` (ID fixe: `settings`)
  - **Structure**: Navigation Studio personnalisée dans `src/structure/index.ts`
  - **Queries**: Helpers GROQ dans `src/sanity/queries/`

## Git Workflow

### Branches
Two permanent branches:
- `main` — production (deployed on Netlify). Never commit directly.
- `develop` — integration/staging (Netlify Deploy Preview). Never commit directly.

Feature branches branch off `develop` and merge back into `develop` via PR:
- `feature/<name>` — new functionality
- `fix/<name>` — bug fixes
- `chore/<name>` — maintenance, config, dependencies

When `develop` is stable and ready for release, merge `develop` into `main` via PR.

Exception: `hotfix/<name>` branches off `main` directly for urgent production fixes, then is merged into both `main` and `develop`.

Prefer **squash & merge** to keep history clean.

### Commits (Conventional Commits)
Format: `type(scope): description`

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Rules:
- Subject line in English, imperative mood, max ~72 characters
- Optional body separated by a blank line for additional context
- Examples: `feat(auth): add login page`, `fix(api): handle null response`

## Sanity CMS

### Singletons
Documents singleton (une seule instance autorisée) sont configurés dans `src/structure/index.ts`, **PAS dans le schéma**.

**Singleton actuel**: `settings` (ID fixe: `settings`)

**Pour ajouter un nouveau singleton**:
1. Créer le schéma normalement dans `src/sanity/schemaTypes/`
2. Ajouter le type au tableau `SINGLETONS` dans `src/structure/index.ts`
3. Ajouter un `S.listItem()` avec `.documentId('type-name')` dans la structure

**Requêtes GROQ pour singletons**: Toujours filtrer par `_id` fixe:
```groq
*[_type == "settings" && _id == "settings"][0]
```
