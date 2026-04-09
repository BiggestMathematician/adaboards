import { apiClient, ensureApiData } from './client'
import type { Board } from './types'

export async function getBoards() {
  const { data, error } = await apiClient.GET('/boards')
  return ensureApiData<Board[]>(data, error)
}

export async function createBoard(name: string) {
  const { data, error } = await apiClient.POST('/boards', {
    body: { name },
  })
  return ensureApiData<Board>(data, error)
}

export async function deleteBoard(boardId: string) {
  const { data, error } = await apiClient.DELETE('/boards/{boardId}/', {
    params: { path: { boardId } },
  })
  return ensureApiData<{ message: string }>(data, error)
}
