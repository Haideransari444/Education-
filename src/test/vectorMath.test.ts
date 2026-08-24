import { describe, expect, it } from 'vitest'
import {
  add,
  angleBetween,
  cosineSimilarity,
  distance,
  dot,
  euclideanDistance,
  infinityNorm,
  l1Norm,
  l2Norm,
  lpNorm,
  magnitude,
  manhattanDistance,
  normalize,
  scale,
  subtract,
} from '../visualization/math/vector2'
describe('vector math', () => {
  it('adds and subtracts', () => {
    expect(add({ x: 2, y: 1 }, { x: 1, y: 2 })).toEqual({ x: 3, y: 3 })
    expect(subtract({ x: 2, y: 1 }, { x: 1, y: 2 })).toEqual({ x: 1, y: -1 })
  })
  it('scales', () =>
    expect(scale({ x: 2, y: -1 }, -2)).toEqual({ x: -4, y: 2 }))
  it('calculates magnitude', () => expect(magnitude({ x: 3, y: 4 })).toBe(5))
  it('calculates dot product', () =>
    expect(dot({ x: 2, y: 1 }, { x: 1, y: 2 })).toBe(4))
  it('calculates distance', () =>
    expect(distance({ x: 0, y: 0 }, { x: 3, y: 4 })).toBe(5))
  it('normalizes vectors', () => {
    const result = normalize({ x: 3, y: 4 })
    expect(result.x).toBeCloseTo(0.6)
    expect(result.y).toBeCloseTo(0.8)
  })
  it('calculates angles', () => {
    expect(angleBetween({ x: 1, y: 0 }, { x: 0, y: 1 })).toBeCloseTo(90)
    expect(angleBetween({ x: 1, y: 0 }, { x: -1, y: 0 })).toBeCloseTo(180)
  })
  it('handles zero and non-finite values safely', () => {
    expect(normalize({ x: 0, y: 0 })).toEqual({ x: 0, y: 0 })
    expect(angleBetween({ x: 0, y: 0 }, { x: 1, y: 1 })).toBeNull()
    expect(scale({ x: Infinity, y: 1 }, 2)).toEqual({ x: 0, y: 2 })
  })
  it('calculates L1, L2, infinity, and general Lp norms', () => {
    const v = { x: -3, y: 4 }
    expect(l1Norm(v)).toBe(7)
    expect(l2Norm(v)).toBe(5)
    expect(infinityNorm(v)).toBe(4)
    expect(lpNorm(v, 2)).toBe(5)
    expect(lpNorm(v, Infinity)).toBe(4)
    expect(lpNorm(v, 0.5)).toBe(0)
  })
  it('calculates Manhattan and Euclidean distance', () => {
    const a = { x: 1, y: 1 }
    const b = { x: 4, y: 5 }
    expect(manhattanDistance(a, b)).toBe(7)
    expect(euclideanDistance(a, b)).toBe(5)
  })
  it('calculates cosine similarity safely', () => {
    expect(cosineSimilarity({ x: 1, y: 1 }, { x: 10, y: 10 })).toBeCloseTo(1)
    expect(cosineSimilarity({ x: 1, y: 0 }, { x: -2, y: 0 })).toBeCloseTo(-1)
    expect(cosineSimilarity({ x: 1, y: 0 }, { x: 0, y: 3 })).toBeCloseTo(0)
    expect(cosineSimilarity({ x: 0, y: 0 }, { x: 1, y: 1 })).toBeNull()
  })
})
