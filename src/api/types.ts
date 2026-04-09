export type Column = 'todo' | 'doing' | 'done'

export type Board = {
  id: string
  name: string
  updated_at?: string
}

export type Task = {
  id: string
  title: string
  description?: string
  column: Column
}

export type AuthLoginResponse = {
  token: string
  refresh_token: string
}

export type AuthRegisterResponse = {
  id: string
  email: string
  name: string
}

type JsonBody<T> = {
  content: {
    'application/json': T
  }
}

export interface ApiPaths {
  '/auth/login': {
    post: {
      requestBody: JsonBody<{
        email: string
        password: string
      }>
      responses: {
        200: JsonBody<AuthLoginResponse>
      }
    }
  }
  '/auth/register': {
    post: {
      requestBody: JsonBody<{
        email: string
        password: string
        name: string
      }>
      responses: {
        201: JsonBody<AuthRegisterResponse>
      }
    }
  }
  '/boards': {
    get: {
      responses: {
        200: JsonBody<Board[]>
      }
    }
    post: {
      requestBody: JsonBody<{ name: string }>
      responses: {
        201: JsonBody<Board>
      }
    }
  }
  '/boards/{boardId}/': {
    delete: {
      parameters: {
        path: { boardId: string }
      }
      responses: {
        200: JsonBody<{ message: string }>
      }
    }
  }
  '/boards/{boardId}/tasks': {
    get: {
      parameters: {
        path: { boardId: string }
      }
      responses: {
        200: JsonBody<Task[]>
      }
    }
    post: {
      parameters: {
        path: { boardId: string }
      }
      requestBody: JsonBody<{
        title: string
        description?: string
        column: Column
      }>
      responses: {
        201: JsonBody<Task>
      }
    }
  }
  '/boards/{boardId}/tasks/{taskId}': {
    patch: {
      parameters: {
        path: { boardId: string; taskId: string }
      }
      requestBody: JsonBody<{
        title?: string
        description?: string
        column?: Column
      }>
      responses: {
        200: JsonBody<{ message: string }>
      }
    }
    delete: {
      parameters: {
        path: { boardId: string; taskId: string }
      }
      responses: {
        200: JsonBody<{ message: string }>
      }
    }
  }
}
