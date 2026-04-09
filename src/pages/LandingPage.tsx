import { Link } from 'react-router-dom'
import { BoardIcon } from '../components/icons/BoardIcon'
import { CheckMarkIcon } from '../components/icons/CheckMarkIcon'

export function LandingPage() {
  return (
    <main className="landing-shell">
      <section className="landing">
        <header className="landing-header">
          <p className="brand">
            <span className="brand-icon" aria-hidden="true">
              <BoardIcon size={18} color="var(--color-light)" />
            </span>
            AdaBoards
          </p>
          <div className="header-actions">
            <Link className="btn" to="/login">
              Sign in
            </Link>
          </div>
        </header>

        <section className="hero">
          <h1>
            Organize your work <span className="hero-accent">seamlessly</span>
          </h1>
          <p className="description">
            A simple, beautiful way to manage tasks and projects with your team
          </p>
          <div className="hero-actions">
            <Link className="btn btn-large" to="/signup">
              Get started for free
            </Link>
          </div>
        </section>

        <section className="features-section">
          <h2>Simple yet powerful features</h2>
          <div className="features">
            <article>
              <p className="feature-icon" aria-hidden="true">
                <BoardIcon size={42} color="var(--clr-primary)" />
              </p>
              <h2 className="feature-title">Flexible boards</h2>
              <p>Organize tasks into customizable boards and columns to fit your workflow</p>
            </article>
            <article>
              <p className="feature-icon" aria-hidden="true">
                <CheckMarkIcon size={42} color="var(--clr-primary)" />
              </p>
              <h2 className="feature-title">Check sh*t done</h2>
              <p>Keep track of your progress and iterate through your tasks flowlessly</p>
            </article>
            <article>
              <p className="feature-icon" aria-hidden="true">
                <BoardIcon size={42} color="var(--clr-primary)" />
              </p>
              <h2 className="feature-title">Team collaboration</h2>
              <p>Invite team members to boards and collaborate on projects together</p>
            </article>
          </div>
        </section>

        <footer className="landing-footer">© 2025 AdaBoards</footer>
      </section>
    </main>
  )
}
