# Visualization SDK

AI Core visualizers separate pure mathematics, visualization state, SVG rendering, and lesson prose. Mathematical functions live under `src/visualization/math` and never import React. Reusable state hooks, controls, frames, and SVG primitives form the rendering layer. Lessons compose those pieces without duplicating coordinate conversion or interaction logic.

## Building a visualizer

1. Implement and test pure mathematical operations.
2. Keep deterministic defaults in the lesson module.
3. Place the graph inside `VisualizerFrame`.
4. Compose `CoordinatePlane`, `VectorArrow`, and interactive primitives.
5. Provide controls and a live textual readout alongside graphical interaction.

`CoordinatePlane` owns mathematical-to-SVG conversion and passes it to child primitives. `DraggablePoint` clamps input to visible bounds and supports pointer, touch, and arrow-key movement. Numeric controls are always present as a non-drag fallback.

## Lesson tabs and reset

`LessonTabs` is controlled by its lesson. Each tab renders one focused view: intuition, visual, math, code, or experiment. Interactive sections own small local state and expose explicit reset buttons that restore fixed defaults without reloading.

## Accessibility

Every SVG requires a title and description. Essential values appear as text, not color alone. Interactive SVG points are focusable and keyboard operable. Controls use native inputs and buttons, live results use polite announcements, focus remains visible, and reduced-motion preferences are respected globally.
