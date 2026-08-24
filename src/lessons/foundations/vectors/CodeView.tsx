import { CodeBlock } from '../../../components/lesson/CodeBlock'
const python = `import numpy as np

v = np.array([3, 2])
a = np.array([2, 1])
b = np.array([1, 2])

magnitude = np.linalg.norm(v)
addition = a + b
subtraction = a - b
scaled = 2 * a
dot_product = np.dot(a, b)`
export function CodeView() {
  return (
    <div className="lesson-view">
      <section className="lesson-copy">
        <p className="lesson-lead">
          The same operations map directly to NumPy arrays.
        </p>
        <p>
          This code is display-only; no Python runtime is loaded in the browser.
        </p>
      </section>
      <CodeBlock language="python · numpy" code={python} />
    </div>
  )
}
