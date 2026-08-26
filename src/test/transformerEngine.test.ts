import { describe, expect, it } from 'vitest'
import {
  computeAttention,
  embeddings,
  multiplyVector,
  softmax,
} from '../integrations/transformer-explainer/engine'

describe('transformer attention engine', () => {
  it('projects Q, K, and V into the documented dimensions', () => {
    const result = computeAttention()
    expect(result.queries).toHaveLength(embeddings.length)
    expect(result.queries[0]).toHaveLength(2)
    expect(result.keys[0]).toHaveLength(2)
    expect(result.values[0]).toHaveLength(2)
    expect(result.outputs[0]).toHaveLength(2)
  })

  it('normalizes every attention row', () => {
    const result = computeAttention()
    for (const row of result.weights)
      expect(row.reduce((sum, value) => sum + value, 0)).toBeCloseTo(1, 8)
    expect(softmax([1, 2, 3]).every((value) => value > 0)).toBe(true)
  })

  it('rejects mismatched Q/K/V projection dimensions', () => {
    expect(() => multiplyVector([1], [[1], [2]])).toThrow(/dimensions/)
  })
})
