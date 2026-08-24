import { describe, expect, it } from 'vitest'
import { searchCurriculum, searchLessons } from '../curriculum/search'
describe('lesson search', () => {
  it('finds relevant titles', () =>
    expect(searchLessons('backprop').map((x) => x.id)).toContain(
      'backpropagation',
    ))
})
describe('topic and chapter search', () => {
  it('finds dot product', () =>
    expect(searchCurriculum('dot product')[0]).toMatchObject({
      title: 'Dot product',
      context: 'Vectors',
    }))
  it('finds cosine similarity', () =>
    expect(searchCurriculum('cosine')[0]).toMatchObject({
      title: 'Cosine similarity',
      context: 'Vectors',
    }))
})
