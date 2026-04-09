import { apiClient, ensureApiData } from './client'
import type { AuthLoginResponse, AuthRegisterResponse } from './types'

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

export async function getCurrentUserName(token: string): Promise<string | null> {
  try {
    const response = await fetch('https://adaboards-api.vercel.app/api/user/', {
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
