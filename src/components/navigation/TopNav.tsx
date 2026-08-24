import { Link, NavLink } from 'react-router-dom'

interface TopNavProps {
  onSearch: () => void
  quiet?: boolean
}

export function TopNav({ onSearch, quiet = false }: TopNavProps) {
  return (
    <header className={quiet ? 'top-nav top-nav--quiet' : 'top-nav'}>
      <Link className="brand" to="/" aria-label="AI Core home">
        <span aria-hidden="true">ai</span> core
      </Link>
      <nav aria-label="Primary navigation">
        <NavLink to="/">learn</NavLink>
        <NavLink to="/explore">explore</NavLink>
        <NavLink to="/playground">playground</NavLink>
      </nav>
      <div className="nav-actions">
        <button
          className="search-trigger"
          onClick={onSearch}
          aria-label="Search lessons"
        >
          search <kbd>⌘K</kbd>
        </button>
        <a
          href="https://github.com/Haideransari444/Education-"
          target="_blank"
          rel="noreferrer"
        >
          github
        </a>
      </div>
    </header>
  )
}
