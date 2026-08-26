# Visualizer integrations

The central registry is `src/integrations/registry.ts`. Each definition binds an exact `UpstreamSource` record to one or more curriculum topics and a lazy entry. `IntegrationEntry` resolves only the active chapter, renders a restrained loading state, and places the module inside `IntegrationErrorBoundary`. `UpstreamCredit` provides quiet expandable provenance near the end of each lesson.

## TensorFlow Playground

- Upstream: https://github.com/tensorflow/playground
- Commit: `02469bd3751764b20486015d4202b792af5362a6`
- License: Apache-2.0
- Mode: selective port; modified files state that they were rewritten by AI Core.
- Preserved reference: `src/nn.ts`.
- Live module: deterministic synthetic XOR/circles/clusters, configurable feature set, 1–3 hidden layers, 1–6 neurons, tanh/ReLU/sigmoid, learning rate, L2 regularization, forward propagation, batch backpropagation, loss, epochs, and decision boundary.
- Excluded: analytics, Material Design shell, D3/seedrandom bundles, original datasets, build output, and upstream UI.
- Runtime dependencies: React only; no TensorFlow.js.

## CNN Explainer

- Upstream: https://github.com/poloclub/cnn-explainer
- Commit: `d0971f9447ed9806022a3d47587b62394682bc51`
- License: MIT
- Mode: selective TypeScript port.
- Preserved reference: `src/utils/cnn.js`.
- Live module: original 7×7 synthetic image; edge, sharpen, and blur kernels; sliding position; feature map; ReLU; max pooling; textual shape/value readouts.
- Excluded: sample photos, model JSON/binary weights, custom fonts, GIFs, screenshots, Svelte shell, TensorFlow.js, and global design.
- Runtime dependencies: React only.

## GAN Lab

- Upstream: https://github.com/poloclub/ganlab
- Commit: `09073e8d8c05ff572e287ba5e69007b3fb9101cd`
- License: Apache-2.0
- Mode: selective educational state-machine port; modified source is marked.
- Preserved reference: `demo/ganlab_models.ts`.
- Live module: seeded ring/clusters/line distributions, generated samples, discriminator surface, generator/discriminator losses, network-shape context, play/pause/step/reset, stable and intentionally unstable learning rates, and visible mode collapse.
- Excluded: pretrained JSON and binary weights, distribution images, paper figures, Polymer shell, D3 modules, and legacy TensorFlow.js Core.
- Runtime dependencies: React only.

## Transformer Explainer

- Upstream: https://github.com/poloclub/transformer-explainer
- Commit: `bfe50afba10b9b560b84143ee1107d977defa74f`
- License: MIT
- Mode: selective modular port.
- Preserved reference: `src/utils/data.ts`.
- Live modules: `TokenFlow`, `EmbeddingView`, `QKVView`, `AttentionMatrix`, `ResidualStreamView`, and logits/probabilities. A three-token hand-authored example computes scaled dot-product attention locally.
- Excluded: ONNX/model chunks, tokenizer files, cached model data, article assets, SvelteKit shell, D3 sankey, KaTeX, model runners, remote chunk fetching, and Google Tag Manager helper.
- Runtime dependencies: React only.

## Diffusion Explainer

- Upstream: https://github.com/poloclub/diffusion-explainer
- Commit: `0820016ce908a8e66619b7a1c9369af1498160d6`
- License: MIT
- Mode: selective timestep-controller and pipeline port.
- Preserved reference: `js/controller.js`.
- Live module: programmatically generated clean/noise scalar grids, bounded noise schedule, forward corruption, conceptual reverse denoising, timestep slider, direction, play/pause/previous/next/reset, and a small U-Net concept block.
- Excluded: the large generated-image corpus, GIF/video media, prompts, UMAP/text-vector data, Stable Diffusion weights, Python preprocessing, D3 page code, icons, and styles.
- Runtime dependencies: React only. This is not full Stable Diffusion inference.

## Accessibility and responsive behavior

All controls are native buttons, inputs, selects, and fieldsets with visible focus. Animated modules expose pause controls and lengthen intervals under reduced-motion preferences. SVGs have titles/descriptions or textual summaries. Color encodings are reinforced with shapes, labels, and readouts. Wide pipelines use an internal horizontal scroller at small widths instead of widening the page.

## Performance

Every integration is a dynamic import. Visiting the homepage, Explore, Vectors, or one integration does not execute the other four. Production build output should be audited after each change for the main application chunk, five named lazy chunks, and static asset size.
