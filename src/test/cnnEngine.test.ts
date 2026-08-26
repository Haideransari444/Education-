import { describe, expect, it } from 'vitest'
import {
  convolve,
  inputImage,
  kernels,
  maxPool,
  relu,
} from '../integrations/cnn-explainer/engine'

describe('CNN explainer engine', () => {
  it('computes the expected feature-map shape and deterministic cells', () => {
    const output = convolve(inputImage, kernels.edge)
    expect(output).toHaveLength(5)
    expect(output[0]).toHaveLength(5)
    expect(output[0][0]).toBe(-2)
  })

  it('applies ReLU and max pooling', () => {
    expect(relu([[-2, 3]])).toEqual([[0, 3]])
    expect(
      maxPool([
        [1, 4],
        [3, 2],
      ]),
    ).toEqual([[4]])
  })

  it('rejects a kernel larger than the input', () => {
    expect(() => convolve([[1]], kernels.blur)).toThrow(/larger/)
  })
})
