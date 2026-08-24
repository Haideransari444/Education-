import type { ReactNode } from 'react'

interface VisualizerFrameProps {
  title: string
  description?: string
  children: ReactNode
  controls?: ReactNode
  readout?: ReactNode
  onReset?: () => void
}

export function VisualizerFrame({
  title,
  description,
  children,
  controls,
  readout,
  onReset,
}: VisualizerFrameProps) {
  return (
    <section
      className="visualizer-frame"
      aria-labelledby={`${title.replace(/\s/g, '-')}-title`}
    >
      <header>
        <div>
          <h2 id={`${title.replace(/\s/g, '-')}-title`}>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        {onReset && (
          <button className="text-button" onClick={onReset}>
            reset
          </button>
        )}
      </header>
      <div className="visualizer-viewport">{children}</div>
      {controls && <div className="visualizer-controls">{controls}</div>}
      {readout && (
        <div className="visualizer-readout" aria-live="polite">
          {readout}
        </div>
      )}
    </section>
  )
}
