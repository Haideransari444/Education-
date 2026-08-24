import { Link } from 'react-router-dom'
import { categories, lessonsByCategory } from '../curriculum/curriculum'

export function ExplorePage({ playground = false }: { playground?: boolean }) {
  if (playground)
    return (
      <div className="page simple-page">
        <p className="eyebrow">coming later</p>
        <h1>playground</h1>
        <p>The shared workspace for future AI experiments will live here.</p>
        <Link className="start-link" to="/explore">
          explore the curriculum →
        </Link>
      </div>
    )
  return (
    <div className="page explore-page">
      <header>
        <p className="eyebrow">the curriculum</p>
        <h1>explore</h1>
        <p>one connected path from mathematical foundations to modern ai.</p>
      </header>
      <div className="explore-list">
        {categories.map((category, index) => (
          <section key={category.id}>
            <div className="explore-category">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h2>{category.title.toLowerCase()}</h2>
            </div>
            <div className="explore-lessons">
              {lessonsByCategory(category.id).length ? (
                lessonsByCategory(category.id).map((lesson) => (
                  <Link key={lesson.id} to={`/learn/${lesson.id}`}>
                    {lesson.title.toLowerCase()}
                    <span>{lesson.status}</span>
                  </Link>
                ))
              ) : (
                <p>curriculum planned</p>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
