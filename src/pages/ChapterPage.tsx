import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getChapter, getTopic } from '../curriculum/topics'
import { ChapterContent } from '../lessons/foundations/vectors/ChapterContent'
import { isChapterComplete, setChapterComplete } from '../storage/topicProgress'
import { NotFoundPage } from './NotFoundPage'

export function ChapterPage() {
  const { topicId = '', chapterId = '' } = useParams()
  const topic = getTopic(topicId)
  const chapter = getChapter(topicId, chapterId)
  const [complete, setComplete] = useState(() =>
    isChapterComplete(topicId, chapterId),
  )
  if (!topic || !chapter) return <NotFoundPage />
  const index = topic.chapters.indexOf(chapter)
  const previous = topic.chapters[index - 1]
  const next = topic.chapters[index + 1]
  if (chapter.status === 'planned')
    return (
      <article className="chapter-page planned-chapter">
        <header>
          <Link className="chapter-back" to={`/learn/${topic.id}`}>
            ← all vectors chapters
          </Link>
          <p className="eyebrow">
            vectors / {String(chapter.number).padStart(2, '0')}
          </p>
          <h1>{chapter.title.toLowerCase()}</h1>
          <p>{chapter.description}</p>
          <span>planned</span>
        </header>
        <p>
          This chapter is registered in the learning path but its educational
          content has not been written yet.
        </p>
        <ChapterNavigation topicId={topic.id} previous={previous} next={next} />
      </article>
    )
  return (
    <article className="chapter-page">
      <header>
        <Link className="chapter-back" to={`/learn/${topic.id}`}>
          ← all vectors chapters
        </Link>
        <p className="eyebrow">
          vectors / {String(chapter.number).padStart(2, '0')}
        </p>
        <h1>{chapter.title.toLowerCase()}</h1>
        <p>{chapter.description}</p>
        <span>
          {chapter.difficulty} · ~{chapter.estimatedMinutes} min
        </span>
      </header>
      <ChapterContent chapterId={chapter.id} />
      <footer className="chapter-footer">
        <button
          className={complete ? 'complete-button complete' : 'complete-button'}
          onClick={() => {
            const nextValue = !complete
            setChapterComplete(topic.id, chapter.id, nextValue)
            setComplete(nextValue)
          }}
        >
          {complete ? 'completed ✓' : 'mark chapter complete'}
        </button>
        <ChapterNavigation topicId={topic.id} previous={previous} next={next} />
      </footer>
    </article>
  )
}
function ChapterNavigation({
  topicId,
  previous,
  next,
}: {
  topicId: string
  previous?: { id: string; title: string }
  next?: { id: string; title: string }
}) {
  return (
    <nav className="chapter-navigation" aria-label="Chapter navigation">
      <span>
        {previous && (
          <Link to={`/learn/${topicId}/${previous.id}`}>
            ← {previous.title.toLowerCase()}
          </Link>
        )}
      </span>
      <Link to={`/learn/${topicId}`}>vectors</Link>
      <span>
        {next && (
          <Link to={`/learn/${topicId}/${next.id}`}>
            {next.title.toLowerCase()} →
          </Link>
        )}
      </span>
    </nav>
  )
}
