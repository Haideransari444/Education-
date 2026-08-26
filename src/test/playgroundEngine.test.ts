import { describe, expect, it } from 'vitest'
import {
  createDataset,
  createModel,
  trainEpoch,
  validateConfig,
  type PlaygroundConfig,
} from '../integrations/tensorflow-playground/engine'

const config: PlaygroundConfig = {
  dataset: 'xor',
  features: ['x1', 'x2', 'x1x2'],
  layers: 1,
  neurons: 4,
  activation: 'tanh',
  learningRate: 0.2,
  regularization: 0.001,
}

describe('neural network playground engine', () => {
  it('creates deterministic data and reset parameters', () => {
    expect(createDataset('xor')).toEqual(createDataset('xor'))
    expect(createModel(config)).toEqual(createModel(config))
  })

  it('trains and lowers loss', () => {
    const points = createDataset('xor')
    let model = createModel(config)
    for (let epoch = 0; epoch < 80; epoch += 1)
      model = trainEpoch(model, config, points)
    expect(model.epoch).toBe(80)
    expect(model.loss).toBeLessThan(Math.log(2))
  })

  it('validates unsafe or empty configurations', () => {
    expect(validateConfig({ ...config, features: [] })).toMatch(/feature/i)
    expect(validateConfig({ ...config, neurons: 8 })).toMatch(/neurons/i)
    expect(validateConfig(config)).toBeNull()
  })
})
