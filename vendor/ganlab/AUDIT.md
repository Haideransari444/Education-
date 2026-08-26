# GAN Lab audit

- Repository: https://github.com/poloclub/ganlab
- Commit: `09073e8d8c05ff572e287ba5e69007b3fb9101cd`
- Primary license: Apache-2.0
- Imported: `LICENSE`; reviewed reference `demo/ganlab_models.ts` as `source/ganlab_models.ts`.
- Code decision: approved for a clearly marked, small educational state-machine port inspired by the local training loop.
- Assets decision: not approved; figures, screenshots, icons, and distribution images were excluded.
- Data decision: not approved; AI Core generates seeded ring, line, and two-cluster samples locally.
- Weights/model decision: not approved; pretrained JSON and `.weights.bin` files were excluded.
- Dependencies reviewed: legacy TensorFlow.js Core 0.12 and D3 4 modules. AI Core imports neither and avoids version conflicts.
- Excluded: Polymer application shell, paper figures, pretrained models, compiled demo, styles, training presets, and unrelated experiment configuration.

The AI Core adapter is intentionally compact and deterministic. It demonstrates adversarial dynamics rather than reproducing GAN Lab's full research interface.
