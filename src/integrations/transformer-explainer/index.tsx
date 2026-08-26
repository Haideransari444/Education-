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
  computeAttention,
  embeddings,
  outputProbabilities,
  tokens,
} from './engine'
import {
  AttentionMatrix,
  EmbeddingView,
  QKVView,
  ResidualStreamView,
  TokenFlow,
} from './views'

const stages = [
  'tokens',
  'embeddings',
  'query / key / value',
  'attention',
  'contextual output',
  'logits',
]

export default function TransformerExplainer() {
  const [stage, setStage] = useState(0)
  const [active, setActive] = useState(1)
  const [answer, setAnswer] = useState('')
  const result = useMemo(() => computeAttention(), [])
  const probabilities = outputProbabilities(result.outputs[active])
  const source = getIntegration('transformer-explainer')!.upstream
  return (
    <div className="chapter-content integration-lesson">
      <section>
        <p className="block-label">concept</p>
        <h2>attention lets every token gather context</h2>
        <p>
          A transformer turns tokens into vectors, projects each vector into a
          query, key and value, compares queries with keys, then mixes values
          according to normalized attention weights.
        </p>
      </section>
      <VisualizerFrame
        title="token → attention → output"
        description="A tiny deterministic single-head walkthrough; no remote tokenizer or model."
        onReset={() => {
          setStage(0)
          setActive(1)
        }}
        controls={
          <div
            className="transformer-stage-controls"
            role="group"
            aria-label="Transformer stages"
          >
            {stages.map((name, index) => (
              <button
                key={name}
                className={stage === index ? 'active' : ''}
                onClick={() => setStage(index)}
              >
                {index + 1}. {name}
              </button>
            ))}
          </div>
        }
        readout={
          <p>
            stage {stage + 1} / {stages.length} · selected token “
            {tokens[active]}” · attention weights sum to{' '}
            {result.weights[active].reduce((a, b) => a + b, 0).toFixed(4)}
          </p>
        }
      >
        <TokenFlow active={active} />
        <div className="token-selector" role="group" aria-label="Inspect token">
          {tokens.map((token, index) => (
            <button
              key={token}
              aria-pressed={active === index}
              onClick={() => setActive(index)}
            >
              {token}
            </button>
          ))}
        </div>
        <div className="transformer-stage" key={stage}>
          {stage === 0 && (
            <p>
              Tokenization creates discrete symbols. This fixed example uses
              three educational tokens.
            </p>
          )}
          {stage === 1 && <EmbeddingView matrix={embeddings} />}{' '}
          {stage === 2 && <QKVView result={result} />}{' '}
          {stage === 3 && <AttentionMatrix result={result} active={active} />}{' '}
          {stage === 4 && (
            <ResidualStreamView result={result} active={active} />
          )}{' '}
          {stage === 5 && <LogitsView probabilities={probabilities} />}
        </div>
        <div className="transport-controls">
          <button
            disabled={stage === 0}
            onClick={() => setStage((x) => Math.max(0, x - 1))}
          >
            previous
          </button>
          <button
            disabled={stage === stages.length - 1}
            onClick={() => setStage((x) => Math.min(stages.length - 1, x + 1))}
          >
            next
          </button>
        </div>
      </VisualizerFrame>
      <WorkedExample title="follow the word “cat”">
        <p>
          Its query asks which tokens matter. Dot products compare that query to
          every key. Softmax converts the three scores into positive weights
          summing to one. The weighted values produce a context-sensitive “cat”
          representation.
        </p>
      </WorkedExample>
      <Challenge
        prompt="What operation makes attention weights sum to one?"
        hint="It exponentiates and normalizes the scores."
        isCorrect={() => answer.toLowerCase().includes('softmax')}
        onReset={() => setAnswer('')}
      >
        <input
          aria-label="Attention normalization answer"
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          placeholder="operation name"
        />
      </Challenge>
      <AIConnection>
        <p>
          Reusable attention modules sit inside GPT-style generation, BERT-style
          understanding, multimodal models, and many vision architectures.
        </p>
      </AIConnection>
      <ChapterSummary>
        <p>
          Q and K decide where to look; V carries the information; softmax turns
          comparisons into a stable weighted mixture.
        </p>
      </ChapterSummary>
      <UpstreamCredit source={source} />
    </div>
  )
}

function LogitsView({ probabilities }: { probabilities: number[] }) {
  const labels = ['mat', 'quietly', 'today']
  return (
    <div
      className="logits-view"
      role="img"
      aria-label="Illustrative next-token probabilities"
    >
      {probabilities.map((value, index) => (
        <div key={labels[index]}>
          <span>{labels[index]}</span>
          <i style={{ width: `${value * 100}%` }} />
          <b>{(value * 100).toFixed(1)}%</b>
        </div>
      ))}
    </div>
  )
}
