import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { CommandPalette } from '../../components/navigation/CommandPalette'
import { TopNav } from '../../components/navigation/TopNav'
import { useCommandPalette } from '../../components/navigation/useCommandPalette'

export function AppShell() {
  const [searchOpen, setSearchOpen] = useState(false)
  const { pathname } = useLocation()
  useCommandPalette(setSearchOpen)

  return (
    <div className={pathname.startsWith('/learn/') ? 'app app--focus' : 'app'}>
      <TopNav
        onSearch={() => setSearchOpen(true)}
        quiet={pathname.startsWith('/learn/')}
      />
      <aside
        className="contributor-callout"
        aria-label="Contributor announcement"
      >
        <span>looking for</span>
        <strong>open-source contributors</strong>
        <a
          href="https://github.com/Haideransari444/Education-"
          target="_blank"
          rel="noreferrer"
        >
          contribute on github <span aria-hidden="true">→</span>
        </a>
      </aside>
      <main id="main-content">
        <Outlet />
      </main>
      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}
