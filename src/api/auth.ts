import { apiClient, ensureApiData } from './client'
import type { AuthLoginResponse, AuthRegisterResponse } from './types'

const API_BASE_URL = 'https://adaboards-api.vercel.app/api'

type LoginInput = {
  email: string
  password: string
}

type RegisterInput = {
  email: string
  password: string
  name: string
}

export async function login(input: LoginInput): Promise<AuthLoginResponse> {
  const { data, error } = await apiClient.POST('/auth/login', {
    body: input,
  })

  return ensureApiData(data, error)
}

export async function register(input: RegisterInput): Promise<AuthRegisterResponse> {
  const { data, error } = await apiClient.POST('/auth/register', {
    body: input,
  })

  return ensureApiData(data, error)
}

/**
 * Calls POST /auth/logout with Bearer token (and refresh token in body when present).
 * Fails silently on network errors so the client can still clear local session.
 */
export async function logoutRemote(token: string, refreshToken: string): Promise<void> {
  if (!token) return

  try {
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    })
  } catch {
    // ignore — local sign-out still applies
  }
}

export async function getCurrentUserName(token: string): Promise<string | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/user/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) return null

    const payload = (await response.json()) as { name?: unknown }
    return typeof payload.name === 'string' && payload.name.trim() !== '' ? payload.name : null
  } catch {
    return null
  }
}
