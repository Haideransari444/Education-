import type { UpstreamSource } from '../visualization/types/upstream'

export function UpstreamCredit({ source }: { source: UpstreamSource }) {
  return (
    <section className="upstream-credit">
      <p className="block-label">source & credits</p>
      <p>
        Interactive visualization adapted from{' '}
        <a href={source.repository} target="_blank" rel="noreferrer">
          {source.project}
        </a>
        . {source.license} licensed.
      </p>
      <details>
        <summary>provenance details</summary>
        <dl>
          <div>
            <dt>commit</dt>
            <dd>{source.commit}</dd>
          </div>
          <div>
            <dt>mode</dt>
            <dd>{source.integration}</dd>
          </div>
          <div>
            <dt>upstream assets / data / weights</dt>
            <dd>
              {source.assetsApproved ||
              source.dataApproved ||
              source.weightsApproved
                ? 'see audit'
                : 'not included'}
            </dd>
          </div>
        </dl>
      </details>
    </section>
  )
}
