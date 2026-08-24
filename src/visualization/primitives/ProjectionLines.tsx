import type { Vector2 } from '../math/vector2'
import type { PlaneChildProps } from './CoordinatePlane'
export function ProjectionLines({
  end,
  toSvg,
}: { end: Vector2 } & PlaneChildProps) {
  if (!toSvg) return null
  const p = toSvg(end)
  const x = toSvg({ x: end.x, y: 0 })
  const y = toSvg({ x: 0, y: end.y })
  return (
    <g className="projection-lines">
      <line x1={p.x} y1={p.y} x2={x.x} y2={x.y} />
      <line x1={p.x} y1={p.y} x2={y.x} y2={y.y} />
    </g>
  )
}
