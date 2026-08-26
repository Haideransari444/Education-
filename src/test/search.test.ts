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
  it('finds integrated concepts and common acronyms', () => {
    expect(searchCurriculum('qkv')[0]).toMatchObject({
      title: 'Transformer',
    })
    expect(
      searchCurriculum('denoising').map((result) => result.title),
    ).toContain('Forward noise and reverse denoising')
    expect(
      searchCurriculum('feature map').map((result) => result.context),
    ).toContain('Convolutional Neural Networks')
  })
})
