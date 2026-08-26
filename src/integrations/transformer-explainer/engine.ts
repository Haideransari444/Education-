/* Attention pipeline adapted from Transformer Explainer interaction concepts
 * (MIT), commit bfe50afba10b9b560b84143ee1107d977defa74f.
 * Uses original tiny educational vectors and no upstream model data. */
export type Vector = number[]
export type Matrix = number[][]

export const tokens = ['the', 'cat', 'sat'] as const
export const embeddings: Matrix = [
  [0.8, 0.1, 0.2],
  [0.2, 0.9, 0.4],
  [0.4, 0.3, 0.9],
]

const qProjection: Matrix = [
  [0.7, 0.2],
  [0.1, 0.8],
  [0.5, -0.2],
]
const kProjection: Matrix = [
  [0.6, -0.1],
  [0.3, 0.7],
  [0.2, 0.6],
]
const vProjection: Matrix = [
  [0.8, 0.2],
  [-0.2, 0.9],
  [0.4, 0.5],
]

export function multiplyVector(vector: Vector, matrix: Matrix): Vector {
  if (vector.length !== matrix.length)
    throw new Error('Q/K/V dimensions do not match.')
  return matrix[0].map((_, column) =>
    vector.reduce((sum, value, row) => sum + value * matrix[row][column], 0),
  )
}

export const dot = (a: Vector, b: Vector) => {
  if (a.length !== b.length)
    throw new Error('Dot-product dimensions do not match.')
  return a.reduce((sum, value, index) => sum + value * b[index], 0)
}

export function softmax(values: Vector): Vector {
  const maximum = Math.max(...values)
  const exponentials = values.map((value) => Math.exp(value - maximum))
  const total = exponentials.reduce((sum, value) => sum + value, 0)
  return exponentials.map((value) => value / total)
}

export interface AttentionResult {
  queries: Matrix
  keys: Matrix
  values: Matrix
  scores: Matrix
  weights: Matrix
  outputs: Matrix
}

export function computeAttention(input: Matrix = embeddings): AttentionResult {
  const queries = input.map((vector) => multiplyVector(vector, qProjection))
  const keys = input.map((vector) => multiplyVector(vector, kProjection))
  const values = input.map((vector) => multiplyVector(vector, vProjection))
  const scores = queries.map((query) =>
    keys.map((key) => dot(query, key) / Math.sqrt(key.length)),
  )
  const weights = scores.map(softmax)
  const outputs = weights.map((row) =>
    values[0].map((_, dimension) =>
      row.reduce(
        (sum, weight, tokenIndex) =>
          sum + weight * values[tokenIndex][dimension],
        0,
      ),
    ),
  )
  return { queries, keys, values, scores, weights, outputs }
}

export function outputProbabilities(output: Vector) {
  const logits = [
    output[0] * 1.2,
    output[1],
    -output[0] * 0.4 + output[1] * 0.6,
  ]
  return softmax(logits)
}
