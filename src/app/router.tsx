import { createHashRouter } from 'react-router-dom'
import { AppShell } from './layout/AppShell'
import { ExplorePage } from '../pages/ExplorePage'
import { HomePage } from '../pages/HomePage'
import { LessonPage } from '../pages/LessonPage'
import { NotFoundPage } from '../pages/NotFoundPage'

export const router = createHashRouter([
  {
    element: <AppShell />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/explore', element: <ExplorePage /> },
      { path: '/playground', element: <ExplorePage playground /> },
      { path: '/learn/:lessonId', element: <LessonPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
