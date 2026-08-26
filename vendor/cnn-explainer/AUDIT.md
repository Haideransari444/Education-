# CNN Explainer audit

- Repository: https://github.com/poloclub/cnn-explainer
- Commit: `d0971f9447ed9806022a3d47587b62394682bc51`
- Primary license: MIT
- Imported: `LICENSE`; reviewed reference `src/utils/cnn.js` as `source/cnn.js`.
- Code decision: approved for a selective TypeScript port of convolution and pooling concepts.
- Assets decision: not approved. Sample photos, GIFs, icons, screenshots, and two custom fonts were excluded because repository-level licensing does not establish their individual provenance.
- Data decision: not approved. `nn_10.json` and related model metadata were excluded.
- Weights/model decision: not approved. `model.json` and `group1-shard1of1.bin` were excluded.
- Dependencies reviewed: Svelte 3, Rollup, TensorFlow.js 1.4. AI Core imports none of them; the port uses local TypeScript and SVG.
- Excluded: application shell, global styles, articles, navigation, analytics-adjacent page code, build output, screenshots, sample media, model files, and unused visualizer code.

No upstream runtime URL, model download, image, font, dataset, or weight is used by AI Core.
