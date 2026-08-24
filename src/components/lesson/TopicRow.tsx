import { Link } from 'react-router-dom'
import type { Lesson } from '../../curriculum/types'

export function TopicRow({ lesson }: { lesson: Lesson }) {
  return (
    <Link className="topic-row" to={`/learn/${lesson.id}`}>
      <span className="topic-number">
        {String(lesson.number).padStart(2, '0')}
      </span>
      <span className="topic-title">{lesson.title.toLowerCase()}</span>
      <span className="topic-meta">
        {lesson.difficulty} <b aria-hidden="true">→</b>
      </span>
    </Link>
  )
}
