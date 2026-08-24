import { useState } from 'react'
import { NumericControl } from '../../../visualization/controls/NumericControl'
import { VisualizerFrame } from '../../../visualization/components/VisualizerFrame'
import {
  add,
  angleBetween,
  dot,
  scale,
  subtract,
  type Vector2,
} from '../../../visualization/math/vector2'
import { VectorControls } from './VectorControls'
import { VectorPlot } from './VectorPlot'
const A = { x: 2, y: 1 }
const B = { x: 1, y: 2 }
export function OperationsView() {
  const [a, setA] = useState<Vector2>(A)
  const [b, setB] = useState<Vector2>(B)
  const [k, setK] = useState(2)
  const sum = add(a, b)
  const difference = subtract(a, b)
  const scaled = scale(a, k)
  const angle = angleBetween(a, b)
  const reset = () => {
    setA(A)
    setB(B)
    setK(2)
  }
  const result = dot(a, b)
  const direction =
    result > 0
      ? 'similar direction'
      : result < 0
        ? 'opposite direction'
        : 'perpendicular'
  return (
    <div className="lesson-view">
      <section className="lesson-copy">
        <p className="lesson-lead">Combine vectors component by component.</p>
        <p className="equation">
          ({a.x}, {a.y}) + ({b.x}, {b.y}) → ({sum.x}, {sum.y})
        </p>
        <p>
          Subtraction points from b toward a. Scaling changes length; a negative
          scalar reverses direction.
        </p>
      </section>
      <VisualizerFrame
        title="addition, subtraction, and scale"
        description="Edit a, b, and scalar k. The result updates immediately."
        onReset={reset}
        controls={
          <>
            <VectorControls name="a" value={a} onChange={setA} />
            <VectorControls name="b" value={b} onChange={setB} />
            <NumericControl
              label="scalar k"
              value={k}
              min={-3}
              max={3}
              step={0.5}
              onChange={setK}
            />
          </>
        }
        readout={
          <div className="readout-grid">
            <span>
              a + b{' '}
              <b>
                ({sum.x}, {sum.y})
              </b>
            </span>
            <span>
              a − b{' '}
              <b>
                ({difference.x}, {difference.y})
              </b>
            </span>
            <span>
              k × a{' '}
              <b>
                ({scaled.x}, {scaled.y})
              </b>
            </span>
          </div>
        }
      >
        <VectorPlot
          vectors={[
            { value: a, label: 'a' },
            { start: a, value: sum, label: 'b', muted: true },
            { value: sum, label: 'a+b' },
            { value: difference, label: 'a−b', dashed: true },
            { value: scaled, label: 'ka', muted: true },
          ]}
        />
      </VisualizerFrame>
      <VisualizerFrame
        title="dot product and angle"
        description="The sign describes how the vectors face each other."
        onReset={reset}
        readout={
          <div className="readout-grid">
            <span>
              a · b <b>{result.toFixed(2)}</b>
            </span>
            <span>
              relationship <b>{direction}</b>
            </span>
            <span>
              angle{' '}
              <b>
                {angle === null
                  ? 'undefined for a zero vector'
                  : `${angle.toFixed(1)}°`}
              </b>
            </span>
          </div>
        }
      >
        <VectorPlot
          vectors={[
            { value: a, label: 'a' },
            { value: b, label: 'b', muted: true },
          ]}
        />
      </VisualizerFrame>
    </div>
  )
}
