import { createHashRouter } from 'react-router-dom'
import { AppShell } from './layout/AppShell'
import { ExplorePage } from '../pages/ExplorePage'
import { HomePage } from '../pages/HomePage'
import { LessonPage } from '../pages/LessonPage'
import { TopicOverviewPage } from '../pages/TopicOverviewPage'
import { ChapterPage } from '../pages/ChapterPage'
import { NotFoundPage } from '../pages/NotFoundPage'

export const router = createHashRouter([
  {
    element: <AppShell />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/explore', element: <ExplorePage /> },
      { path: '/playground', element: <ExplorePage playground /> },
      { path: '/learn/vectors', element: <TopicOverviewPage /> },
      { path: '/learn/:topicId/:chapterId', element: <ChapterPage /> },
      { path: '/learn/:lessonId', element: <LessonPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
