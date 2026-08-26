/*
 * AI Core modification/port, 2026.
 * Dense-network concepts adapted from TensorFlow Playground (Apache-2.0),
 * commit 02469bd3751764b20486015d4202b792af5362a6.
 * This file is substantially rewritten and has no runtime TensorFlow dependency.
 */
export type DatasetKind = 'xor' | 'circles' | 'clusters'
export type ActivationName = 'tanh' | 'relu' | 'sigmoid'
export type FeatureName = 'x1' | 'x2' | 'x1x2' | 'x1sq' | 'x2sq'

export interface Point {
  x: number
  y: number
  label: 0 | 1
}

export interface PlaygroundConfig {
  dataset: DatasetKind
  features: FeatureName[]
  layers: number
  neurons: number
  activation: ActivationName
  learningRate: number
  regularization: number
}

export interface DenseLayer {
  weights: number[][]
  biases: number[]
}

export interface PlaygroundModel {
  layers: DenseLayer[]
  epoch: number
  loss: number
}

const seeded = (seed: number) => {
  let value = seed >>> 0
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0
    return value / 4294967296
  }
}

export function createDataset(kind: DatasetKind, count = 72): Point[] {
  const random = seeded({ xor: 11, circles: 23, clusters: 37 }[kind])
  return Array.from({ length: count }, (_, index) => {
    if (kind === 'circles') {
      const ring = index % 2
      const radius = (ring ? 0.72 : 0.28) + (random() - 0.5) * 0.12
      const angle = random() * Math.PI * 2
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        label: ring as 0 | 1,
      }
    }
    if (kind === 'clusters') {
      const label = (index % 2) as 0 | 1
      const center = label ? 0.45 : -0.45
      return {
        x: center + (random() - 0.5) * 0.55,
        y: center + (random() - 0.5) * 0.55,
        label,
      }
    }
    const x = random() * 1.8 - 0.9
    const y = random() * 1.8 - 0.9
    return { x, y, label: (x * y > 0 ? 1 : 0) as 0 | 1 }
  })
}

export function featureVector(
  point: Pick<Point, 'x' | 'y'>,
  features: FeatureName[],
) {
  return features.map((feature) => {
    if (feature === 'x1') return point.x
    if (feature === 'x2') return point.y
    if (feature === 'x1x2') return point.x * point.y
    if (feature === 'x1sq') return point.x * point.x
    return point.y * point.y
  })
}

export function validateConfig(config: PlaygroundConfig) {
  if (!config.features.length) return 'Select at least one input feature.'
  if (config.layers < 1 || config.layers > 3)
    return 'Layers must be from 1 to 3.'
  if (config.neurons < 1 || config.neurons > 6)
    return 'Neurons must be from 1 to 6.'
  if (config.learningRate <= 0 || config.learningRate > 1)
    return 'Learning rate must be greater than 0 and at most 1.'
  return null
}

export function createModel(config: PlaygroundConfig): PlaygroundModel {
  const random = seeded(
    101 + config.layers * 17 + config.neurons * 31 + config.features.length,
  )
  const sizes = [
    config.features.length,
    ...Array(config.layers).fill(config.neurons),
    1,
  ]
  const layers: DenseLayer[] = []
  for (let layer = 1; layer < sizes.length; layer += 1) {
    layers.push({
      weights: Array.from({ length: sizes[layer] }, () =>
        Array.from({ length: sizes[layer - 1] }, () => (random() - 0.5) * 1.4),
      ),
      biases: Array(sizes[layer]).fill(0),
    })
  }
  return { layers, epoch: 0, loss: Math.log(2) }
}

function activate(value: number, name: ActivationName) {
  if (name === 'relu') return Math.max(0, value)
  if (name === 'sigmoid') return 1 / (1 + Math.exp(-value))
  return Math.tanh(value)
}

function derivative(output: number, name: ActivationName) {
  if (name === 'relu') return output > 0 ? 1 : 0
  if (name === 'sigmoid') return output * (1 - output)
  return 1 - output * output
}

function forward(
  input: number[],
  model: PlaygroundModel,
  config: PlaygroundConfig,
) {
  const activations: number[][] = [input]
  for (let index = 0; index < model.layers.length; index += 1) {
    const layer = model.layers[index]
    const previous = activations[index]
    const isOutput = index === model.layers.length - 1
    activations.push(
      layer.weights.map((weights, neuron) => {
        const total = weights.reduce(
          (sum, weight, inputIndex) => sum + weight * previous[inputIndex],
          layer.biases[neuron],
        )
        return isOutput
          ? 1 / (1 + Math.exp(-total))
          : activate(total, config.activation)
      }),
    )
  }
  return activations
}

export function predict(
  model: PlaygroundModel,
  config: PlaygroundConfig,
  point: Pick<Point, 'x' | 'y'>,
) {
  const values = forward(featureVector(point, config.features), model, config)
  return values[values.length - 1][0]
}

export function trainEpoch(
  model: PlaygroundModel,
  config: PlaygroundConfig,
  points: Point[],
): PlaygroundModel {
  if (validateConfig(config)) return model
  const gradients = model.layers.map((layer) => ({
    weights: layer.weights.map((row) => row.map(() => 0)),
    biases: layer.biases.map(() => 0),
  }))
  let loss = 0
  for (const point of points) {
    const activations = forward(
      featureVector(point, config.features),
      model,
      config,
    )
    const probability = activations[activations.length - 1][0]
    loss +=
      -point.label * Math.log(Math.max(probability, 1e-7)) -
      (1 - point.label) * Math.log(Math.max(1 - probability, 1e-7))
    let delta = [probability - point.label]
    for (
      let layerIndex = model.layers.length - 1;
      layerIndex >= 0;
      layerIndex -= 1
    ) {
      const layer = model.layers[layerIndex]
      const previous = activations[layerIndex]
      const nextDelta = previous.map((output, previousIndex) => {
        const propagated = layer.weights.reduce(
          (sum, weights, neuron) =>
            sum + weights[previousIndex] * delta[neuron],
          0,
        )
        return layerIndex
          ? propagated * derivative(output, config.activation)
          : 0
      })
      delta.forEach((value, neuron) => {
        gradients[layerIndex].biases[neuron] += value
        previous.forEach((input, inputIndex) => {
          gradients[layerIndex].weights[neuron][inputIndex] += value * input
        })
      })
      delta = nextDelta
    }
  }
  const scale = config.learningRate / points.length
  return {
    layers: model.layers.map((layer, layerIndex) => ({
      biases: layer.biases.map(
        (bias, neuron) => bias - scale * gradients[layerIndex].biases[neuron],
      ),
      weights: layer.weights.map((weights, neuron) =>
        weights.map(
          (weight, inputIndex) =>
            weight -
            scale *
              (gradients[layerIndex].weights[neuron][inputIndex] +
                config.regularization * weight),
        ),
      ),
    })),
    epoch: model.epoch + 1,
    loss: loss / points.length,
  }
}
