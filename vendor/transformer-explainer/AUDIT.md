# Transformer Explainer audit

- Repository: https://github.com/poloclub/transformer-explainer
- Commit: `bfe50afba10b9b560b84143ee1107d977defa74f`
- Primary license: MIT
- Imported: `LICENSE`; reviewed reference `src/utils/data.ts` as `source/data.ts`.
- Code decision: approved for a selective React/TypeScript port of the staged token → Q/K/V → attention → output interaction pattern.
- Assets decision: not approved; article PNGs, previews, favicon, fonts, and upstream design assets were excluded.
- Data decision: not approved; cached examples and mock model outputs were excluded. AI Core uses tiny hand-authored vectors labeled educational.
- Weights/model decision: not approved; ONNX/model chunks and tokenizer resources are not copied or fetched.
- Dependencies reviewed: SvelteKit, D3 7, d3-sankey, KaTeX, ONNX Runtime Web, and Xenova transformers. AI Core imports none for this flagship.
- Excluded: page shell, global design system, article content, Google Tag Manager helper, model sessions, chunk fetching, tokenizers, cached runs, and model metadata.

The resulting lesson teaches attention math with a deterministic tiny transformer and cannot generate production-model text.
