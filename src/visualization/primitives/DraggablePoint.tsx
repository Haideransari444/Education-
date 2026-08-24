import type { PointerEvent } from 'react'
import { clampVector, type Vector2 } from '../math/vector2'
import type { PlaneChildProps } from './CoordinatePlane'

interface DraggablePointProps extends PlaneChildProps {
  value: Vector2
  onChange: (value: Vector2) => void
  label: string
  step?: number
}
export function DraggablePoint({
  value,
  onChange,
  label,
  step = 0.1,
  toSvg,
  fromSvg,
  bounds,
}: DraggablePointProps) {
  if (!toSvg || !fromSvg || !bounds) return null
  const point = toSvg(value)
  const update = (event: PointerEvent<SVGCircleElement>) => {
    if (
      !(event.currentTarget as SVGCircleElement).hasPointerCapture(
        event.pointerId,
      )
    )
      return
    const svg = event.currentTarget.ownerSVGElement
    if (!svg) return
    const rect = svg.getBoundingClientRect()
    const next = fromSvg({
      x: ((event.clientX - rect.left) / rect.width) * 600,
      y: ((event.clientY - rect.top) / rect.height) * 420,
    })
    onChange(
      clampVector(
        vectorRound(next, step),
        bounds.xMin,
        bounds.xMax,
        bounds.yMin,
        bounds.yMax,
      ),
    )
  }
  return (
    <circle
      className="draggable-point"
      cx={point.x}
      cy={point.y}
      r="8"
      tabIndex={0}
      role="slider"
      aria-label={label}
      aria-valuetext={`${value.x}, ${value.y}`}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId)
      }}
      onPointerMove={update}
      onPointerUp={(e) => e.currentTarget.releasePointerCapture(e.pointerId)}
      onKeyDown={(e) => {
        let next: Vector2
        if (e.key === 'ArrowLeft') next = { ...value, x: value.x - step }
        else if (e.key === 'ArrowRight') next = { ...value, x: value.x + step }
        else if (e.key === 'ArrowDown') next = { ...value, y: value.y - step }
        else if (e.key === 'ArrowUp') next = { ...value, y: value.y + step }
        else return
        e.preventDefault()
        onChange(
          clampVector(
            vectorRound(next, step),
            bounds.xMin,
            bounds.xMax,
            bounds.yMin,
            bounds.yMax,
          ),
        )
      }}
    />
  )
}
const vectorRound = (v: Vector2, step: number): Vector2 => ({
  x: Math.round(v.x / step) * step,
  y: Math.round(v.y / step) * step,
})
