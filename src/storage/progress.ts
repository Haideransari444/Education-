export interface ProgressStorage {
  getCompletedLessons(): string[]
  markLessonComplete(id: string): void
  isLessonComplete(id: string): boolean
}

const KEY = 'ai-core:completed-lessons'

export class LocalProgressStorage implements ProgressStorage {
  getCompletedLessons() {
    try {
      const value: unknown = JSON.parse(localStorage.getItem(KEY) ?? '[]')
      return Array.isArray(value)
        ? value.filter((id): id is string => typeof id === 'string')
        : []
    } catch {
      return []
    }
  }
  markLessonComplete(id: string) {
    localStorage.setItem(
      KEY,
      JSON.stringify([...new Set([...this.getCompletedLessons(), id])]),
    )
  }
  isLessonComplete(id: string) {
    return this.getCompletedLessons().includes(id)
  }
}

export const progressStorage = new LocalProgressStorage()
