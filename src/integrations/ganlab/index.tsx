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
  generatedSamples,
  initialGanState,
  isModeCollapsed,
  realSamples,
  stepGan,
  type GanDataset,
} from './engine'

export default function GanLab() {
  const [state, setState] = useState(initialGanState)
  const [dataset, setDataset] = useState<GanDataset>('ring')
  const [learningRate, setLearningRate] = useState(0.12)
  const [shape, setShape] = useState('2 × 8')
  const [playing, setPlaying] = useState(false)
  const real = useMemo(() => realSamples(dataset), [dataset])
  const fake = generatedSamples(state)
  const source = getIntegration('ganlab')!.upstream
  const reset = () => {
    setPlaying(false)
    setState(initialGanState())
  }
  useEffect(() => {
    if (!playing) return
    const timer = window.setInterval(
      () => setState((current) => stepGan(current, dataset, learningRate)),
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 260 : 90,
    )
    return () => window.clearInterval(timer)
  }, [dataset, learningRate, playing])
  return (
    <div className="chapter-content integration-lesson">
      <section>
        <p className="block-label">concept</p>
        <h2>two networks learn by competing</h2>
        <div
          className="gan-flow"
          role="img"
          aria-label="Noise enters a generator, fake and real samples enter a discriminator, then the discriminator predicts real or fake"
        >
          <span>noise z</span>
          <b>→</b>
          <span>generator</span>
          <b>→</b>
          <span>fake samples</span>
          <b>↘</b>
          <span>discriminator</span>
          <b>→</b>
          <span>real / fake</span>
          <span className="real-flow">real samples ↗</span>
        </div>
      </section>
      <VisualizerFrame
        title="adversarial training dynamics"
        description="A compact deterministic simulation exposes the coupled state, not research-quality GAN output."
        onReset={reset}
        controls={
          <div className="integration-controls compact">
            <label>
              dataset
              <select
                value={dataset}
                onChange={(event) => {
                  setDataset(event.target.value as GanDataset)
                  reset()
                }}
              >
                <option value="ring">ring</option>
                <option value="clusters">two clusters</option>
                <option value="line">diagonal line</option>
              </select>
            </label>
            <label>
              learning rate
              <select
                value={learningRate}
                onChange={(event) => {
                  setLearningRate(+event.target.value)
                  reset()
                }}
              >
                <option value="0.06">0.06 · steady</option>
                <option value="0.12">0.12 · balanced</option>
                <option value="0.3">0.30 · unstable</option>
              </select>
            </label>
            <label>
              network shape
              <select
                value={shape}
                onChange={(event) => setShape(event.target.value)}
              >
                <option>1 × 4</option>
                <option>2 × 8</option>
                <option>3 × 8</option>
              </select>
            </label>
          </div>
        }
        readout={
          <p>
            iteration {state.iteration} · G loss{' '}
            {state.generatorLoss.toFixed(3)} · D loss{' '}
            {state.discriminatorLoss.toFixed(3)} ·{' '}
            {isModeCollapsed(state)
              ? 'mode collapse detected'
              : `generator spread ${state.generatorScale.toFixed(2)}`}{' '}
            · shape {shape}
          </p>
        }
      >
        <GanPlot real={real} fake={fake} angle={state.discriminatorAngle} />
        <div className="transport-controls" aria-label="GAN training controls">
          <button onClick={() => setPlaying((value) => !value)}>
            {playing ? 'pause' : 'play'}
          </button>
          <button
            onClick={() =>
              setState((current) => stepGan(current, dataset, learningRate))
            }
          >
            step
          </button>
          <button onClick={reset}>reset</button>
        </div>
      </VisualizerFrame>
      <WorkedExample title="read the moving distributions">
        <p>
          Gold circles are real samples. Blue crosses begin in one small region.
          Generator updates move and spread the crosses; discriminator updates
          rotate the separating surface as it searches for remaining
          differences.
        </p>
      </WorkedExample>
      <Challenge
        prompt="Can you create visible mode collapse?"
        hint="Use the unstable learning rate and run more than twelve iterations."
        isCorrect={() => isModeCollapsed(state)}
        onReset={reset}
      >
        <p>
          Collapse means many noise inputs map to nearly the same output region.
        </p>
      </Challenge>
      <AIConnection>
        <p>
          Adversarial objectives power image synthesis and representation
          learning, but coupled optimization can oscillate, collapse, or let one
          network overpower the other.
        </p>
      </AIConnection>
      <ChapterSummary>
        <p>
          The generator learns to imitate data; the discriminator learns to
          expose its errors. Useful learning requires balance.
        </p>
      </ChapterSummary>
      <UpstreamCredit source={source} />
    </div>
  )
}

function GanPlot({
  real,
  fake,
  angle,
}: {
  real: Array<{ x: number; y: number }>
  fake: Array<{ x: number; y: number }>
  angle: number
}) {
  const project = (value: number) => (value + 1) * 120
  const dx = Math.cos(angle) * 115
  const dy = Math.sin(angle) * 115
  return (
    <svg
      className="gan-plot"
      viewBox="0 0 240 240"
      role="img"
      aria-labelledby="gan-title gan-desc"
    >
      <title id="gan-title">GAN real and generated distributions</title>
      <desc id="gan-desc">
        Gold dots show real samples, blue crosses show generated samples, and a
        line shows the discriminator surface.
      </desc>
      <line
        x1={120 - dx}
        y1={120 - dy}
        x2={120 + dx}
        y2={120 + dy}
        className="decision-line"
      />
      {real.map((point, index) => (
        <circle
          key={`r${index}`}
          cx={project(point.x)}
          cy={project(-point.y)}
          r="3"
          className="real-point"
        />
      ))}
      {fake.map((point, index) => (
        <g
          key={`f${index}`}
          className="fake-point"
          transform={`translate(${project(point.x)} ${project(-point.y)})`}
        >
          <path d="M-3-3L3 3M3-3L-3 3" />
        </g>
      ))}
    </svg>
  )
}
