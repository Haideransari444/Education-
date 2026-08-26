/*
 * AI Core modification/port, 2026.
 * Training-state concepts adapted from GAN Lab (Apache-2.0),
 * commit 09073e8d8c05ff572e287ba5e69007b3fb9101cd.
 * Rewritten as a deterministic educational simulation without TensorFlow.js.
 */
export type GanDataset = 'ring' | 'clusters' | 'line'

export interface GanPoint {
  x: number
  y: number
}

export interface GanState {
  iteration: number
  generatorMean: GanPoint
  generatorScale: number
  discriminatorAngle: number
  discriminatorConfidence: number
  generatorLoss: number
  discriminatorLoss: number
}

const seeded = (seed: number) => {
  let value = seed >>> 0
  return () => {
    value = (value * 1103515245 + 12345) >>> 0
    return value / 4294967296
  }
}

export const initialGanState = (): GanState => ({
  iteration: 0,
  generatorMean: { x: -0.55, y: 0.55 },
  generatorScale: 0.12,
  discriminatorAngle: -0.7,
  discriminatorConfidence: 0.9,
  generatorLoss: 1.1,
  discriminatorLoss: 0.35,
})

export function realSamples(dataset: GanDataset, count = 48): GanPoint[] {
  const random = seeded({ ring: 71, clusters: 83, line: 97 }[dataset])
  return Array.from({ length: count }, (_, index) => {
    if (dataset === 'ring') {
      const angle = (index / count) * Math.PI * 2 + (random() - 0.5) * 0.14
      const radius = 0.62 + (random() - 0.5) * 0.12
      return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius }
    }
    if (dataset === 'line') {
      const x = random() * 1.5 - 0.75
      return { x, y: x * 0.65 + (random() - 0.5) * 0.14 }
    }
    const side = index % 2 ? 1 : -1
    return {
      x: side * 0.48 + (random() - 0.5) * 0.28,
      y: side * -0.28 + (random() - 0.5) * 0.28,
    }
  })
}

export function generatedSamples(state: GanState, count = 40): GanPoint[] {
  const random = seeded(131 + state.iteration * 13)
  return Array.from({ length: count }, (_, index) => {
    const angle = random() * Math.PI * 2
    const radius = Math.sqrt(random()) * state.generatorScale
    const secondMode = index % 2 && state.generatorScale > 0.25 ? 0.35 : 0
    return {
      x: state.generatorMean.x + Math.cos(angle) * radius + secondMode,
      y: state.generatorMean.y + Math.sin(angle) * radius - secondMode * 0.4,
    }
  })
}

function target(dataset: GanDataset) {
  if (dataset === 'line') return { mean: { x: 0, y: 0 }, scale: 0.55 }
  if (dataset === 'clusters') return { mean: { x: 0, y: 0 }, scale: 0.62 }
  return { mean: { x: 0, y: 0 }, scale: 0.66 }
}

export function stepGan(
  state: GanState,
  dataset: GanDataset,
  learningRate: number,
): GanState {
  const desired = target(dataset)
  const progress = Math.min(learningRate * 0.42, 0.12)
  const unstable = learningRate >= 0.3
  const nextScale = unstable
    ? Math.max(0.06, state.generatorScale * 0.965)
    : state.generatorScale + (desired.scale - state.generatorScale) * progress
  const distance = Math.hypot(
    state.generatorMean.x - desired.mean.x,
    state.generatorMean.y - desired.mean.y,
  )
  const scaleError = Math.abs(nextScale - desired.scale)
  const iteration = state.iteration + 1
  return {
    iteration,
    generatorMean: {
      x:
        state.generatorMean.x +
        (desired.mean.x - state.generatorMean.x) * progress,
      y:
        state.generatorMean.y +
        (desired.mean.y - state.generatorMean.y) * progress,
    },
    generatorScale: nextScale,
    discriminatorAngle: Math.sin(iteration * 0.12) * (0.8 - scaleError),
    discriminatorConfidence: Math.max(0.5, 0.55 + distance * 0.35),
    generatorLoss: Math.max(
      0.18,
      distance + scaleError + (unstable ? 0.7 : 0.2),
    ),
    discriminatorLoss: Math.min(0.95, 0.3 + (1 - distance) * 0.3),
  }
}

export const isModeCollapsed = (state: GanState) =>
  state.iteration > 12 && state.generatorScale < 0.11
