import { describe, expect, it } from 'vitest'
import {
  getCompletedChapters,
  getTopicPercentage,
  isChapterComplete,
  setChapterComplete,
} from '../storage/topicProgress'
describe('topic progress', () => {
  it('completes and uncompletes chapters', () => {
    setChapterComplete('vectors', 'dot-product', true)
    expect(isChapterComplete('vectors', 'dot-product')).toBe(true)
    setChapterComplete('vectors', 'dot-product', false)
    expect(isChapterComplete('vectors', 'dot-product')).toBe(false)
  })
  it('calculates topic percentage', () => {
    setChapterComplete('vectors', 'one', true)
    setChapterComplete('vectors', 'two', true)
    expect(getTopicPercentage('vectors', 4)).toBe(50)
  })
  it('handles malformed and old storage safely', () => {
    localStorage.setItem('ai-core:topic-progress', '{bad')
    localStorage.setItem('ai-core:completed-lessons', '["vectors"]')
    expect(getCompletedChapters('vectors')).toEqual([])
  })
})
