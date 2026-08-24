import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getTopic } from '../curriculum/topics'
import {
  getCompletedChapters,
  getTopicPercentage,
} from '../storage/topicProgress'
import { NotFoundPage } from './NotFoundPage'

export function TopicOverviewPage() {
  const { topicId = '' } = useParams()
  const resolvedTopicId = topicId || 'vectors'
  const topic = getTopic(resolvedTopicId)
  const [completed] = useState<string[]>(() =>
    getCompletedChapters(resolvedTopicId),
  )
  if (!topic) return <NotFoundPage />
  return (
    <div className="topic-overview">
      <header>
        <p className="eyebrow">01 / foundations</p>
        <h1>{topic.title.toLowerCase()}</h1>
        <p>{topic.description}</p>
        <div className="topic-meta-line">
          <span>{topic.chapters.length} chapters</span>
          <span>beginner → advanced</span>
        </div>
      </header>
      <section className="topic-progress" aria-label="Topic progress">
        <div>
          <span>progress</span>
          <b>
            {completed.length} / {topic.chapters.length} completed
          </b>
        </div>
        <div className="progress-track">
          <span
            style={{
              width: `${getTopicPercentage(topic.id, topic.chapters.length)}%`,
            }}
          />
        </div>
      </section>
      <section className="chapter-index">
        <h2>chapters</h2>
        {topic.chapters.map((chapter) => (
          <Link
            key={chapter.id}
            className={`chapter-row ${chapter.status}`}
            to={`/learn/${topic.id}/${chapter.id}`}
          >
            <span>{String(chapter.number).padStart(2, '0')}</span>
            <span>{chapter.title.toLowerCase()}</span>
            <span>
              {completed.includes(chapter.id)
                ? 'completed ✓'
                : chapter.status === 'planned'
                  ? 'planned'
                  : chapter.difficulty}
            </span>
            <b aria-hidden="true">→</b>
          </Link>
        ))}
      </section>
    </div>
  )
}
