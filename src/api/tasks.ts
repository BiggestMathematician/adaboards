import { apiClient, ensureApiData } from './client'
import type { Column, Task } from './types'

export async function getTasks(boardId: string) {
  const { data, error } = await apiClient.GET('/boards/{boardId}/tasks', {
    params: { path: { boardId } },
  })
  return ensureApiData<Task[]>(data, error)
}

type CreateTaskPayload = {
  boardId: string
  title: string
  description?: string
  column: Column
}

export async function createTask(payload: CreateTaskPayload) {
  const { boardId, ...body } = payload
  const { data, error } = await apiClient.POST('/boards/{boardId}/tasks', {
    params: { path: { boardId } },
    body,
  })
  return ensureApiData<Task>(data, error)
}

type UpdateTaskPayload = {
  boardId: string
  taskId: string
  title?: string
  description?: string
  column?: Column
}

export async function updateTask(payload: UpdateTaskPayload) {
  const { boardId, taskId, ...body } = payload
  const { data, error } = await apiClient.PATCH('/boards/{boardId}/tasks/{taskId}', {
    params: { path: { boardId, taskId } },
    body,
  })
  return ensureApiData<{ message: string }>(data, error)
}

export async function deleteTask(boardId: string, taskId: string) {
  const { data, error } = await apiClient.DELETE('/boards/{boardId}/tasks/{taskId}', {
    params: { path: { boardId, taskId } },
  })
  return ensureApiData<{ message: string }>(data, error)
}
