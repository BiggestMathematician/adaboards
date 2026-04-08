import { Link } from 'react-router-dom'
import { BoardIcon } from '../components/icons/BoardIcon'

export function SignupPage() {
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
          <h1>Create an account</h1>
          <p className="auth-subtitle">Start organizing your projects today</p>

          <label htmlFor="signup-fullname">Fullname</label>
          <input
            id="signup-fullname"
            type="text"
            placeholder="Ada Lovelace"
            className="input-error"
            aria-describedby="fullname-error"
          />
          <p id="fullname-error" className="field-error">
            This field is required
          </p>

          <label htmlFor="signup-email">Email</label>
          <input id="signup-email" type="email" placeholder="ada@adatechschool.fr" />

          <label htmlFor="signup-password">Password</label>
          <input id="signup-password" type="password" />

          <button className="btn btn-large" type="submit">
            Create my account
          </button>
          <p className="auth-footer-link">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </section>
    </main>
  )
}
