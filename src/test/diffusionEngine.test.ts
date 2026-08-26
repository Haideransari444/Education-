import { describe, expect, it } from 'vitest'
import {
  cleanGrid,
  forwardStep,
  noiseAmount,
  noiseGrid,
  reverseStep,
} from '../integrations/diffusion-explainer/engine'

describe('diffusion educational engine', () => {
  it('defines a bounded noise schedule', () => {
    expect(noiseAmount(0, 20)).toBe(0)
    expect(noiseAmount(10, 20)).toBe(0.5)
    expect(noiseAmount(20, 20)).toBe(1)
  })

  it('preserves clean state at timestep zero and changes it later', () => {
    expect(forwardStep(cleanGrid, noiseGrid, 0, 20)).toEqual(cleanGrid)
    expect(forwardStep(cleanGrid, noiseGrid, 10, 20)).not.toEqual(cleanGrid)
  })

  it('navigates the deterministic reverse state toward clean data', () => {
    const noisy = forwardStep(cleanGrid, noiseGrid, 20, 20)
    expect(reverseStep(noisy, cleanGrid, 20, 20)).toEqual(noisy)
    expect(reverseStep(noisy, cleanGrid, 0, 20)).toEqual(cleanGrid)
  })
})
