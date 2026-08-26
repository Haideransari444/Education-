# Third-Party Notices

AI Core selectively adapts code and interaction ideas from the following permissively licensed educational projects. The upstream organizations do not endorse AI Core. Exact license texts and audit records are preserved under `vendor/`.

## CNN Explainer

- Copyright (c) 2020 Polo Club of Data Science
- Repository: https://github.com/poloclub/cnn-explainer
- Commit: `d0971f9447ed9806022a3d47587b62394682bc51`
- License: MIT
- Reused: reviewed convolution/pooling computation and layer-inspection concepts.
- Modified: reimplemented in React/TypeScript with an original synthetic pixel grid, AI Core controls, accessibility text, and no model or upstream assets.

## TensorFlow Playground

- Copyright 2016 Google Inc.
- Repository: https://github.com/tensorflow/playground
- Commit: `02469bd3751764b20486015d4202b792af5362a6`
- License: Apache-2.0
- Reused: reviewed dense network, activation, forward propagation, backpropagation, and training concepts.
- Modified: replaced the application and dependency stack with a deterministic, small AI Core TypeScript engine and native SVG interface. Upstream analytics were not imported.

## GAN Lab

- Repository: https://github.com/poloclub/ganlab
- Commit: `09073e8d8c05ff572e287ba5e69007b3fb9101cd`
- License: Apache-2.0
- Reused: reviewed generator/discriminator alternation and training-state concepts.
- Modified: replaced legacy TensorFlow.js training and Polymer/D3 UI with a deterministic educational parameter simulation and native React/SVG controls. No pretrained weights are used.

## Transformer Explainer

- Copyright (c) 2024 Polo Club of Data Science
- Repository: https://github.com/poloclub/transformer-explainer
- Commit: `bfe50afba10b9b560b84143ee1107d977defa74f`
- License: MIT
- Reused: reviewed staged explanation and data-flow concepts for token embeddings, Q/K/V, attention, and output probabilities.
- Modified: uses an original tiny deterministic attention example and reusable AI Core React components. No tokenizer, ONNX model, model data, or tracking code is included.

## Diffusion Explainer

- Copyright (c) 2023 Polo Club of Data Science
- Repository: https://github.com/poloclub/diffusion-explainer
- Commit: `0820016ce908a8e66619b7a1c9369af1498160d6`
- License: MIT
- Reused: reviewed timestep-controller and staged forward/reverse pipeline interaction concepts.
- Modified: all imagery is replaced by programmatically generated local grids; controls and explanations are rebuilt in React/TypeScript. No generated-image corpus, dataset, or model weights are included.

Package dependencies and their exact versions are recorded in `package-lock.json`. This milestone adds no production dependency.
