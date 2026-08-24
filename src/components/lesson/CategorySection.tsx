import { lessonsByCategory } from '../../curriculum/curriculum'
import type { Category } from '../../curriculum/types'
import { TopicRow } from './TopicRow'

export function CategorySection({ category }: { category: Category }) {
  const categoryLessons = lessonsByCategory(category.id)
  if (!categoryLessons.length) return null
  return (
    <section className="category-section">
      <h2>{category.title.toLowerCase()}</h2>
      <div>
        {categoryLessons.map((lesson) => (
          <TopicRow key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </section>
  )
}
