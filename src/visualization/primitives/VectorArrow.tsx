import { useId } from 'react'
import type { Vector2 } from '../math/vector2'
import type { PlaneChildProps } from './CoordinatePlane'

interface VectorArrowProps extends PlaneChildProps {
  start?: Vector2
  end: Vector2
  label?: string
  selected?: boolean
  muted?: boolean
  dashed?: boolean
}
export function VectorArrow({
  start = { x: 0, y: 0 },
  end,
  label,
  selected,
  muted,
  dashed,
  toSvg,
}: VectorArrowProps) {
  const markerId = useId()
  if (!toSvg) return null
  const a = toSvg(start)
  const b = toSvg(end)
  const dx = b.x - a.x
  const dy = b.y - a.y
  const length = Math.hypot(dx, dy)
  const offset = length ? 12 / length : 0
  const labelX = b.x - dx * offset
  const labelY = b.y - dy * offset - 9
  return (
    <g
      className={`vector-arrow${selected ? ' selected' : ''}${muted ? ' muted' : ''}`}
    >
      <defs>
        <marker
          id={markerId}
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" />
        </marker>
      </defs>
      <line
        x1={a.x}
        y1={a.y}
        x2={b.x}
        y2={b.y}
        markerEnd={`url(#${markerId})`}
        strokeDasharray={dashed ? '5 5' : undefined}
      />
      {label && (
        <text x={labelX} y={labelY}>
          {label}
        </text>
      )}
    </g>
  )
}
