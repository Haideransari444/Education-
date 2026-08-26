/* Selective timestep-controller port inspired by Diffusion Explainer (MIT),
 * commit 0820016ce908a8e66619b7a1c9369af1498160d6.
 * All scalar grids are original and generated locally. */
export type Grid = number[][]

export const cleanGrid: Grid = Array.from({ length: 10 }, (_, row) =>
  Array.from({ length: 10 }, (_, column) => {
    const circle = Math.hypot(column - 4.5, row - 4.5) < 3.3
    const diagonal = Math.abs(column - row) < 1.2
    return circle ? (diagonal ? 1 : 0.72) : 0.06
  }),
)

const seededNoise = (seed: number, size: number): Grid => {
  let value = seed >>> 0
  const random = () => {
    value = (value * 1664525 + 1013904223) >>> 0
    return value / 4294967296
  }
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => random()),
  )
}

export const noiseGrid = seededNoise(2026, cleanGrid.length)

export function noiseAmount(timestep: number, totalSteps: number) {
  if (totalSteps < 1) throw new Error('Diffusion needs at least one step.')
  return Math.min(1, Math.max(0, timestep / totalSteps))
}

export function forwardStep(
  clean: Grid,
  noise: Grid,
  timestep: number,
  totalSteps: number,
): Grid {
  const amount = noiseAmount(timestep, totalSteps)
  const signal = Math.sqrt(1 - amount)
  const noiseScale = Math.sqrt(amount)
  return clean.map((row, y) =>
    row.map((value, x) =>
      Math.min(1, Math.max(0, value * signal + noise[y][x] * noiseScale)),
    ),
  )
}

export function reverseStep(
  noisy: Grid,
  predictedClean: Grid,
  timestep: number,
  totalSteps: number,
): Grid {
  const remainingNoise = noiseAmount(timestep, totalSteps)
  return predictedClean.map((row, y) =>
    row.map((value, x) =>
      Math.min(
        1,
        Math.max(
          0,
          value * (1 - remainingNoise) + noisy[y][x] * remainingNoise,
        ),
      ),
    ),
  )
}
