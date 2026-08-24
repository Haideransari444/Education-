import { Link } from 'react-router-dom'
export function NotFoundPage() {
  return (
    <div className="page simple-page">
      <p className="eyebrow">404</p>
      <h1>nothing here.</h1>
      <p>This path is outside the current curriculum.</p>
      <Link className="start-link" to="/">
        return home →
      </Link>
    </div>
  )
}
