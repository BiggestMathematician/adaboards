import { Link } from 'react-router-dom'
import { BoardIcon } from '../components/icons/BoardIcon'

export function LoginPage() {
  return (
    <main className="auth-shell">
      <section className="auth-page">
        <header className="auth-header">
        <p className="brand">
            <span className="brand-icon" aria-hidden="true">
              <BoardIcon size={18} color="var(--color-light)" />
            </span>
            AdaBoards
          </p>
        </header>

        <form className="auth-card" onSubmit={(event) => event.preventDefault()}>
          <h1>Welcome back</h1>
          <p className="auth-subtitle">Sign in to continue to your boards</p>

          <label htmlFor="login-email">Email *</label>
          <input id="login-email" type="email" placeholder="ada@adatechschool.fr" />

          <label htmlFor="login-password">Password *</label>
          <input id="login-password" type="password" />

          <button className="btn btn-large" type="submit">
            Sign in
          </button>
          <p className="auth-footer-link">
            No account yet? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </section>
    </main>
  )
}
