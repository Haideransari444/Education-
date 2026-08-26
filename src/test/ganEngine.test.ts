import { describe, expect, it } from 'vitest'
import {
  generatedSamples,
  initialGanState,
  isModeCollapsed,
  stepGan,
} from '../integrations/ganlab/engine'

describe('GAN Lab educational engine', () => {
  it('steps deterministically and preserves reset behavior', () => {
    const initial = initialGanState()
    const next = stepGan(initial, 'ring', 0.12)
    expect(next).toEqual(stepGan(initial, 'ring', 0.12))
    expect(next.iteration).toBe(1)
    expect(initialGanState()).toEqual(initial)
    expect(generatedSamples(next)).toEqual(generatedSamples(next))
  })

  it('moves toward the data in balanced mode', () => {
    let state = initialGanState()
    for (let index = 0; index < 20; index += 1)
      state = stepGan(state, 'ring', 0.12)
    expect(
      Math.hypot(state.generatorMean.x, state.generatorMean.y),
    ).toBeLessThan(Math.hypot(-0.55, 0.55))
    expect(state.generatorScale).toBeGreaterThan(0.12)
  })

  it('exposes mode collapse under an unstable learning rate', () => {
    let state = initialGanState()
    for (let index = 0; index < 20; index += 1)
      state = stepGan(state, 'ring', 0.3)
    expect(isModeCollapsed(state)).toBe(true)
  })
})
