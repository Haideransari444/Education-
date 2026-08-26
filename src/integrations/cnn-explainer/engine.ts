/* Selective TypeScript port of convolution concepts from CNN Explainer (MIT),
 * commit d0971f9447ed9806022a3d47587b62394682bc51. */
export type Matrix = ReadonlyArray<ReadonlyArray<number>>

export const kernels = {
  edge: [
    [-1, -1, -1],
    [-1, 8, -1],
    [-1, -1, -1],
  ],
  sharpen: [
    [0, -1, 0],
    [-1, 5, -1],
    [0, -1, 0],
  ],
  blur: [
    [1 / 9, 1 / 9, 1 / 9],
    [1 / 9, 1 / 9, 1 / 9],
    [1 / 9, 1 / 9, 1 / 9],
  ],
} as const

export type KernelName = keyof typeof kernels

export const inputImage: Matrix = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 1, 0, 1, 0, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
]

export function convolve(input: Matrix, kernel: Matrix, stride = 1): Matrix {
  if (!input.length || !kernel.length || stride < 1)
    throw new Error('Convolution needs non-empty matrices and positive stride.')
  const outputRows = Math.floor((input.length - kernel.length) / stride) + 1
  const outputColumns =
    Math.floor((input[0].length - kernel[0].length) / stride) + 1
  if (outputRows < 1 || outputColumns < 1)
    throw new Error('Kernel cannot be larger than the input.')
  return Array.from({ length: outputRows }, (_, row) =>
    Array.from({ length: outputColumns }, (_, column) =>
      kernel.reduce(
        (sum, kernelRow, kernelY) =>
          sum +
          kernelRow.reduce(
            (rowSum, weight, kernelX) =>
              rowSum +
              weight * input[row * stride + kernelY][column * stride + kernelX],
            0,
          ),
        0,
      ),
    ),
  )
}

export const relu = (matrix: Matrix): Matrix =>
  matrix.map((row) => row.map((value) => Math.max(0, value)))

export function maxPool(matrix: Matrix, size = 2): Matrix {
  const rows = Math.floor(matrix.length / size)
  const columns = Math.floor(matrix[0].length / size)
  return Array.from({ length: rows }, (_, row) =>
    Array.from({ length: columns }, (_, column) => {
      let maximum = -Infinity
      for (let y = 0; y < size; y += 1)
        for (let x = 0; x < size; x += 1)
          maximum = Math.max(maximum, matrix[row * size + y][column * size + x])
      return maximum
    }),
  )
}
