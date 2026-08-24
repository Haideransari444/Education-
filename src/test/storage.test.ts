import { describe, expect, it } from 'vitest'
import { LocalProgressStorage } from '../storage/progress'
describe('local progress', () => {
  it('stores and reads completion', () => {
    const storage = new LocalProgressStorage()
    storage.markLessonComplete('vectors')
    expect(storage.isLessonComplete('vectors')).toBe(true)
    expect(storage.getCompletedLessons()).toEqual(['vectors'])
  })
  it('fails safely on malformed data', () => {
    localStorage.setItem('ai-core:completed-lessons', '{nope')
    expect(new LocalProgressStorage().getCompletedLessons()).toEqual([])
  })
})
