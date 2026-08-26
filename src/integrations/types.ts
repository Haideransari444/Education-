import type { ComponentType } from 'react'
import type { UpstreamSource } from '../visualization/types/upstream'

export interface IntegrationDefinition {
  id: string
  name: string
  upstream: UpstreamSource
  topics: string[]
  entryTopic: string
  entryChapter: string
  lazyEntry: () => Promise<{ default: ComponentType }>
}
