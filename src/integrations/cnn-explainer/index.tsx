import { useMemo, useState } from 'react'
import {
  AIConnection,
  Challenge,
  ChapterSummary,
  WorkedExample,
} from '../../components/education/EducationalBlocks'
import { VisualizerFrame } from '../../visualization/components/VisualizerFrame'
import { getIntegration } from '../registry'
import { UpstreamCredit } from '../UpstreamCredit'
import {
  convolve,
  inputImage,
  kernels,
  maxPool,
  relu,
  type KernelName,
  type Matrix,
} from './engine'

export default function CnnExplainer() {
  const [kernelName, setKernelName] = useState<KernelName>('edge')
  const [position, setPosition] = useState(0)
  const [challengeKernel, setChallengeKernel] = useState<KernelName>('blur')
  const featureMap = useMemo(
    () => convolve(inputImage, kernels[kernelName]),
    [kernelName],
  )
  const activated = relu(featureMap)
  const pooled = maxPool(activated)
  const source = getIntegration('cnn-explainer')!.upstream
  const maxPosition = featureMap.length * featureMap[0].length - 1
  const row = Math.floor(position / featureMap[0].length)
  const column = position % featureMap[0].length
  return (
    <div className="chapter-content integration-lesson">
      <section>
        <p className="block-label">concept</p>
        <h2>small filters reveal local structure</h2>
        <p>
          An image is a tensor of pixel values. A convolution slides the same
          kernel over every local patch, producing a feature map that records
          where that pattern appears.
        </p>
      </section>
      <VisualizerFrame
        title="convolution pipeline"
        description="Synthetic pixels → filter response → ReLU → max pooling."
        onReset={() => {
          setKernelName('edge')
          setPosition(0)
        }}
        controls={
          <div className="integration-controls compact">
            <label>
              kernel
              <select
                value={kernelName}
                onChange={(event) => {
                  setKernelName(event.target.value as KernelName)
                  setPosition(0)
                }}
              >
                <option value="edge">edge detector</option>
                <option value="sharpen">sharpen</option>
                <option value="blur">blur</option>
              </select>
            </label>
            <label>
              sliding position
              <input
                type="range"
                min="0"
                max={maxPosition}
                value={position}
                onChange={(event) => setPosition(+event.target.value)}
              />
              <output>
                ({row}, {column})
              </output>
            </label>
          </div>
        }
        readout={
          <p>
            current response {featureMap[row][column].toFixed(2)} · feature map{' '}
            {featureMap.length}×{featureMap[0].length} · pooled {pooled.length}×
            {pooled[0].length}
          </p>
        }
      >
        <div className="cnn-pipeline">
          <MatrixView matrix={inputImage} label="input pixels" />
          <span aria-hidden="true">∗</span>
          <MatrixView
            matrix={kernels[kernelName] as unknown as Matrix}
            label={`${kernelName} kernel`}
            signed
          />
          <span aria-hidden="true">→</span>
          <MatrixView
            matrix={featureMap}
            label="feature map"
            selected={[row, column]}
            signed
          />
          <span aria-hidden="true">→</span>
          <MatrixView matrix={activated} label="ReLU" />
          <span aria-hidden="true">→</span>
          <MatrixView matrix={pooled} label="max pool" />
        </div>
      </VisualizerFrame>
      <WorkedExample title="calculate one feature-map cell">
        <p>
          At the selected position, multiply each 3×3 image-patch value by the
          matching kernel weight, then add the nine products. ReLU replaces a
          negative sum with zero; pooling keeps the strongest local response.
        </p>
      </WorkedExample>
      <Challenge
        prompt="Which kernel suppresses sharp local changes?"
        hint="Averaging neighboring pixels smooths the image."
        isCorrect={() => challengeKernel === 'blur'}
        onReset={() => setChallengeKernel('edge')}
      >
        <select
          aria-label="Challenge kernel"
          value={challengeKernel}
          onChange={(event) =>
            setChallengeKernel(event.target.value as KernelName)
          }
        >
          <option value="edge">edge detector</option>
          <option value="sharpen">sharpen</option>
          <option value="blur">blur</option>
        </select>
      </Challenge>
      <AIConnection>
        <p>
          Real CNNs learn many kernels across many channels. Early filters often
          respond to edges; deeper combinations respond to textures, parts, and
          class evidence.
        </p>
      </AIConnection>
      <ChapterSummary>
        <p>
          Shared kernels make CNNs spatially efficient, nonlinear activation
          keeps useful responses, and pooling summarizes nearby evidence.
        </p>
      </ChapterSummary>
      <UpstreamCredit source={source} />
    </div>
  )
}

function MatrixView({
  matrix,
  label,
  signed = false,
  selected,
}: {
  matrix: Matrix
  label: string
  signed?: boolean
  selected?: [number, number]
}) {
  const flat = matrix.flat()
  const scale = Math.max(...flat.map((value) => Math.abs(value)), 1)
  return (
    <figure className="matrix-view">
      <figcaption>{label}</figcaption>
      <div style={{ gridTemplateColumns: `repeat(${matrix[0].length}, 1fr)` }}>
        {flat.map((value, index) => {
          const row = Math.floor(index / matrix[0].length)
          const column = index % matrix[0].length
          return (
            <span
              key={index}
              className={
                selected?.[0] === row && selected[1] === column
                  ? 'selected'
                  : ''
              }
              style={{
                background:
                  signed && value < 0
                    ? 'var(--integration-gold)'
                    : 'var(--integration-blue)',
                opacity: 0.12 + (Math.abs(value) / scale) * 0.78,
              }}
              title={`${label} row ${row + 1}, column ${column + 1}: ${value.toFixed(2)}`}
            >
              {matrix.length <= 3 ? value.toFixed(1) : ''}
            </span>
          )
        })}
      </div>
    </figure>
  )
}
