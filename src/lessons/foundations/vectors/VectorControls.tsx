import { NumericControl } from '../../../visualization/controls/NumericControl'
import type { Vector2 } from '../../../visualization/math/vector2'
export function VectorControls({
  name,
  value,
  onChange,
  min = -5,
  max = 5,
}: {
  name: string
  value: Vector2
  onChange: (v: Vector2) => void
  min?: number
  max?: number
}) {
  return (
    <fieldset className="vector-controls">
      <legend>{name}</legend>
      <NumericControl
        label={`${name} x`}
        value={value.x}
        min={min}
        max={max}
        onChange={(x) => onChange({ ...value, x })}
      />
      <NumericControl
        label={`${name} y`}
        value={value.y}
        min={min}
        max={max}
        onChange={(y) => onChange({ ...value, y })}
      />
    </fieldset>
  )
}
