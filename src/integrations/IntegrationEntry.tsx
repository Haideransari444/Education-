import {
  lazy,
  Suspense,
  type ComponentType,
  type LazyExoticComponent,
} from 'react'
import { getIntegrationForChapter } from './registry'
import { IntegrationErrorBoundary } from './IntegrationErrorBoundary'

const entries: Record<string, LazyExoticComponent<ComponentType>> = {
  'tensorflow-playground': lazy(() => import('./tensorflow-playground')),
  'cnn-explainer': lazy(() => import('./cnn-explainer')),
  ganlab: lazy(() => import('./ganlab')),
  'transformer-explainer': lazy(() => import('./transformer-explainer')),
  'diffusion-explainer': lazy(() => import('./diffusion-explainer')),
}

export function IntegrationEntry({
  topicId,
  chapterId,
}: {
  topicId: string
  chapterId: string
}) {
  const definition = getIntegrationForChapter(topicId, chapterId)
  const Entry = definition ? entries[definition.id] : null
  if (!Entry) return null
  return (
    <IntegrationErrorBoundary>
      <Suspense
        fallback={<p className="visualizer-loading">loading visualizer…</p>}
      >
        <Entry />
      </Suspense>
    </IntegrationErrorBoundary>
  )
}
