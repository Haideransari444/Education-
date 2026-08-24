import { Link } from 'react-router-dom'
import { CategorySection } from '../components/lesson/CategorySection'
import { categories } from '../curriculum/curriculum'

export function HomePage() {
  return (
    <div className="page home-page">
      <section className="intro">
        <p className="eyebrow">the visual foundation of ai</p>
        <h1>
          understand artificial intelligence
          <br />
          by seeing it work.
        </h1>
        <p className="lede">
          explore the systems, mathematics and
          <br className="desktop-break" /> algorithms behind modern ai.
        </p>
        <Link className="start-link" to="/learn/vectors">
          start learning <span aria-hidden="true">→</span>
        </Link>
      </section>
      <div className="curriculum-grid">
        {categories.slice(0, 4).map((category) => (
          <CategorySection key={category.id} category={category} />
        ))}
      </div>
    </div>
  )
}
