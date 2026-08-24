# AI Core

A free and open-source interactive platform for understanding artificial intelligence visually.

**Early development — curriculum and visualizers are not yet complete.**

## Current status

The project currently provides the technical foundation and visual shell: a data-driven curriculum, lesson shell, command palette, local progress storage abstraction, responsive interface, and GitHub Pages deployment. It does not yet contain finished educational lessons or AI visualizers.

## Philosophy

AI Core is designed as a quiet combination of developer tool, interactive textbook, and playground. The interface favors typography, space, keyboard access, and direct manipulation over course-marketplace patterns.

## Technology

React, TypeScript, Vite, React Router, Tailwind CSS, Vitest, Testing Library, ESLint, and Prettier.

## Local development

Requires Node.js 22 or newer.

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run lint
npm run test
npm run build
npm run format:check
```

## Deployment

Pushes to `main` run linting, tests, and a production build before deploying `dist` with GitHub Actions. Vite emits relative asset paths, and hash routing keeps direct lesson and explore URLs refresh-safe on the `Education-` GitHub Pages project site. This also avoids coupling the build to the repository path if a custom domain is added later.

In repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.

## Contributions

The architecture is open for review, but the curriculum and contribution workflow are still being established. Please open an issue before beginning a large lesson or visualizer.

## Roadmap

1. Validate the curriculum map and lesson authoring format.
2. Build the first complete visual lesson as an architectural reference.
3. Add reusable visualization and experiment primitives.
4. Expand local progress and accessibility testing.

Visualization and upstream-integration conventions are documented in `docs/visualization-sdk.md` and `docs/upstream-integration.md`. Integrated educational modules must not depend on the upstream demo or upstream website remaining online.

Licensed under the Apache License 2.0. Third-party components and modifications will be recorded in `THIRD_PARTY_NOTICES.md`.
