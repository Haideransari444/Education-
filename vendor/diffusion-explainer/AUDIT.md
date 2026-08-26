# Diffusion Explainer audit

- Repository: https://github.com/poloclub/diffusion-explainer
- Commit: `0820016ce908a8e66619b7a1c9369af1498160d6`
- Primary license: MIT
- Imported: `LICENSE`; reviewed reference `js/controller.js` as `source/controller.js`.
- Code decision: approved for a selective React/TypeScript port of timestep navigation and play/pause/step interaction.
- Assets decision: not approved. The large generated-image/GIF corpus, icons, screenshots, and media were excluded because per-asset provenance was not established.
- Data decision: not approved. UMAP and text-vector JSON files were excluded.
- Weights/model decision: not approved. No Stable Diffusion or other model files are imported.
- Dependencies reviewed: the original browser code expects global D3 and precomputed assets. AI Core uses neither; it renders programmatically generated scalar grids in SVG.
- Excluded: generated image collections, videos/GIFs, Python preprocessing, HTML/CSS shell, descriptions, prompt examples, UMAP data, build/deployment files, and all unused visual code.

The flagship is an algorithmic educational simulation, not Stable Diffusion inference. It works from local code after the site loads.
