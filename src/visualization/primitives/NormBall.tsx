export function NormBall({ norm }: { norm: 'l1' | 'l2' | 'linfinity' }) {
  const shape =
    norm === 'l1' ? (
      <polygon points="150,25 275,150 150,275 25,150" />
    ) : norm === 'l2' ? (
      <circle cx="150" cy="150" r="125" />
    ) : (
      <rect x="25" y="25" width="250" height="250" />
    )
  return (
    <svg
      className="norm-ball"
      viewBox="0 0 300 300"
      role="img"
      aria-label={`${norm} unit ball`}
    >
      <line x1="0" y1="150" x2="300" y2="150" />
      <line x1="150" y1="0" x2="150" y2="300" />
      <g>{shape}</g>
      <text x="160" y="18">
        1
      </text>
      <text x="280" y="142">
        1
      </text>
    </svg>
  )
}
