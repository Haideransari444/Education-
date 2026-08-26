import { tokens, type AttentionResult, type Matrix } from './engine'

export function TokenFlow({ active }: { active: number }) {
  return (
    <div className="token-flow" aria-label="Token sequence">
      {tokens.map((token, index) => (
        <span className={index === active ? 'active' : ''} key={token}>
          {token}
        </span>
      ))}
    </div>
  )
}

export function EmbeddingView({ matrix }: { matrix: Matrix }) {
  return (
    <MatrixView
      title="token embeddings"
      matrix={matrix}
      rowLabels={[...tokens]}
    />
  )
}

export function QKVView({ result }: { result: AttentionResult }) {
  return (
    <div className="qkv-view">
      <MatrixView title="Q · what am I looking for?" matrix={result.queries} />
      <MatrixView title="K · what do I contain?" matrix={result.keys} />
      <MatrixView
        title="V · what information do I pass?"
        matrix={result.values}
      />
    </div>
  )
}

export function AttentionMatrix({
  result,
  active,
}: {
  result: AttentionResult
  active: number
}) {
  return (
    <MatrixView
      title={`softmax attention for “${tokens[active]}”`}
      matrix={[result.weights[active]]}
      rowLabels={[tokens[active]]}
      columnLabels={[...tokens]}
    />
  )
}

export function ResidualStreamView({
  result,
  active,
}: {
  result: AttentionResult
  active: number
}) {
  const values = result.outputs[active]
  return (
    <div className="residual-view">
      <span>attention output</span>
      {values.map((value, index) => (
        <i
          key={index}
          style={{ height: `${Math.abs(value) * 70 + 10}px` }}
          title={value.toFixed(3)}
        />
      ))}
      <b>+</b>
      <span>original token signal</span>
    </div>
  )
}

export function MatrixView({
  title,
  matrix,
  rowLabels,
  columnLabels,
}: {
  title: string
  matrix: Matrix
  rowLabels?: string[]
  columnLabels?: string[]
}) {
  const scale = Math.max(...matrix.flat().map(Math.abs), 1)
  return (
    <figure className="attention-matrix">
      <figcaption>{title}</figcaption>
      {columnLabels && (
        <div className="matrix-columns">
          {columnLabels.map((x) => (
            <span key={x}>{x}</span>
          ))}
        </div>
      )}
      <div>
        {matrix.map((row, rowIndex) => (
          <section key={rowIndex}>
            {rowLabels && <b>{rowLabels[rowIndex]}</b>}
            {row.map((value, column) => (
              <span
                key={column}
                style={{ opacity: 0.18 + (Math.abs(value) / scale) * 0.82 }}
                title={value.toFixed(4)}
              >
                {value.toFixed(2)}
              </span>
            ))}
          </section>
        ))}
      </div>
    </figure>
  )
}
