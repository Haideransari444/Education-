import { lessons } from './curriculum'
import { topics } from './topics'

export function searchLessons(query: string) {
  const normalized = query.trim().toLocaleLowerCase()
  if (!normalized) return lessons
  return lessons.filter((lesson) =>
    `${lesson.title} ${lesson.description} ${lesson.category}`
      .toLocaleLowerCase()
      .includes(normalized),
  )
}

export interface CurriculumSearchResult {
  id: string
  title: string
  context: string
  href: string
  type: 'topic' | 'chapter'
}

export function searchCurriculum(query: string): CurriculumSearchResult[] {
  const normalized = query.trim().toLocaleLowerCase()
  const results: CurriculumSearchResult[] = []
  for (const topic of topics) {
    if (
      !normalized ||
      `${topic.title} ${topic.description}`
        .toLocaleLowerCase()
        .includes(normalized)
    ) {
      results.push({
        id: topic.id,
        title: topic.title,
        context: topic.category,
        href: `/learn/${topic.id}`,
        type: 'topic',
      })
    }
    for (const chapter of topic.chapters) {
      if (
        !normalized ||
        `${chapter.title} ${chapter.description}`
          .toLocaleLowerCase()
          .includes(normalized)
      ) {
        results.push({
          id: `${topic.id}-${chapter.id}`,
          title: chapter.title,
          context: topic.title,
          href: `/learn/${topic.id}/${chapter.id}`,
          type: 'chapter',
        })
      }
    }
  }
  return results
}
