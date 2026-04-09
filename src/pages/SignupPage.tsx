import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BoardIcon } from '../components/icons/BoardIcon'
import { useRegister } from '../hooks/useAuth'

export function SignupPage() {
  const navigate = useNavigate()
  const registerMutation = useRegister()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formError, setFormError] = useState<string | null>(null)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)

    if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
      setFormError('All fields are required.')
      return
    }

    registerMutation.mutate(
      {
        name: name.trim(),
        email: email.trim(),
        password,
      },
      {
        onSuccess: () => {
          navigate('/login')
        },
        onError: () => {
          setFormError('Could not create account. Please try again.')
        },
      },
    )
  }

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

        <form className="auth-card" onSubmit={onSubmit}>
          <h1>Create an account</h1>
          <p className="auth-subtitle">Start organizing your projects today</p>

          <label htmlFor="signup-fullname">Fullname</label>
          <input
            id="signup-fullname"
            type="text"
            placeholder="Ada Lovelace"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={formError ? 'input-error' : undefined}
          />

          <label htmlFor="signup-email">Email</label>
          <input
            id="signup-email"
            type="email"
            placeholder="ada@adatechschool.fr"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={formError ? 'input-error' : undefined}
          />

          <label htmlFor="signup-password">Password</label>
          <input
            id="signup-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={formError ? 'input-error' : undefined}
          />

          {formError ? <p className="field-error">{formError}</p> : null}

          <button className="btn btn-large" type="submit" disabled={registerMutation.isPending}>
            {registerMutation.isPending ? 'Creating account...' : 'Create my account'}
          </button>
          <p className="auth-footer-link">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </section>
    </main>
  )
}
