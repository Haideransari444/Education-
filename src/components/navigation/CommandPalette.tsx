import { useId, useState, type KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCategory } from '../../curriculum/curriculum'
import { searchLessons } from '../../curriculum/search'

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const navigate = useNavigate()
  const listId = useId()
  const results = searchLessons(query).slice(0, 7)

  if (!open) return null

  const choose = (id: string) => {
    navigate(`/learn/${id}`)
    onClose()
  }
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') onClose()
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActive((value) => Math.min(value + 1, results.length - 1))
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActive((value) => Math.max(value - 1, 0))
    }
    if (event.key === 'Enter' && results[active]) choose(results[active].id)
  }

  return (
    <div
      className="palette-backdrop"
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <section
        className="palette"
        role="dialog"
        aria-modal="true"
        aria-label="Search lessons"
        onKeyDown={onKeyDown}
      >
        <label className="sr-only" htmlFor="lesson-search">
          Search AI Core
        </label>
        <input
          id="lesson-search"
          autoFocus
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setActive(0)
          }}
          placeholder="search ai core..."
          role="combobox"
          aria-expanded="true"
          aria-controls={listId}
          aria-activedescendant={
            results[active] ? `${listId}-${results[active].id}` : undefined
          }
        />
        <ul id={listId} role="listbox">
          {results.map((lesson, index) => (
            <li
              key={lesson.id}
              id={`${listId}-${lesson.id}`}
              role="option"
              aria-selected={index === active}
            >
              <button
                onClick={() => choose(lesson.id)}
                onMouseEnter={() => setActive(index)}
              >
                <span>
                  <b>{lesson.title.toLowerCase()}</b>
                  <small>
                    {getCategory(lesson.category)?.title.toLowerCase()}
                  </small>
                </span>
                <span aria-hidden="true">→</span>
              </button>
            </li>
          ))}
          {!results.length && (
            <li className="empty-result">no lessons found</li>
          )}
        </ul>
        <footer>
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> navigate
          </span>
          <span>
            <kbd>enter</kbd> open
          </span>
          <span>
            <kbd>esc</kbd> close
          </span>
        </footer>
      </section>
    </div>
  )
}
