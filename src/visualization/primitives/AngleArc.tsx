import type { Vector2 } from '../math/vector2'
import type { PlaneChildProps } from './CoordinatePlane'
export function AngleArc({
  a,
  b,
  toSvg,
}: { a: Vector2; b: Vector2 } & PlaneChildProps) {
  if (!toSvg) return null
  const o = toSvg({ x: 0, y: 0 })
  const radius = 42
  const angleA = Math.atan2(-a.y, a.x)
  let angleB = Math.atan2(-b.y, b.x)
  while (angleB < angleA) angleB += Math.PI * 2
  const delta = Math.min(angleB - angleA, Math.PI * 2 - (angleB - angleA))
  const endAngle = angleA + (angleB - angleA <= Math.PI ? delta : -delta)
  const start = {
    x: o.x + radius * Math.cos(angleA),
    y: o.y + radius * Math.sin(angleA),
  }
  const end = {
    x: o.x + radius * Math.cos(endAngle),
    y: o.y + radius * Math.sin(endAngle),
  }
  return (
    <path
      className="angle-arc"
      d={`M ${start.x} ${start.y} A ${radius} ${radius} 0 ${delta > Math.PI ? 1 : 0} ${endAngle > angleA ? 1 : 0} ${end.x} ${end.y}`}
    />
  )
}
