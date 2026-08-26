# TensorFlow Playground audit

- Repository: https://github.com/tensorflow/playground
- Commit: `02469bd3751764b20486015d4202b792af5362a6`
- Primary license: Apache-2.0
- Imported: `LICENSE`; reviewed reference `src/nn.ts` as `source/nn.ts`.
- Code decision: approved for a clearly marked, selective educational port of dense-network forward/back propagation concepts.
- Assets decision: not approved; no upstream image, icon, font, or compiled bundle is imported.
- Data decision: not approved; AI Core generates its own deterministic synthetic point sets.
- Weights/model decision: not approved; AI Core initializes and trains its own tiny browser-local parameters.
- Dependencies reviewed: D3 3, seedrandom, Material Design Lite, line chart and heatmap helpers. AI Core imports none; it uses local deterministic TypeScript and native SVG.
- Excluded: page shell, Material Design UI, analytics (`analytics.js`), distribution/build files, dependency bundles, original datasets, heatmap renderer, and unrelated utilities.

The AI Core engine is a modified, framework-independent port. It contains an Apache modification notice and performs no telemetry or network access.
