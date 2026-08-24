import { describe, expect, it } from 'vitest'
import { lessons } from '../curriculum/curriculum'
describe('curriculum registry', () => {
  it('has unique lesson IDs', () =>
    expect(new Set(lessons.map((x) => x.id)).size).toBe(lessons.length))
  it('has unique lesson numbers', () =>
    expect(new Set(lessons.map((x) => x.number)).size).toBe(lessons.length))
  it('only references valid prerequisites', () => {
    const ids = new Set(lessons.map((x) => x.id))
    expect(
      lessons.flatMap((x) => x.prerequisites).every((id) => ids.has(id)),
    ).toBe(true)
  })
})
