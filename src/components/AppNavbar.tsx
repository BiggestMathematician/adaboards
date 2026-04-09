import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { logoutRemote } from '../api/auth'
import { useAuth } from '../auth/useAuth'
import { BoardIcon } from './icons/BoardIcon'

type Props = {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

export function AppNavbar({ theme, onToggleTheme }: Props) {
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, signOut, token, refreshToken } = useAuth()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const isAppRoute = location.pathname === '/home' || location.pathname.startsWith('/boards/')

  if (!isAppRoute) {
    return null
  }

  async function onLogout() {
    const accessToken = token ?? ''
    const rt = refreshToken ?? ''
    setIsLoggingOut(true)
    try {
      await logoutRemote(accessToken, rt)
    } finally {
      signOut()
      navigate('/login')
      setIsLoggingOut(false)
    }
  }

  return (
    <header className="app-navbar">
      <p className="brand">
        <span className="brand-icon" aria-hidden="true">
          <BoardIcon size={18} color="var(--color-light)" />
        </span>
        AdaBoards
      </p>

      <div className="app-navbar-actions">
        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <span aria-hidden="true" className="theme-toggle-icon">
            {theme === 'dark' ? '☀️' : '🌙'}
          </span>
          <span className="sr-only">{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
        </button>

        {isAuthenticated ? (
          <button type="button" className="btn btn-ghost-light" onClick={onLogout} disabled={isLoggingOut}>
            {isLoggingOut ? 'Logging out...' : 'Log out'}
          </button>
        ) : (
          <Link to="/login" className="btn btn-ghost-light">
            Login
          </Link>
        )}
      </div>
    </header>
  )
}
