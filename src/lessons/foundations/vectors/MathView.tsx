import {
  add,
  angleBetween,
  dot,
  magnitude,
  scale,
  type Vector2,
} from '../../../visualization/math/vector2'
export function MathView({ v, a, b }: { v: Vector2; a: Vector2; b: Vector2 }) {
  const angle = angleBetween(a, b)
  return (
    <div className="lesson-view formula-list">
      <section>
        <span>vector</span>
        <p>
          v = [x, y] = [{v.x}, {v.y}]
        </p>
      </section>
      <section>
        <span>magnitude</span>
        <p>‖v‖ = √(x² + y²) = {magnitude(v).toFixed(3)}</p>
      </section>
      <section>
        <span>addition</span>
        <p>
          a + b = [aₓ + bₓ, aᵧ + bᵧ] = [{add(a, b).x}, {add(a, b).y}]
        </p>
      </section>
      <section>
        <span>scalar multiplication</span>
        <p>
          kv = [kx, ky] = [{scale(v, 2).x}, {scale(v, 2).y}] for k = 2
        </p>
      </section>
      <section>
        <span>dot product</span>
        <p>a · b = aₓbₓ + aᵧbᵧ = {dot(a, b)}</p>
      </section>
      <section>
        <span>angle</span>
        <p>cos θ = (a · b) / (‖a‖ ‖b‖)</p>
        <p>
          {angle === null
            ? 'angle undefined for a zero vector'
            : `θ = ${angle.toFixed(2)}°`}
        </p>
      </section>
    </div>
  )
}
