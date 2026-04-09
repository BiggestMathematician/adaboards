import { useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { AuthContext } from './context'
import type { SignInPayload } from './context'
import { persistAuth, readStoredAuth } from './storage'

type Props = {
  children: ReactNode
}

export function AuthProvider({ children }: Props) {
  const [state, setState] = useState(() => readStoredAuth())

  const signIn = useCallback((payload: SignInPayload) => {
    const next = {
      token: payload.token,
      refreshToken: payload.refreshToken,
      userName: payload.userName,
    }
    persistAuth(next)
    setState(next)
  }, [])

  const signOut = useCallback(() => {
    const next = { token: null, refreshToken: null, userName: null }
    persistAuth(next)
    setState(next)
  }, [])

  const value = useMemo(
    () => ({
      ...state,
      isAuthenticated: Boolean(state.token),
      signIn,
      signOut,
    }),
    [state, signIn, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
