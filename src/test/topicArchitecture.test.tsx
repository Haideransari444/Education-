import { fireEvent, render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { ChapterPage } from '../pages/ChapterPage'
import { TopicOverviewPage } from '../pages/TopicOverviewPage'

const renderPath = (path: string) =>
  render(
    <RouterProvider
      router={createMemoryRouter(
        [
          { path: '/learn/:topicId', element: <TopicOverviewPage /> },
          { path: '/learn/:topicId/:chapterId', element: <ChapterPage /> },
        ],
        { initialEntries: [path] },
      )}
    />,
  )
describe('deep topic UI', () => {
  it('renders the vectors overview and all chapters', () => {
    renderPath('/learn/vectors')
    expect(screen.getByRole('heading', { name: 'vectors' })).toBeInTheDocument()
    expect(screen.getAllByText(/planned/).length).toBeGreaterThanOrEqual(16)
    expect(screen.getByText('26 chapters')).toBeInTheDocument()
  })
  it('renders an available chapter with previous/next navigation', () => {
    renderPath('/learn/vectors/dot-product')
    expect(
      screen.getByRole('heading', { name: 'dot product', level: 1 }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /norms and distance/ }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /angles between vectors/ }),
    ).toBeInTheDocument()
  })
  it('renders an honest planned state', () => {
    renderPath('/learn/vectors/vector-projection')
    expect(
      screen.getByText(/educational content has not been written/i),
    ).toBeInTheDocument()
  })
  it('toggles explicit chapter completion', () => {
    renderPath('/learn/vectors/scalars-and-vectors')
    const button = screen.getByRole('button', { name: 'mark chapter complete' })
    fireEvent.click(button)
    expect(
      screen.getByRole('button', { name: 'completed ✓' }),
    ).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'completed ✓' }))
    expect(
      screen.getByRole('button', { name: 'mark chapter complete' }),
    ).toBeInTheDocument()
  })
})
