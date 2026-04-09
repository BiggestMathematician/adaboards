import createClient from 'openapi-fetch'
import type { ApiPaths } from './types'

const API_BASE_URL = 'https://adaboards-api.vercel.app/api'

export const apiClient = createClient<ApiPaths>({
  baseUrl: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-No-Auth': 'true',
  },
})

export function ensureApiData<T>(data: T | undefined, error?: unknown): T {
  if (error || data === undefined) {
    throw new Error('Request failed')
  }
  return data
}
