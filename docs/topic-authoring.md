# Topic authoring

AI Core follows this educational hierarchy:

```text
Category → Topic → Chapter → Educational blocks and interactions
```

Topic and chapter metadata live in the curriculum registry. Chapter IDs, numbers, ordering, titles, descriptions, difficulty, status, estimated time, prerequisites, routes, progress, and search are data-driven. Rich prose and interactive teaching flows remain in React components where structure and accessibility are clearer than serialized content.

Available chapters receive a route at `/learn/:topicId/:chapterId`. Planned chapters are registered and visible but contain only an honest planned-state page. Opening a chapter never marks it complete; the learner explicitly toggles completion at the end. Progress is stored locally per topic and never gates navigation.

Chapter flows should select the educational blocks that support the concept: explanations, formal definitions, worked calculations, SDK visualizers, browser-local experiments, AI connections, code examples, contextual mistakes, challenges, and summaries. Do not mechanically include every block.

Visualizers reuse `VisualizerFrame`, `CoordinatePlane`, numeric controls, arrows, and accessible draggable points. Challenges always provide native controls, check, hint, and reset. Code examples use the reusable `CodeBlock`; NumPy and PyTorch should appear where they clarify the mathematical operation rather than as standalone API documentation.

All new content must remain client-side, keyboard and touch accessible, independently deployable, and usable when upstream educational sites disappear.
