export const AUTH_TOKEN_KEY = 'adaboards-auth-token'
export const AUTH_REFRESH_TOKEN_KEY = 'adaboards-auth-refresh-token'
export const AUTH_USER_NAME_KEY = 'adaboards-user-name'

export type AuthState = {
  token: string | null
  refreshToken: string | null
  userName: string | null
}

export function readStoredAuth(): AuthState {
  return {
    token: window.localStorage.getItem(AUTH_TOKEN_KEY),
    refreshToken: window.localStorage.getItem(AUTH_REFRESH_TOKEN_KEY),
    userName: window.localStorage.getItem(AUTH_USER_NAME_KEY),
  }
}

export function persistAuth(state: AuthState) {
  if (state.token) window.localStorage.setItem(AUTH_TOKEN_KEY, state.token)
  else window.localStorage.removeItem(AUTH_TOKEN_KEY)

  if (state.refreshToken) window.localStorage.setItem(AUTH_REFRESH_TOKEN_KEY, state.refreshToken)
  else window.localStorage.removeItem(AUTH_REFRESH_TOKEN_KEY)

  if (state.userName) window.localStorage.setItem(AUTH_USER_NAME_KEY, state.userName)
  else window.localStorage.removeItem(AUTH_USER_NAME_KEY)
}
