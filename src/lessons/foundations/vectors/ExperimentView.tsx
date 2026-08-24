import { useState } from 'react'
import { VisualizerFrame } from '../../../visualization/components/VisualizerFrame'
import {
  add,
  angleBetween,
  distance,
  dot,
  magnitude,
  subtract,
  type Vector2,
} from '../../../visualization/math/vector2'
import { VectorControls } from './VectorControls'
import { VectorPlot } from './VectorPlot'
const DEFAULT_A = { x: 2, y: 1 }
const DEFAULT_B = { x: -1, y: 2 }
export function ExperimentView() {
  const [a, setA] = useState<Vector2>(DEFAULT_A)
  const [b, setB] = useState<Vector2>(DEFAULT_B)
  const angle = angleBetween(a, b)
  return (
    <div className="lesson-view">
      <section className="lesson-copy">
        <p className="lesson-lead">
          Change two vectors. Inspect every relationship at once.
        </p>
      </section>
      <VisualizerFrame
        title="vector laboratory"
        description="Everything stays in your browser."
        onReset={() => {
          setA(DEFAULT_A)
          setB(DEFAULT_B)
        }}
        controls={
          <>
            <VectorControls name="vector A" value={a} onChange={setA} />
            <VectorControls name="vector B" value={b} onChange={setB} />
          </>
        }
        readout={
          <div className="experiment-results">
            <span>
              A + B{' '}
              <b>
                ({add(a, b).x}, {add(a, b).y})
              </b>
            </span>
            <span>
              A − B{' '}
              <b>
                ({subtract(a, b).x}, {subtract(a, b).y})
              </b>
            </span>
            <span>
              A · B <b>{dot(a, b).toFixed(2)}</b>
            </span>
            <span>
              distance <b>{distance(a, b).toFixed(3)}</b>
            </span>
            <span>
              magnitudes{' '}
              <b>
                {magnitude(a).toFixed(2)} / {magnitude(b).toFixed(2)}
              </b>
            </span>
            <span>
              angle{' '}
              <b>{angle === null ? 'undefined' : `${angle.toFixed(1)}°`}</b>
            </span>
          </div>
        }
      >
        <VectorPlot
          vectors={[
            { value: a, label: 'A' },
            { value: b, label: 'B', muted: true },
          ]}
        />
      </VisualizerFrame>
    </div>
  )
}
