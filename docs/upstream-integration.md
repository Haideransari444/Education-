# Upstream integration

AI Core integrates five selectively reviewed educational sources. Every source is recorded with `UpstreamSource`, including an exact commit, license, integration mode, and separate approval decisions for code, assets, data, and weights.

- `vendor/` is the preserved, pinned upstream snapshot.
- `src/integrations/` is the adapted AI Core implementation.
- `THIRD_PARTY_NOTICES.md` records attribution and modifications.

Integrated educational modules must not depend on the upstream demo or upstream website remaining online. If upstream disappears, the AI Core lesson must continue to work from repository-contained code and approved assets.

## Acquisition process

1. Resolve and record a full 40-character commit SHA before reviewing source.
2. Inspect the repository tree before downloading blobs, especially asset/model-heavy projects.
3. Review code, assets, data, model weights, fonts, dependencies, notices, analytics, and remote-loading behavior separately.
4. Preserve the exact license, audit, metadata, and only the reviewed reference source under `vendor/<id>/`.
5. Never edit a vendor snapshot to fit the app. Ports and modification notices belong under `src/integrations/<id>/`.
6. Use local deterministic inputs when individual asset/data/model provenance is not established.
7. Keep repository links in credits, but prohibit runtime fetches, remote scripts, CDNs, iframes, telemetry, and upstream-hosted assets.

## Current approval policy

For all five milestone integrations, reviewed repository code is approved for selective porting. Upstream assets, data, and weights are not approved and are not redistributed. Each live flagship is therefore self-contained TypeScript, React, CSS, and SVG with original synthetic or programmatic inputs.

## Dependency policy

No production dependency was added. Historical dependencies such as TensorFlow.js, D3, Svelte, Polymer, ONNX Runtime Web, Xenova transformers, KaTeX, and upstream UI systems were reviewed but were not needed for the compact flagship ports. This avoids incompatible TensorFlow.js versions and keeps the homepage lightweight.

## Runtime audit

Static tests reject obvious runtime fetches, XHR/axios usage, executable strings, iframes, upstream demo hosts, and analytics in integration production source. Manual network checks must show only the AI Core origin for educational functionality. External navigation occurs only when a learner explicitly opens a source-credit repository link.
