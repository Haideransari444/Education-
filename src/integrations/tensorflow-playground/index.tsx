import { useEffect, useMemo, useState } from 'react'
import {
  AIConnection,
  Challenge,
  ChapterSummary,
  WorkedExample,
} from '../../components/education/EducationalBlocks'
import { VisualizerFrame } from '../../visualization/components/VisualizerFrame'
import { getIntegration } from '../registry'
import { UpstreamCredit } from '../UpstreamCredit'
import {
  createDataset,
  createModel,
  predict,
  trainEpoch,
  validateConfig,
  type ActivationName,
  type DatasetKind,
  type FeatureName,
  type PlaygroundModel,
  type PlaygroundConfig,
  type Point,
} from './engine'

const defaults: PlaygroundConfig = {
  dataset: 'xor',
  features: ['x1', 'x2'],
  layers: 1,
  neurons: 4,
  activation: 'tanh',
  learningRate: 0.2,
  regularization: 0.001,
}

export default function NeuralNetworkPlayground() {
  const [config, setConfig] = useState(defaults)
  const [model, setModel] = useState(() => createModel(defaults))
  const [playing, setPlaying] = useState(false)
  const points = useMemo(() => createDataset(config.dataset), [config.dataset])
  const source = getIntegration('tensorflow-playground')!.upstream
  const reset = (next = config) => {
    setPlaying(false)
    setModel(createModel(next))
  }
  const update = <K extends keyof PlaygroundConfig>(
    key: K,
    value: PlaygroundConfig[K],
  ) => {
    const next = { ...config, [key]: value }
    setConfig(next)
    reset(next)
  }
  useEffect(() => {
    if (!playing) return
    const timer = window.setInterval(
      () => setModel((current) => trainEpoch(current, config, points)),
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 240 : 70,
    )
    return () => window.clearInterval(timer)
  }, [config, playing, points])

  return (
    <div className="chapter-content integration-lesson">
      <section>
        <p className="block-label">concept</p>
        <h2>what are we trying to learn?</h2>
        <p>
          A neural network bends a decision boundary until two kinds of points
          fall on different sides. Every epoch performs forward propagation,
          measures loss, then uses backpropagation to update weights and biases.
        </p>
      </section>
      <VisualizerFrame
        title="local neural network laboratory"
        description="Everything trains in this browser from deterministic synthetic data."
        onReset={() => reset()}
        controls={
          <div className="integration-controls">
            <label>
              dataset
              <select
                value={config.dataset}
                onChange={(event) =>
                  update('dataset', event.target.value as DatasetKind)
                }
              >
                <option value="xor">xor quadrants</option>
                <option value="circles">inside / outside</option>
                <option value="clusters">two clusters</option>
              </select>
            </label>
            <label>
              hidden layers
              <input
                aria-label="Hidden layers"
                type="range"
                min="1"
                max="3"
                value={config.layers}
                onChange={(event) => update('layers', +event.target.value)}
              />
              <output>{config.layers}</output>
            </label>
            <label>
              neurons / layer
              <input
                aria-label="Neurons per layer"
                type="range"
                min="1"
                max="6"
                value={config.neurons}
                onChange={(event) => update('neurons', +event.target.value)}
              />
              <output>{config.neurons}</output>
            </label>
            <label>
              activation
              <select
                value={config.activation}
                onChange={(event) =>
                  update('activation', event.target.value as ActivationName)
                }
              >
                <option value="tanh">tanh</option>
                <option value="relu">ReLU</option>
                <option value="sigmoid">sigmoid</option>
              </select>
            </label>
            <label>
              learning rate
              <select
                value={config.learningRate}
                onChange={(event) =>
                  update('learningRate', +event.target.value)
                }
              >
                <option value="0.05">0.05</option>
                <option value="0.2">0.20</option>
                <option value="0.5">0.50</option>
              </select>
            </label>
            <label>
              regularization
              <select
                value={config.regularization}
                onChange={(event) =>
                  update('regularization', +event.target.value)
                }
              >
                <option value="0">none</option>
                <option value="0.001">L2 · 0.001</option>
                <option value="0.01">L2 · 0.01</option>
              </select>
            </label>
          </div>
        }
        readout={
          <p>
            epoch {model.epoch} · loss {model.loss.toFixed(4)} ·{' '}
            {validateConfig(config) ?? `${config.layers} hidden layer(s)`}
          </p>
        }
      >
        <div className="playground-layout">
          <DecisionBoundary model={model} config={config} points={points} />
          <NetworkDiagram config={config} />
        </div>
        <div className="transport-controls" aria-label="Training controls">
          <button onClick={() => setPlaying((value) => !value)}>
            {playing ? 'pause' : 'play'}
          </button>
          <button
            onClick={() =>
              setModel((current) => trainEpoch(current, config, points))
            }
          >
            step
          </button>
          <button onClick={() => reset()}>reset</button>
        </div>
      </VisualizerFrame>
      <fieldset className="feature-picker">
        <legend>input features</legend>
        {(['x1', 'x2', 'x1x2', 'x1sq', 'x2sq'] as FeatureName[]).map(
          (feature) => (
            <label key={feature}>
              <input
                type="checkbox"
                checked={config.features.includes(feature)}
                onChange={() => {
                  const features = config.features.includes(feature)
                    ? config.features.filter((item) => item !== feature)
                    : [...config.features, feature]
                  update('features', features)
                }}
              />
              {feature}
            </label>
          ),
        )}
      </fieldset>
      <WorkedExample title="read one training run">
        <p>
          On XOR, a straight boundary cannot separate the classes. Hidden
          neurons create nonlinear intermediate features; falling loss means
          their combined boundary is matching more labels.
        </p>
      </WorkedExample>
      <Challenge
        prompt="Can you push loss below 0.35 on XOR?"
        hint="Try two input features, at least one hidden layer, and four neurons."
        isCorrect={() => model.loss < 0.35}
        onReset={() => reset()}
      >
        <p>Train, change the architecture, then check your current loss.</p>
      </Challenge>
      <AIConnection>
        <p>
          The same chain—features → activations → loss → gradients—connects
          directly to perceptrons, forward propagation, gradient descent,
          backpropagation, regularization, and classification.
        </p>
      </AIConnection>
      <ChapterSummary>
        <p>
          Architecture controls what a network can represent; optimization
          controls whether it learns that representation.
        </p>
      </ChapterSummary>
      <UpstreamCredit source={source} />
    </div>
  )
}

function DecisionBoundary({
  model,
  config,
  points,
}: {
  model: PlaygroundModel
  config: PlaygroundConfig
  points: Point[]
}) {
  const cells = 18
  return (
    <svg
      className="decision-boundary"
      viewBox="0 0 216 216"
      role="img"
      aria-labelledby="nn-boundary-title nn-boundary-desc"
    >
      <title id="nn-boundary-title">Neural network decision boundary</title>
      <desc id="nn-boundary-desc">
        Blue and gold points overlay the network's current probability field.
      </desc>
      {Array.from({ length: cells * cells }, (_, index) => {
        const column = index % cells
        const row = Math.floor(index / cells)
        const x = (column / (cells - 1)) * 2 - 1
        const y = 1 - (row / (cells - 1)) * 2
        const probability = predict(model, config, { x, y })
        return (
          <rect
            key={index}
            x={column * 12}
            y={row * 12}
            width="12.5"
            height="12.5"
            fill={
              probability > 0.5
                ? 'var(--integration-blue)'
                : 'var(--integration-gold)'
            }
            opacity={0.16 + Math.abs(probability - 0.5) * 0.9}
          />
        )
      })}
      {points.map((point, index) => (
        <circle
          key={index}
          cx={(point.x + 1) * 108}
          cy={(1 - point.y) * 108}
          r="3.4"
          fill={
            point.label ? 'var(--integration-blue)' : 'var(--integration-gold)'
          }
          stroke="var(--bg)"
          strokeWidth="1.3"
        />
      ))}
    </svg>
  )
}

function NetworkDiagram({ config }: { config: PlaygroundConfig }) {
  const columns = [
    config.features.length,
    ...Array(config.layers).fill(config.neurons),
    1,
  ]
  return (
    <div
      className="network-diagram"
      role="img"
      aria-label={`Network with ${columns.join(', ')} nodes by layer`}
    >
      {columns.map((count, column) => (
        <div key={column}>
          <span>
            {column === 0
              ? 'input'
              : column === columns.length - 1
                ? 'output'
                : `hidden ${column}`}
          </span>
          {Array.from({ length: count }, (_, node) => (
            <i key={node} />
          ))}
        </div>
      ))}
    </div>
  )
}
