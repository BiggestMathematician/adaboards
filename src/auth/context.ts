import { createContext } from 'react'
import type { AuthState } from './storage'

export type SignInPayload = {
  token: string
  refreshToken: string
  userName: string
}

export type AuthContextValue = AuthState & {
  isAuthenticated: boolean
  signIn: (payload: SignInPayload) => void
  signOut: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
