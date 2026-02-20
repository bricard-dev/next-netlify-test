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

## Development Methodology

This is a small bakery showcase site. Keep it simple and content-focused.

### Build page by page, not component by component
Complete each page end-to-end before refactoring. Typical pages: home, products, about, contact.

### Sanity-first workflow
Define schemas before coding UI — content drives everything. For each page:
1. Define the Sanity schema
2. Add mock content in the Studio
3. Write the GROQ query
4. Build the Next.js component that displays the data

### Testing strategy
- **No TDD on UI** — avoid testing React implementation details
- **Vitest** for pure utility functions and GROQ helpers only, when logic is non-trivial
- **Playwright** for 1–2 critical user flows (e.g. page renders, contact form works)
- Do not aim for exhaustive test coverage

### Naming conventions
Folders and files follow the **Next.js kebab-case convention**: `my-component/`, `hero-section.tsx`, `site-settings.ts`. Never use CamelCase for folder or file names.

### Component style convention
Always write UI components following the **shadcn/ui pattern**:
- `React.forwardRef` + `displayName`
- `cn()` from `@/lib/utils` for className merging
- Spread `...props` to the underlying HTML element
- Export the component and its props type
- Place UI primitives in `src/components/ui/`

```tsx
const MyComponent = React.forwardRef<HTMLElement, MyComponentProps>(
  ({ className, ...props }, ref) => (
    <element ref={ref} className={cn("base-classes", className)} {...props} />
  )
)
MyComponent.displayName = "MyComponent"
export { MyComponent }
```

### What to avoid
- Over-engineering components (no need for a full design system)
- Spending time on config instead of content and design
- Abstracting things prematurely

### Rhythm
One branch per page (`feature/<page-name>`) → PR to `develop` → merge when the page is presentable.

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

### Composants personnalisés Studio
Les composants custom dans `src/sanity/components/` doivent **toujours** utiliser les primitives `@sanity/ui` (`Card`, `Flex`, `Stack`, `Text`, `Grid`, etc.) — jamais de CSS inline ou de classes Tailwind.

### Documentation Sanity
En cas de doute sur une API, un comportement ou une convention Sanity, **toujours consulter le MCP Sanity** (`search_docs` puis `read_docs`) plutôt que de supposer.

## Project Management (Linear)

### Structure des milestones
Deux milestones seulement, représentant des **états livrables** (pas des étapes techniques) :

- **Beta** — Site fonctionnel et navigable avec les pages principales, déployé en deploy preview. Critère : un client peut parcourir le site.
- **Launch** — Site prêt pour la production : légalement conforme (RGPD), indexable, testé E2E, mergé dans `main`.

### Structure des epics
Les **epics** sont des issues parentes dans Linear (pas un type distinct). Chaque epic regroupe toutes les issues d'un même domaine fonctionnel.

Hiérarchie : **Project → Milestone → Epic (issue parente) → Issues (sous-issues)**

| Milestone | Epics |
|-----------|-------|
| Beta | Home Page, Page Produits, Page À propos, Page Contact |
| Launch | Pages légales, SEO & Performance, Infrastructure & Deploy |

### Format des issues
Chaque issue suit ce template :

```
> **User story** — En tant que [persona], je veux [action] afin de [bénéfice].

## Contexte
[Pourquoi cette tâche existe, quel problème elle résout]

## Tâche
[Ce qui doit être fait concrètement]

## Definition of Done
- [ ] Critère vérifiable 1
- [ ] Critère vérifiable 2
```

### Règles
- Le SEO et la performance s'intègrent dans chaque page, pas dans un milestone séparé à la fin
- "Mise en production" est un état (milestone Launch), pas une issue isolée
- Chaque critère de DoD doit être vérifiable objectivement (pas de "c'est bien fait")
