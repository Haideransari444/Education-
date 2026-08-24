import { lessons } from './curriculum'

export function searchLessons(query: string) {
  const normalized = query.trim().toLocaleLowerCase()
  if (!normalized) return lessons
  return lessons.filter((lesson) =>
    `${lesson.title} ${lesson.description} ${lesson.category}`
      .toLocaleLowerCase()
      .includes(normalized),
  )
}
