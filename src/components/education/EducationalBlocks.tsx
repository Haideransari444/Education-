import { useState, type ReactNode } from 'react'

export function FormulaBlock({
  label,
  children,
}: {
  label?: string
  children: ReactNode
}) {
  return (
    <div className="formula-block">
      {label && <span>{label}</span>}
      <div>{children}</div>
    </div>
  )
}
export function WorkedExample({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="educational-block">
      <p className="block-label">worked example</p>
      <h2>{title}</h2>
      {children}
    </section>
  )
}
export function AIConnection({ children }: { children: ReactNode }) {
  return (
    <section className="educational-block ai-connection">
      <p className="block-label">where ai uses this</p>
      {children}
    </section>
  )
}
export function CommonMistakes({ children }: { children: ReactNode }) {
  return (
    <section className="educational-block">
      <p className="block-label">common mistake</p>
      {children}
    </section>
  )
}
export function ChapterSummary({ children }: { children: ReactNode }) {
  return (
    <section className="educational-block chapter-summary">
      <p className="block-label">summary</p>
      {children}
    </section>
  )
}
export function Challenge({
  prompt,
  hint,
  isCorrect,
  onReset,
  children,
}: {
  prompt: string
  hint: string
  isCorrect: () => boolean
  onReset: () => void
  children: ReactNode
}) {
  const [message, setMessage] = useState('')
  return (
    <section className="challenge">
      <p className="block-label">challenge</p>
      <h2>{prompt}</h2>
      {children}
      <div className="challenge-actions">
        <button
          onClick={() =>
            setMessage(isCorrect() ? 'correct ✓' : 'not yet — keep adjusting')
          }
        >
          check
        </button>
        <button onClick={() => setMessage(hint)}>hint</button>
        <button
          onClick={() => {
            onReset()
            setMessage('')
          }}
        >
          reset
        </button>
      </div>
      <p className="challenge-status" aria-live="polite">
        {message}
      </p>
    </section>
  )
}
