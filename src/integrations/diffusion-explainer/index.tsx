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
  cleanGrid,
  forwardStep,
  noiseAmount,
  noiseGrid,
  reverseStep,
  type Grid,
} from './engine'

const totalSteps = 20
export default function DiffusionExplainer() {
  const [timestep, setTimestep] = useState(0)
  const [direction, setDirection] = useState<'forward' | 'reverse'>('forward')
  const [playing, setPlaying] = useState(false)
  const [answer, setAnswer] = useState(0)
  const fullyNoisy = useMemo(
    () => forwardStep(cleanGrid, noiseGrid, totalSteps, totalSteps),
    [],
  )
  const display =
    direction === 'forward'
      ? forwardStep(cleanGrid, noiseGrid, timestep, totalSteps)
      : reverseStep(fullyNoisy, cleanGrid, timestep, totalSteps)
  const source = getIntegration('diffusion-explainer')!.upstream
  const reset = () => {
    setPlaying(false)
    setTimestep(direction === 'forward' ? 0 : totalSteps)
  }
  useEffect(() => {
    if (!playing) return
    const timer = window.setInterval(
      () =>
        setTimestep((current) => {
          const next =
            direction === 'forward'
              ? Math.min(totalSteps, current + 1)
              : Math.max(0, current - 1)
          if (next === 0 || next === totalSteps) setPlaying(false)
          return next
        }),
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 300 : 120,
    )
    return () => window.clearInterval(timer)
  }, [direction, playing])
  return (
    <div className="chapter-content integration-lesson">
      <section>
        <p className="block-label">concept</p>
        <h2>destroy structure, then learn to recover it</h2>
        <p>
          Forward diffusion adds a scheduled amount of Gaussian-like noise. A
          trained model learns the reverse direction by predicting noise or a
          cleaner state at every timestep.
        </p>
      </section>
      <VisualizerFrame
        title="diffusion timeline"
        description="Programmatic scalar grids show signal strength; this is educational denoising, not Stable Diffusion inference."
        onReset={reset}
        controls={
          <div className="integration-controls compact">
            <label>
              direction
              <select
                value={direction}
                onChange={(event) => {
                  const next = event.target.value as 'forward' | 'reverse'
                  setDirection(next)
                  setPlaying(false)
                  setTimestep(next === 'forward' ? 0 : totalSteps)
                }}
              >
                <option value="forward">forward · add noise</option>
                <option value="reverse">reverse · denoise</option>
              </select>
            </label>
            <label>
              timestep
              <input
                type="range"
                min="0"
                max={totalSteps}
                value={timestep}
                onChange={(event) => setTimestep(+event.target.value)}
              />
              <output>{timestep}</output>
            </label>
          </div>
        }
        readout={
          <p>
            t = {timestep} / {totalSteps} · scheduled noise{' '}
            {(noiseAmount(timestep, totalSteps) * 100).toFixed(0)}% ·{' '}
            {direction === 'forward'
              ? 'signal is being corrupted'
              : 'a conceptual denoiser restores structure'}
          </p>
        }
      >
        <div className="diffusion-pipeline">
          <GridView
            grid={direction === 'forward' ? cleanGrid : fullyNoisy}
            label={
              direction === 'forward' ? 'clean signal x₀' : 'random state xT'
            }
          />
          <span aria-hidden="true">→</span>
          <GridView grid={display} label={`state at t=${timestep}`} />
          <span aria-hidden="true">→</span>
          <div className="unet-concept">
            <b>tiny denoiser</b>
            <span>estimate noise</span>
            <span>remove a step</span>
            <span>conditioning can guide</span>
          </div>
        </div>
        <div className="transport-controls">
          <button onClick={() => setTimestep((x) => Math.max(0, x - 1))}>
            previous
          </button>
          <button onClick={() => setPlaying((x) => !x)}>
            {playing ? 'pause' : 'play'}
          </button>
          <button
            onClick={() => setTimestep((x) => Math.min(totalSteps, x + 1))}
          >
            next
          </button>
          <button onClick={reset}>reset</button>
        </div>
      </VisualizerFrame>
      <WorkedExample title="interpret the middle of the schedule">
        <p>
          At t = 10, recognizable structure and random variation coexist. A
          noise predictor receives this state and the timestep, estimates the
          corruption, and constructs a slightly cleaner t = 9 state.
        </p>
      </WorkedExample>
      <Challenge
        prompt="Set the forward process to exactly 50% of its schedule."
        hint="The schedule contains twenty equal displayed steps."
        isCorrect={() =>
          direction === 'forward' && answer === 10 && timestep === 10
        }
        onReset={() => {
          setDirection('forward')
          setTimestep(0)
          setAnswer(0)
        }}
      >
        <input
          aria-label="Diffusion challenge timestep"
          type="number"
          min="0"
          max="20"
          value={answer}
          onChange={(event) => {
            setAnswer(+event.target.value)
            setDirection('forward')
            setTimestep(+event.target.value)
          }}
        />
      </Challenge>
      <AIConnection>
        <p>
          Modern image systems often denoise compressed latent grids and use
          text embeddings as conditioning. The expensive learned U-Net and
          decoder are intentionally absent here.
        </p>
      </AIConnection>
      <ChapterSummary>
        <p>
          Diffusion training learns many small reverse steps. Generation starts
          from noise and repeatedly applies those learned corrections.
        </p>
      </ChapterSummary>
      <UpstreamCredit source={source} />
    </div>
  )
}

function GridView({ grid, label }: { grid: Grid; label: string }) {
  return (
    <figure className="diffusion-grid">
      <figcaption>{label}</figcaption>
      <svg
        viewBox="0 0 100 100"
        role="img"
        aria-label={`${label}, average intensity ${(grid.flat().reduce((a, b) => a + b, 0) / grid.flat().length).toFixed(2)}`}
      >
        {grid.flatMap((row, y) =>
          row.map((value, x) => (
            <rect
              key={`${x}-${y}`}
              x={x * 10}
              y={y * 10}
              width="10.2"
              height="10.2"
              fill="var(--integration-blue)"
              opacity={0.06 + value * 0.94}
            />
          )),
        )}
      </svg>
    </figure>
  )
}
