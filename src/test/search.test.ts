import { describe, expect, it } from 'vitest'
import { searchLessons } from '../curriculum/search'
describe('lesson search', () => {
  it('finds relevant titles', () =>
    expect(searchLessons('backprop').map((x) => x.id)).toContain(
      'backpropagation',
    ))
})
