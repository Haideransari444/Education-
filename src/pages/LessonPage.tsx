import { Link, useParams } from 'react-router-dom'
import { getCategory, getLesson, lessons } from '../curriculum/curriculum'
import { VectorsLesson } from '../lessons/foundations/vectors/VectorsLesson'
import { NotFoundPage } from './NotFoundPage'

export function LessonPage() {
  const { lessonId = '' } = useParams()
  const lesson = getLesson(lessonId)
  if (!lesson) return <NotFoundPage />
  if (lesson.id === 'vectors')
    return (
      <article className="lesson-page">
        <VectorsLesson />
      </article>
    )
  const index = lessons.indexOf(lesson)
  const previous = lessons[index - 1]
  const next = lessons[index + 1]
  return (
    <article className="lesson-page">
      <header className="lesson-header">
        <p className="eyebrow">
          {String(lesson.number).padStart(2, '0')} /{' '}
          {getCategory(lesson.category)?.title.toLowerCase()}
        </p>
        <h1>{lesson.title.toLowerCase()}</h1>
        <p>{lesson.description}</p>
      </header>
      <section
        className="visual-placeholder"
        aria-label="Placeholder visualization"
      >
        <span>visualization</span>
        <p>an interactive lesson will occupy this space.</p>
      </section>
      <nav className="lesson-pagination" aria-label="Lesson pagination">
        <span>
          {previous && (
            <Link to={`/learn/${previous.id}`}>
              ← {previous.title.toLowerCase()}
            </Link>
          )}
        </span>
        <span>
          {next && (
            <Link to={`/learn/${next.id}`}>{next.title.toLowerCase()} →</Link>
          )}
        </span>
      </nav>
    </article>
  )
}
