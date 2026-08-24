import { fireEvent, render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppShell } from '../app/layout/AppShell'
import { ExplorePage } from '../pages/ExplorePage'
import { HomePage } from '../pages/HomePage'
import { LessonPage } from '../pages/LessonPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { TopicOverviewPage } from '../pages/TopicOverviewPage'

const renderRoute = (path: string) =>
  render(
    <RouterProvider
      router={createMemoryRouter(
        [
          {
            element: <AppShell />,
            children: [
              { path: '/', element: <HomePage /> },
              { path: '/explore', element: <ExplorePage /> },
              { path: '/learn/vectors', element: <TopicOverviewPage /> },
              { path: '/learn/:lessonId', element: <LessonPage /> },
              { path: '*', element: <NotFoundPage /> },
            ],
          },
        ],
        { initialEntries: [path] },
      )}
    />,
  )
describe('routing', () => {
  it('renders the homepage', () => {
    renderRoute('/')
    expect(
      screen.getByRole('heading', {
        name: /understand artificial intelligence/i,
      }),
    ).toBeInTheDocument()
  })
  it('renders explore', () => {
    renderRoute('/explore')
    expect(screen.getByRole('heading', { name: 'explore' })).toBeInTheDocument()
  })
  it('renders a known lesson', () => {
    renderRoute('/learn/vectors')
    expect(screen.getByRole('heading', { name: 'vectors' })).toBeInTheDocument()
    expect(screen.getByText('26 chapters')).toBeInTheDocument()
  })
  it('renders 404 for unknown routes', () => {
    renderRoute('/missing')
    expect(screen.getByText('404')).toBeInTheDocument()
  })
  it('supports command palette keyboard navigation', () => {
    renderRoute('/')
    fireEvent.keyDown(document, { key: 'k', ctrlKey: true })
    const input = screen.getByRole('combobox')
    fireEvent.change(input, { target: { value: 'vector' } })
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    fireEvent.keyDown(input, { key: 'ArrowUp' })
    expect(
      screen.getByRole('option', { name: /^vectorsfoundations$/i }),
    ).toBeInTheDocument()
  })
})
