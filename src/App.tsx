import './App.css'

function App() {
  return (
    <main className="landing-shell">
      <section className="landing">
        <header className="landing-header">
          <p className="brand">
            <span className="brand-icon" aria-hidden="true">
              ▣
            </span>
            AdaBoards
          </p>
          <div className="header-actions">
            <button type="button" className="btn">
              Sign in
            </button>
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
            <button type="button" className="btn btn-large">
              Get started for free
            </button>
          </div>
        </section>

        <section className="features-section">
          <h2>Simple yet powerful features</h2>
          <div className="features">
            <article>
              <p className="feature-icon" aria-hidden="true">
                ▣
              </p>
              <h3>Flexible boards</h3>
              <p>Organize tasks into customizable boards and columns to fit your workflow</p>
            </article>
            <article>
              <p className="feature-icon" aria-hidden="true">
                ✓
              </p>
              <h3>Check sh*t done</h3>
              <p>Keep track of your progress and iterate through your tasks flowlessly</p>
            </article>
            <article>
              <p className="feature-icon" aria-hidden="true">
                ▣
              </p>
              <h3>Team collaboration</h3>
              <p>Invite team members to boards and collaborate on projects together</p>
            </article>
          </div>
        </section>

        <footer className="landing-footer">© 2025 AdaBoards</footer>
      </section>
    </main>
  )
}

export default App
