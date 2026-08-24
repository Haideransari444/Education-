import { useState } from 'react'
import { CodeBlock } from '../../../components/lesson/CodeBlock'
import {
  AIConnection,
  Challenge,
  ChapterSummary,
  CommonMistakes,
  FormulaBlock,
  WorkedExample,
} from '../../../components/education/EducationalBlocks'
import { NumericControl } from '../../../visualization/controls/NumericControl'
import { VisualizerFrame } from '../../../visualization/components/VisualizerFrame'
import {
  add,
  angleBetween,
  cosineSimilarity,
  distance,
  dot,
  infinityNorm,
  l2Norm,
  manhattanDistance,
  normalize,
  scale,
  subtract,
  type Vector2,
} from '../../../visualization/math/vector2'
import { NormBall } from '../../../visualization/primitives/NormBall'
import { VectorControls } from './VectorControls'
import { VectorPlot } from './VectorPlot'

export function ChapterContent({ chapterId }: { chapterId: string }) {
  if (chapterId === 'scalars-and-vectors') return <ScalarsChapter />
  if (chapterId === 'notation-and-representation') return <NotationChapter />
  if (chapterId === 'components-and-coordinates') return <ComponentsChapter />
  if (chapterId === 'magnitude-and-direction') return <MagnitudeChapter />
  if (chapterId === 'addition-and-subtraction') return <AdditionChapter />
  if (chapterId === 'scalar-multiplication') return <ScalarChapter />
  if (chapterId === 'norms-and-distance') return <NormsChapter />
  if (chapterId === 'dot-product') return <DotChapter />
  if (chapterId === 'angles-between-vectors') return <AnglesChapter />
  return <CosineChapter />
}

function Intro({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="chapter-section">
      <p className="section-kicker">{title}</p>
      {children}
    </section>
  )
}
const numpyTorch = (numpy: string, torch: string) => (
  <div className="code-pair">
    <CodeBlock language="python · numpy" code={numpy} />
    <CodeBlock language="python · pytorch" code={torch} />
  </div>
)

function ScalarsChapter() {
  const [kind, setKind] = useState<'scalar' | 'vector'>('scalar')
  return (
    <div className="chapter-content">
      <Intro title="start here">
        <h2>A scalar is one numerical value.</h2>
        <p>
          Learning rate <code>0.001</code>, loss <code>0.42</code>, temperature{' '}
          <code>0.8</code>, and probability <code>0.91</code> are scalars.
        </p>
        <h2>A vector is an ordered collection of values.</h2>
        <p>
          <code>[3, 2]</code>, <code>[height, weight, age]</code>, an RGB pixel{' '}
          <code>[255, 120, 40]</code>, and an embedding{' '}
          <code>[0.12, −0.84, 0.45, …]</code> are vectors.
        </p>
      </Intro>
      <div
        className="inline-switch"
        role="group"
        aria-label="Compare scalar and vector"
      >
        <button
          aria-pressed={kind === 'scalar'}
          onClick={() => setKind('scalar')}
        >
          scalar
        </button>
        <button
          aria-pressed={kind === 'vector'}
          onClick={() => setKind('vector')}
        >
          vector
        </button>
      </div>
      <FormulaBlock label={kind}>
        {kind === 'scalar'
          ? '0.42 — one value'
          : '[0.12, −0.84, 0.45, …] — ordered values'}
      </FormulaBlock>
      <Intro title="one hierarchy">
        <dl className="type-ladder">
          <div>
            <dt>scalar</dt>
            <dd>one value</dd>
          </div>
          <div>
            <dt>vector</dt>
            <dd>one axis of values</dd>
          </div>
          <div>
            <dt>matrix</dt>
            <dd>rows and columns</dd>
          </div>
          <div>
            <dt>tensor</dt>
            <dd>a general multi-axis array</dd>
          </div>
        </dl>
      </Intro>
      <CommonMistakes>
        <p>
          A vector is not always an arrow. Arrows are a powerful interpretation
          in 2D and 3D; AI vectors are often hundreds or thousands of
          coordinates.
        </p>
      </CommonMistakes>
      <AIConnection>
        <p>
          Features, model parameters, activations, gradients, and embeddings are
          represented as vectors.
        </p>
      </AIConnection>
      <ChapterSummary>
        <p>
          Scalars carry one value. Vectors preserve an ordered collection whose
          position and dimension matter.
        </p>
      </ChapterSummary>
    </div>
  )
}

function NotationChapter() {
  return (
    <div className="chapter-content">
      <Intro title="reading vectors">
        <p>
          The symbols <code>v</code>, <code>v⃗</code>, and bold{' '}
          <strong>v</strong> can all name a vector. Components make its values
          explicit.
        </p>
      </Intro>
      <FormulaBlock label="component notation">
        v = [v₁, v₂, …, vₙ]
      </FormulaBlock>
      <Intro title="shape and space">
        <p>
          <code>v ∈ ℝ²</code> says v contains two real-number components.{' '}
          <code>ℝⁿ</code> means every ordered list of n real numbers.
        </p>
        <p>
          A row vector has shape <code>(1, n)</code>; a column vector has shape{' '}
          <code>(n, 1)</code>. A one-dimensional code array often has shape{' '}
          <code>(n,)</code>.
        </p>
        <p>
          The zero vector has only zero components. A unit vector has magnitude
          one. Two vectors are equal only when they have the same dimension and
          matching components in the same order.
        </p>
      </Intro>
      <WorkedExample title="indexing v = [3, 2]">
        <p>
          <code>v₁ = 3</code> and <code>v₂ = 2</code> in mathematical one-based
          indexing. Python uses zero-based indexing, so <code>v[0] == 3</code>.
        </p>
      </WorkedExample>
      {numpyTorch(
        `import numpy as np\n\nv = np.array([3.0, 2.0])\nprint(v.shape)  # (2,)`,
        `import torch\n\nv = torch.tensor([3.0, 2.0])\nprint(v.shape)  # torch.Size([2])`,
      )}
      <ChapterSummary>
        <p>
          Notation tells you the vector’s components, order, dimension, shape,
          and number system.
        </p>
      </ChapterSummary>
    </div>
  )
}

function ComponentsChapter() {
  const [v, setV] = useState<Vector2>({ x: 3, y: 2 })
  return (
    <div className="chapter-content">
      <Intro title="coordinates as movement">
        <h2>v = [x, y]</h2>
        <p>
          <code>[3, 2]</code> means 3 units along x and 2 units along y in a
          Cartesian coordinate system.
        </p>
      </Intro>
      <VisualizerFrame
        title="components and coordinates"
        description="Drag the endpoint or edit either component."
        onReset={() => setV({ x: 3, y: 2 })}
        controls={<VectorControls name="v" value={v} onChange={setV} />}
        readout={
          <p>
            v = [{v.x}, {v.y}] · x component {v.x} · y component {v.y}
          </p>
        }
      >
        <VectorPlot
          vectors={[{ value: v, label: 'v' }]}
          draggable={0}
          onChange={setV}
          projections
        />
      </VisualizerFrame>
      <Intro title="beyond the plane">
        <p>
          A 3D vector adds a z component: <code>[x, y, z]</code>. Higher
          dimensions follow the same component logic even when we cannot draw
          them directly.
        </p>
      </Intro>
      <AIConnection>
        <p>
          A feature vector uses coordinate positions for features rather than
          physical x/y directions.
        </p>
      </AIConnection>
      <ChapterSummary>
        <p>
          Components locate a vector in a chosen coordinate system. Projections
          reveal how much lies along each axis.
        </p>
      </ChapterSummary>
    </div>
  )
}

function MagnitudeChapter() {
  const [v, setV] = useState<Vector2>({ x: 3, y: 4 })
  const [unit, setUnit] = useState(false)
  const length = l2Norm(v)
  const displayed = unit ? normalize(v) : v
  return (
    <div className="chapter-content">
      <Intro title="length and direction">
        <p>
          Magnitude measures length. In 2D, the components form a right
          triangle, so Pythagoras gives the formula.
        </p>
      </Intro>
      <FormulaBlock>‖v‖ = √(x² + y²)</FormulaBlock>
      <WorkedExample title="v = [3, 4]">
        <p>‖v‖ = √(3² + 4²) = √(9 + 16) = √25 = 5</p>
      </WorkedExample>
      <VisualizerFrame
        title="magnitude and unit direction"
        onReset={() => {
          setV({ x: 3, y: 4 })
          setUnit(false)
        }}
        controls={
          <>
            <VectorControls name="v" value={v} onChange={setV} />
            <label className="toggle-control">
              <input
                type="checkbox"
                checked={unit}
                onChange={(e) => setUnit(e.target.checked)}
              />{' '}
              show unit vector
            </label>
          </>
        }
        readout={
          <p>
            ‖v‖ = {length.toFixed(3)} · displayed [{displayed.x.toFixed(3)},{' '}
            {displayed.y.toFixed(3)}]
          </p>
        }
      >
        <VectorPlot
          vectors={[{ value: displayed, label: unit ? 'v̂' : 'v' }]}
          draggable={unit ? undefined : 0}
          onChange={setV}
        />
      </VisualizerFrame>
      <FormulaBlock label="normalization">v̂ = v / ‖v‖</FormulaBlock>
      <CommonMistakes>
        <p>
          Magnitude is not the sum of components. The zero vector has no
          direction and cannot be normalized.
        </p>
      </CommonMistakes>
      <AIConnection>
        <p>
          Normalization supports feature scaling, cosine similarity, embedding
          comparison, and stable optimization.
        </p>
      </AIConnection>
      <MagnitudeChallenge />
      <ChapterSummary>
        <p>
          Magnitude measures size; normalization removes size while preserving
          direction for every non-zero vector.
        </p>
      </ChapterSummary>
    </div>
  )
}
function MagnitudeChallenge() {
  const [v, setV] = useState<Vector2>({ x: 1, y: 1 })
  return (
    <Challenge
      prompt="Create a vector with magnitude approximately 5."
      hint="Try a 3–4 right triangle."
      isCorrect={() => Math.abs(l2Norm(v) - 5) < 0.05}
      onReset={() => setV({ x: 1, y: 1 })}
    >
      <VectorControls name="challenge vector" value={v} onChange={setV} />
      <p>current magnitude: {l2Norm(v).toFixed(3)}</p>
    </Challenge>
  )
}

function AdditionChapter() {
  const [a, setA] = useState<Vector2>({ x: 2, y: 1 })
  const [b, setB] = useState<Vector2>({ x: 1, y: 3 })
  const sum = add(a, b)
  const diff = subtract(a, b)
  return (
    <div className="chapter-content">
      <Intro title="combine components">
        <p>
          Add matching components. Geometrically, place b’s tail at a’s head;
          the result reaches the final point.
        </p>
      </Intro>
      <WorkedExample title="a = [2, 1], b = [1, 3]">
        <p>a + b = [2 + 1, 1 + 3] = [3, 4]</p>
        <p>a − b = a + (−b)</p>
      </WorkedExample>
      <VisualizerFrame
        title="addition and subtraction"
        onReset={() => {
          setA({ x: 2, y: 1 })
          setB({ x: 1, y: 3 })
        }}
        controls={
          <>
            <VectorControls name="a" value={a} onChange={setA} />
            <VectorControls name="b" value={b} onChange={setB} />
          </>
        }
        readout={
          <p>
            a + b = [{sum.x}, {sum.y}] · a − b = [{diff.x}, {diff.y}]
          </p>
        }
      >
        <VectorPlot
          vectors={[
            { value: a, label: 'a' },
            { start: a, value: sum, label: 'b', muted: true },
            { value: sum, label: 'a+b' },
            { value: diff, label: 'a−b', dashed: true },
          ]}
        />
      </VisualizerFrame>
      <AIConnection>
        <p>
          Subtraction measures change and feature-vector differences. Embedding
          offsets can be informative, but meaningful analogies are not
          guaranteed in every model.
        </p>
      </AIConnection>
      <AdditionChallenge />
      <ChapterSummary>
        <p>
          Addition combines displacements. Subtraction adds the opposite vector
          and measures directed difference.
        </p>
      </ChapterSummary>
    </div>
  )
}
function AdditionChallenge() {
  const [a, setA] = useState<Vector2>({ x: 1, y: 1 })
  const [b, setB] = useState<Vector2>({ x: 1, y: 1 })
  return (
    <Challenge
      prompt="Choose A and B so A + B = [4, 3]."
      hint="Each pair of matching components must add to the target."
      isCorrect={() => {
        const s = add(a, b)
        return s.x === 4 && s.y === 3
      }}
      onReset={() => {
        setA({ x: 1, y: 1 })
        setB({ x: 1, y: 1 })
      }}
    >
      <VectorControls name="A" value={a} onChange={setA} />
      <VectorControls name="B" value={b} onChange={setB} />
    </Challenge>
  )
}

function ScalarChapter() {
  const [v, setV] = useState<Vector2>({ x: 2, y: 1 })
  const [k, setK] = useState(2)
  const result = scale(v, k)
  return (
    <div className="chapter-content">
      <Intro title="one number, every component">
        <p>
          Scalar multiplication applies the same multiplier to every component.
        </p>
      </Intro>
      <FormulaBlock>kv = [kx, ky]</FormulaBlock>
      <VisualizerFrame
        title="scale a vector"
        onReset={() => {
          setV({ x: 2, y: 1 })
          setK(2)
        }}
        controls={
          <>
            <VectorControls name="v" value={v} onChange={setV} />
            <label className="range-control">
              <span>scalar k</span>
              <input
                type="range"
                min="-3"
                max="3"
                step="0.1"
                value={k}
                onChange={(e) => setK(Number(e.target.value))}
              />
            </label>
            <NumericControl
              label="scalar k numeric"
              value={k}
              min={-3}
              max={3}
              onChange={setK}
            />
          </>
        }
        readout={
          <p>
            k = {k.toFixed(1)} · kv = [{result.x.toFixed(2)},{' '}
            {result.y.toFixed(2)}] ·{' '}
            {k < 0
              ? 'direction reversed'
              : k === 0
                ? 'zero vector'
                : Math.abs(k) > 1
                  ? 'longer'
                  : 'shorter'}
          </p>
        }
      >
        <VectorPlot
          vectors={[
            { value: v, label: 'v', muted: true },
            { value: result, label: 'kv' },
          ]}
        />
      </VisualizerFrame>
      <AIConnection>
        <p>
          Scalars express feature weights, learning-rate steps, coefficients in
          linear combinations, and normalization factors.
        </p>
      </AIConnection>
      <ChapterSummary>
        <p>
          Positive scalars preserve direction, zero collapses the vector, and
          negative scalars reverse direction.
        </p>
      </ChapterSummary>
    </div>
  )
}

function NormsChapter() {
  const [norm, setNorm] = useState<'l1' | 'l2' | 'linfinity'>('l2')
  const [a, setA] = useState<Vector2>({ x: -2, y: -1 })
  const [b, setB] = useState<Vector2>({ x: 2, y: 2 })
  return (
    <div className="chapter-content">
      <Intro title="different ways to measure size">
        <p>
          A norm maps a vector to a non-negative size. Different norms create
          different geometries.
        </p>
      </Intro>
      <div className="formula-stack">
        <FormulaBlock label="L1">‖x‖₁ = Σ |xᵢ|</FormulaBlock>
        <FormulaBlock label="L2">‖x‖₂ = √(Σ xᵢ²)</FormulaBlock>
        <FormulaBlock label="L∞">‖x‖∞ = max |xᵢ|</FormulaBlock>
        <FormulaBlock label="general Lp">‖x‖ₚ = (Σ |xᵢ|ᵖ)¹⁄ᵖ</FormulaBlock>
      </div>
      <div className="inline-switch" role="group" aria-label="Select norm">
        {(['l1', 'l2', 'linfinity'] as const).map((item) => (
          <button
            key={item}
            aria-pressed={norm === item}
            onClick={() => setNorm(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <NormBall norm={norm} />
      <VisualizerFrame
        title="distance between points"
        controls={
          <>
            <VectorControls name="a" value={a} onChange={setA} />
            <VectorControls name="b" value={b} onChange={setB} />
          </>
        }
        onReset={() => {
          setA({ x: -2, y: -1 })
          setB({ x: 2, y: 2 })
        }}
        readout={
          <p>
            Manhattan / L1: {manhattanDistance(a, b).toFixed(2)} · Euclidean /
            L2: {distance(a, b).toFixed(2)} · L∞ size of a−b:{' '}
            {infinityNorm(subtract(a, b)).toFixed(2)}
          </p>
        }
      >
        <VectorPlot
          vectors={[
            { value: a, label: 'a' },
            { value: b, label: 'b', muted: true },
            { start: a, value: b, label: 'a→b', dashed: true },
          ]}
        />
      </VisualizerFrame>
      <AIConnection>
        <p>
          KNN, clustering, regularization, adversarial robustness, and
          nearest-neighbor systems make distance choices explicit.
        </p>
      </AIConnection>
      <ChapterSummary>
        <p>
          Norms measure vectors; distances measure differences by applying a
          norm to a − b.
        </p>
      </ChapterSummary>
    </div>
  )
}

function DotChapter() {
  const [a, setA] = useState<Vector2>({ x: 2, y: 3 })
  const [b, setB] = useState<Vector2>({ x: 4, y: 1 })
  const value = dot(a, b)
  const angle = angleBetween(a, b)
  const relation =
    value > 0
      ? 'broadly similar directions'
      : value < 0
        ? 'broadly opposite directions'
        : 'perpendicular'
  return (
    <div className="chapter-content">
      <Intro title="multiply, then sum">
        <FormulaBlock>a · b = a₁b₁ + a₂b₂ + … + aₙbₙ</FormulaBlock>
        <FormulaBlock>a · b = ‖a‖ ‖b‖ cos θ</FormulaBlock>
        <p>
          The raw dot product responds to both direction and magnitude. It is
          not purely an angle measure.
        </p>
      </Intro>
      <WorkedExample title="a = [2, 3], b = [4, 1]">
        <p>a · b = (2 × 4) + (3 × 1) = 8 + 3 = 11</p>
      </WorkedExample>
      <VisualizerFrame
        title="dot product"
        onReset={() => {
          setA({ x: 2, y: 3 })
          setB({ x: 4, y: 1 })
        }}
        controls={
          <>
            <VectorControls name="a" value={a} onChange={setA} />
            <VectorControls name="b" value={b} onChange={setB} />
          </>
        }
        readout={
          <p>
            a · b = {value.toFixed(2)} · {relation} · angle{' '}
            {angle === null ? 'undefined' : `${angle.toFixed(1)}°`}
          </p>
        }
      >
        <VectorPlot
          vectors={[
            { value: a, label: 'a' },
            { value: b, label: 'b', muted: true },
          ]}
        />
      </VisualizerFrame>
      <CommonMistakes>
        <p>
          Element-wise multiplication produces a vector. The dot product sums
          those products to produce one scalar.
        </p>
      </CommonMistakes>
      <AIConnection>
        <p>
          Neuron weighted sums, attention scores, embedding comparisons, and
          matrix multiplication all depend on dot products.
        </p>
      </AIConnection>
      {numpyTorch(
        `import numpy as np\nnp.dot(a, b)`,
        `import torch\ntorch.dot(a, b)`,
      )}
      <DotChallenge />
      <ChapterSummary>
        <p>
          The dot product compresses component alignment and magnitude into one
          scalar.
        </p>
      </ChapterSummary>
    </div>
  )
}
function DotChallenge() {
  const [a, setA] = useState<Vector2>({ x: 1, y: 1 })
  const [b, setB] = useState<Vector2>({ x: 1, y: 1 })
  return (
    <Challenge
      prompt="Create two non-zero vectors whose dot product is 0."
      hint="A quarter-turn maps [x, y] to [−y, x]."
      isCorrect={() =>
        l2Norm(a) > 0 && l2Norm(b) > 0 && Math.abs(dot(a, b)) < 0.001
      }
      onReset={() => {
        setA({ x: 1, y: 1 })
        setB({ x: 1, y: 1 })
      }}
    >
      <VectorControls name="a" value={a} onChange={setA} />
      <VectorControls name="b" value={b} onChange={setB} />
      <p>dot product: {dot(a, b).toFixed(2)}</p>
    </Challenge>
  )
}

function AnglesChapter() {
  const [degrees, setDegrees] = useState(45)
  const a = { x: 3, y: 0 }
  const radians = (degrees * Math.PI) / 180
  const b = { x: 3 * Math.cos(radians), y: 3 * Math.sin(radians) }
  return (
    <div className="chapter-content">
      <Intro title="from alignment to angle">
        <FormulaBlock>cos θ = (a · b) / (‖a‖ ‖b‖)</FormulaBlock>
        <FormulaBlock>θ = arccos((a · b) / (‖a‖ ‖b‖))</FormulaBlock>
        <p>
          Radians measure angle by arc length; degrees divide a full turn into
          360. Mathematical libraries usually use radians internally.
        </p>
      </Intro>
      <VisualizerFrame
        title="rotate vector b"
        onReset={() => setDegrees(45)}
        controls={
          <>
            <label className="range-control">
              <span>angle</span>
              <input
                type="range"
                min="0"
                max="180"
                step="1"
                value={degrees}
                onChange={(e) => setDegrees(Number(e.target.value))}
              />
            </label>
            <NumericControl
              label="angle degrees"
              value={degrees}
              min={0}
              max={180}
              step={1}
              onChange={setDegrees}
            />
          </>
        }
        readout={
          <p>
            θ = {degrees}° · cos θ = {Math.cos(radians).toFixed(3)} · a · b ={' '}
            {dot(a, b).toFixed(3)}
          </p>
        }
      >
        <VectorPlot
          vectors={[
            { value: a, label: 'a' },
            { value: b, label: 'b', muted: true },
          ]}
        />
      </VisualizerFrame>
      <Intro title="landmarks">
        <p>
          0° same direction · 45° acute · 90° perpendicular · 135° broadly
          opposite · 180° opposite.
        </p>
        <p>An angle is undefined when either vector has zero magnitude.</p>
      </Intro>
      <ChapterSummary>
        <p>
          Normalize the dot product by both magnitudes, clamp numerical error,
          then apply arccos.
        </p>
      </ChapterSummary>
    </div>
  )
}

const embeddings: Record<string, Vector2> = {
  king: { x: 2.8, y: 2.3 },
  queen: { x: 2.5, y: 2.8 },
  man: { x: 1.8, y: 1.2 },
  woman: { x: 1.5, y: 1.8 },
  car: { x: -2.7, y: -0.8 },
  truck: { x: -2.4, y: -1.4 },
  apple: { x: -1.2, y: 2.6 },
  banana: { x: -0.7, y: 2.3 },
}
function CosineChapter() {
  const [a, setA] = useState<Vector2>({ x: 1, y: 1 })
  const [b, setB] = useState<Vector2>({ x: 10, y: 10 })
  const [first, setFirst] = useState('king')
  const [second, setSecond] = useState('queen')
  const similarity = cosineSimilarity(a, b)
  const ea = embeddings[first]
  const eb = embeddings[second]
  return (
    <div className="chapter-content">
      <Intro title="compare direction, not size">
        <FormulaBlock>
          cosine_similarity(a, b) = (a · b) / (‖a‖ ‖b‖)
        </FormulaBlock>
        <p>
          Cosine similarity removes overall magnitude. It ranges from −1 to 1
          for non-zero real vectors.
        </p>
      </Intro>
      <WorkedExample title="same direction, different scale">
        <p>A = [1, 1], B = [10, 10]</p>
        <p>A · B = 20</p>
        <p>‖A‖‖B‖ = √2 × √200 = 20</p>
        <p>cosine similarity = 20 / 20 = 1</p>
        <p>
          Euclidean distance = √162 ≈ 12.728 — large even though direction
          matches.
        </p>
      </WorkedExample>
      <VisualizerFrame
        title="cosine vs Euclidean"
        onReset={() => {
          setA({ x: 1, y: 1 })
          setB({ x: 10, y: 10 })
        }}
        controls={
          <>
            <VectorControls
              name="A"
              value={a}
              onChange={setA}
              min={-10}
              max={10}
            />
            <VectorControls
              name="B"
              value={b}
              onChange={setB}
              min={-10}
              max={10}
            />
          </>
        }
        readout={
          <p>
            cosine:{' '}
            {similarity === null
              ? 'undefined for a zero vector'
              : similarity.toFixed(4)}{' '}
            · Euclidean distance: {distance(a, b).toFixed(3)}
          </p>
        }
      >
        <VectorPlot
          vectors={[
            { value: scale(normalize(a), 3), label: 'A direction' },
            {
              value: scale(normalize(b), 3),
              label: 'B direction',
              muted: true,
            },
          ]}
        />
      </VisualizerFrame>
      <CommonMistakes>
        <p>
          Cosine similarity is not Euclidean distance. It ignores scale but
          still depends on a meaningful shared coordinate space.
        </p>
      </CommonMistakes>
      <section className="embedding-playground">
        <p className="block-label">illustrative synthetic embeddings</p>
        <h2>inspect a tiny hand-authored dataset</h2>
        <p>These points are educational examples, not learned model outputs.</p>
        <div className="embedding-controls">
          <label>
            term A
            <select value={first} onChange={(e) => setFirst(e.target.value)}>
              {Object.keys(embeddings).map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <label>
            term B
            <select value={second} onChange={(e) => setSecond(e.target.value)}>
              {Object.keys(embeddings).map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
        </div>
        <VectorPlot
          title="Synthetic embedding map"
          vectors={Object.entries(embeddings).map(([label, value]) => ({
            label,
            value,
            muted: label !== first && label !== second,
          }))}
        />
        <p>
          {first} ↔ {second} · cosine {cosineSimilarity(ea, eb)?.toFixed(3)} ·
          distance {distance(ea, eb).toFixed(3)}
        </p>
      </section>
      {numpyTorch(
        `import numpy as np\nsimilarity = np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))`,
        `import torch.nn.functional as F\nsimilarity = F.cosine_similarity(a.unsqueeze(0), b.unsqueeze(0))`,
      )}
      <CosineChallenge />
      <AIConnection>
        <p>
          Cosine similarity is common in retrieval and embedding search when
          direction matters more than scale.
        </p>
      </AIConnection>
      <ChapterSummary>
        <p>
          Cosine compares normalized direction. Always handle zero vectors and
          compare it deliberately with distance.
        </p>
      </ChapterSummary>
    </div>
  )
}
function CosineChallenge() {
  const [a, setA] = useState<Vector2>({ x: 1, y: 1 })
  const [b, setB] = useState<Vector2>({ x: 2, y: 1 })
  return (
    <Challenge
      prompt="Create two different vectors with cosine similarity approximately 1."
      hint="Use positive scalar multiples, such as [1, 2] and [2, 4]."
      isCorrect={() =>
        distance(a, b) > 0 &&
        Math.abs((cosineSimilarity(a, b) ?? 0) - 1) < 0.001
      }
      onReset={() => {
        setA({ x: 1, y: 1 })
        setB({ x: 2, y: 1 })
      }}
    >
      <VectorControls name="A" value={a} onChange={setA} />
      <VectorControls name="B" value={b} onChange={setB} />
      <p>cosine: {cosineSimilarity(a, b)?.toFixed(4) ?? 'undefined'}</p>
    </Challenge>
  )
}
