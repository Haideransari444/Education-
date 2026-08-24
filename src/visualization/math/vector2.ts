export interface Vector2 {
  x: number
  y: number
}

const safe = (value: number) => (Number.isFinite(value) ? value : 0)

export const vector = (x: number, y: number): Vector2 => ({
  x: safe(x),
  y: safe(y),
})
export const add = (a: Vector2, b: Vector2): Vector2 =>
  vector(a.x + b.x, a.y + b.y)
export const subtract = (a: Vector2, b: Vector2): Vector2 =>
  vector(a.x - b.x, a.y - b.y)
export const scale = (v: Vector2, scalar: number): Vector2 =>
  vector(v.x * safe(scalar), v.y * safe(scalar))
export const magnitude = (v: Vector2) => Math.hypot(safe(v.x), safe(v.y))
export const dot = (a: Vector2, b: Vector2) =>
  safe(a.x) * safe(b.x) + safe(a.y) * safe(b.y)
export const distance = (a: Vector2, b: Vector2) => magnitude(subtract(a, b))
export const normalize = (v: Vector2): Vector2 => {
  const length = magnitude(v)
  return length === 0 ? vector(0, 0) : scale(v, 1 / length)
}
export const angleBetween = (a: Vector2, b: Vector2): number | null => {
  const denominator = magnitude(a) * magnitude(b)
  if (denominator === 0) return null
  const cosine = Math.max(-1, Math.min(1, dot(a, b) / denominator))
  const angle = (Math.acos(cosine) * 180) / Math.PI
  return Number.isFinite(angle) ? angle : null
}
export const clampVector = (
  v: Vector2,
  xMin: number,
  xMax: number,
  yMin: number,
  yMax: number,
) =>
  vector(
    Math.max(xMin, Math.min(xMax, v.x)),
    Math.max(yMin, Math.min(yMax, v.y)),
  )
