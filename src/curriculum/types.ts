export type Difficulty = 'beginner' | 'intermediate' | 'advanced'
export type LessonStatus = 'available' | 'planned'

export interface Lesson {
  id: string
  number: number
  title: string
  description: string
  category: string
  difficulty: Difficulty
  prerequisites: string[]
  status: LessonStatus
}

export interface Category {
  id: string
  title: string
}
