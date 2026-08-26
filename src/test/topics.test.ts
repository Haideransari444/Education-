import { describe, expect, it } from 'vitest'
import { topics, vectorChapters } from '../curriculum/topics'
describe('vectors topic registry', () => {
  it('registers 26 uniquely identified and numbered chapters', () => {
    expect(vectorChapters).toHaveLength(26)
    expect(new Set(vectorChapters.map((x) => x.id)).size).toBe(26)
    expect(new Set(vectorChapters.map((x) => x.number)).size).toBe(26)
  })
  it('registers ten available and sixteen planned chapters', () => {
    expect(vectorChapters.filter((x) => x.status === 'available')).toHaveLength(
      10,
    )
    expect(vectorChapters.filter((x) => x.status === 'planned')).toHaveLength(
      16,
    )
  })
  it('provides route-safe IDs and valid prerequisites', () => {
    const ids = new Set(vectorChapters.map((x) => x.id))
    expect(vectorChapters.every((x) => /^[a-z0-9-]+$/.test(x.id))).toBe(true)
    expect(
      vectorChapters
        .flatMap((x) => x.prerequisites ?? [])
        .every((id) => ids.has(id)),
    ).toBe(true)
  })
})

describe('integrated topic registry', () => {
  it('registers five additional unique topic IDs', () => {
    expect(topics).toHaveLength(6)
    expect(new Set(topics.map((topic) => topic.id)).size).toBe(6)
  })
  it('exposes exactly one available flagship in each integrated topic', () => {
    for (const topic of topics.filter((item) => item.id !== 'vectors'))
      expect(
        topic.chapters.filter((chapter) => chapter.status === 'available'),
      ).toHaveLength(1)
  })
})
