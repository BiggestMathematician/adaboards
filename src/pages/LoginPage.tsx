import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getCurrentUserName } from '../api/auth'
import { BoardIcon } from '../components/icons/BoardIcon'
import { useLogin } from '../hooks/useAuth'

const AUTH_TOKEN_KEY = 'adaboards-auth-token'
const AUTH_REFRESH_TOKEN_KEY = 'adaboards-auth-refresh-token'
const AUTH_USER_NAME_KEY = 'adaboards-user-name'

export function LoginPage() {
  const navigate = useNavigate()
  const loginMutation = useLogin()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formError, setFormError] = useState<string | null>(null)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)

    if (email.trim() === '' || password.trim() === '') {
      setFormError('Email and password are required.')
      return
    }

    loginMutation.mutate(
      { email: email.trim(), password },
      {
        onSuccess: async (authData) => {
          window.localStorage.setItem(AUTH_TOKEN_KEY, authData.token)
          window.localStorage.setItem(AUTH_REFRESH_TOKEN_KEY, authData.refresh_token)

          const apiUserName = await getCurrentUserName(authData.token)
          const fallbackName = email.trim().split('@')[0] || 'User'
          window.localStorage.setItem(AUTH_USER_NAME_KEY, apiUserName ?? fallbackName)

          navigate('/home')
        },
        onError: () => {
          setFormError('Invalid credentials. Please try again.')
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
          <h1>Welcome back</h1>
          <p className="auth-subtitle">Sign in to continue to your boards</p>

          <label htmlFor="login-email">Email *</label>
          <input
            id="login-email"
            type="email"
            placeholder="ada@adatechschool.fr"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={formError ? 'input-error' : undefined}
          />

          <label htmlFor="login-password">Password *</label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={formError ? 'input-error' : undefined}
          />

          {formError ? <p className="field-error">{formError}</p> : null}

          <button className="btn btn-large" type="submit" disabled={loginMutation.isPending}>
            {loginMutation.isPending ? 'Signing in...' : 'Sign in'}
          </button>
          <p className="auth-footer-link">
            No account yet? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </section>
    </main>
  )
}
