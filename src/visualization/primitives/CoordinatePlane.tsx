import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react'

export interface PlaneBounds {
  xMin: number
  xMax: number
  yMin: number
  yMax: number
}
interface CoordinatePlaneProps extends PlaneBounds {
  showGrid?: boolean
  showAxes?: boolean
  title?: string
  description?: string
  children?: ReactNode
}
export interface PlaneChildProps {
  toSvg?: (point: { x: number; y: number }) => { x: number; y: number }
  fromSvg?: (point: { x: number; y: number }) => { x: number; y: number }
  bounds?: PlaneBounds
}

export function CoordinatePlane({
  xMin,
  xMax,
  yMin,
  yMax,
  showGrid = true,
  showAxes = true,
  title = 'Coordinate plane',
  description = 'Interactive two-dimensional vector graph',
  children,
}: CoordinatePlaneProps) {
  const width = 600
  const height = 420
  const toSvg = (point: { x: number; y: number }) => ({
    x: ((point.x - xMin) / (xMax - xMin)) * width,
    y: height - ((point.y - yMin) / (yMax - yMin)) * height,
  })
  const fromSvg = (point: { x: number; y: number }) => ({
    x: xMin + (point.x / width) * (xMax - xMin),
    y: yMin + ((height - point.y) / height) * (yMax - yMin),
  })
  const xTicks = Array.from(
    { length: xMax - xMin + 1 },
    (_, index) => xMin + index,
  )
  const yTicks = Array.from(
    { length: yMax - yMin + 1 },
    (_, index) => yMin + index,
  )
  const origin = toSvg({ x: 0, y: 0 })
  const bounds = { xMin, xMax, yMin, yMax }
  return (
    <svg
      className="coordinate-plane"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-labelledby="plane-title plane-description"
      preserveAspectRatio="xMidYMid meet"
    >
      <title id="plane-title">{title}</title>
      <desc id="plane-description">{description}</desc>
      {showGrid && (
        <g className="grid-lines">
          {xTicks.map((x) => {
            const p = toSvg({ x, y: 0 })
            return <line key={`x-${x}`} x1={p.x} y1="0" x2={p.x} y2={height} />
          })}
          {yTicks.map((y) => {
            const p = toSvg({ x: 0, y })
            return <line key={`y-${y}`} x1="0" y1={p.y} x2={width} y2={p.y} />
          })}
        </g>
      )}
      {showAxes && (
        <g className="axes">
          <line x1="0" y1={origin.y} x2={width} y2={origin.y} />
          <line x1={origin.x} y1="0" x2={origin.x} y2={height} />
          {xTicks
            .filter((x) => x !== 0 && x % 2 === 0)
            .map((x) => {
              const p = toSvg({ x, y: 0 })
              return (
                <text key={`xt-${x}`} x={p.x} y={origin.y + 18}>
                  {x}
                </text>
              )
            })}
          {yTicks
            .filter((y) => y !== 0 && y % 2 === 0)
            .map((y) => {
              const p = toSvg({ x: 0, y })
              return (
                <text key={`yt-${y}`} x={origin.x - 9} y={p.y - 5}>
                  {y}
                </text>
              )
            })}
          <text x={width - 14} y={origin.y - 9}>
            x
          </text>
          <text x={origin.x + 10} y="14">
            y
          </text>
          <circle cx={origin.x} cy={origin.y} r="3" />
        </g>
      )}
      {Children.map(children, (child) =>
        isValidElement(child)
          ? cloneElement(child as ReactElement<PlaneChildProps>, {
              toSvg,
              fromSvg,
              bounds,
            })
          : child,
      )}
    </svg>
  )
}
