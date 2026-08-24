import type { Vector2 } from '../../../visualization/math/vector2'
import { magnitude } from '../../../visualization/math/vector2'
import { VisualizerFrame } from '../../../visualization/components/VisualizerFrame'
import { VectorControls } from './VectorControls'
import { VectorPlot } from './VectorPlot'
export function IntuitionView({
  value,
  onChange,
  onReset,
}: {
  value: Vector2
  onChange: (v: Vector2) => void
  onReset: () => void
}) {
  const length = magnitude(value)
  return (
    <div className="lesson-view">
      <section className="lesson-copy">
        <p className="lesson-lead">
          A vector represents a quantity with direction and magnitude.
        </p>
        <div className="concept-line">
          <span>(0, 0)</span>
          <span aria-hidden="true">───────►</span>
          <span>
            ({value.x}, {value.y})
          </span>
        </div>
        <p>The same vector is numbers:</p>
        <p className="equation">
          v = [{value.x}, {value.y}]
        </p>
        <p className="concept-link">
          geometry <span>↔</span> numbers
        </p>
      </section>
      <VisualizerFrame
        title="vector and components"
        description="Drag the amber endpoint or use the numeric controls."
        onReset={onReset}
        controls={<VectorControls name="v" value={value} onChange={onChange} />}
        readout={
          <div className="readout-grid">
            <span>
              x component <b>{value.x}</b>
            </span>
            <span>
              y component <b>{value.y}</b>
            </span>
            <span>
              magnitude <b>{length.toFixed(3)}</b>
            </span>
          </div>
        }
      >
        <VectorPlot
          vectors={[{ value, label: 'v' }]}
          draggable={0}
          onChange={onChange}
          projections
        />
      </VisualizerFrame>
      <section className="math-note">
        <h2>length</h2>
        <p className="equation">
          ‖v‖ = √({value.x}² + {value.y}²) ≈ {length.toFixed(3)}
        </p>
        <p>
          The horizontal and vertical projections are its components. The
          arrow’s length is its magnitude.
        </p>
      </section>
    </div>
  )
}
