import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BoardIcon } from './icons/BoardIcon'

const AUTH_TOKEN_KEY = 'adaboards-auth-token'
const AUTH_REFRESH_TOKEN_KEY = 'adaboards-auth-refresh-token'
const AUTH_USER_NAME_KEY = 'adaboards-user-name'

type Props = {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

export function AppNavbar({ theme, onToggleTheme }: Props) {
  const location = useLocation()
  const navigate = useNavigate()
  const hasAuthToken = Boolean(window.localStorage.getItem(AUTH_TOKEN_KEY))
  const isAppRoute = location.pathname === '/home' || location.pathname.startsWith('/boards/')

  if (!isAppRoute) {
    return null
  }

  function onLogout() {
    window.localStorage.removeItem(AUTH_TOKEN_KEY)
    window.localStorage.removeItem(AUTH_REFRESH_TOKEN_KEY)
    window.localStorage.removeItem(AUTH_USER_NAME_KEY)
    navigate('/login')
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

        {hasAuthToken ? (
          <button type="button" className="btn btn-ghost-light" onClick={onLogout}>
            Log out
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
