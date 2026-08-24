import type { Difficulty, LessonStatus } from './types'

export interface ChapterDefinition {
  id: string
  number: number
  title: string
  description: string
  difficulty: Difficulty
  estimatedMinutes?: number
  status: LessonStatus
  prerequisites?: string[]
}

export interface TopicDefinition {
  id: string
  title: string
  description: string
  category: string
  prerequisites: string[]
  chapters: ChapterDefinition[]
  aiConnections?: string[]
}
