import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { createBoard, deleteBoard, getBoards } from '../api/boards'
import type { Board } from '../api/types'

const BOARDS_STORAGE_KEY = 'adaboards-boards-cache'

function loadBoardsFromStorage(): Board[] {
  try {
    const raw = window.localStorage.getItem(BOARDS_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []

    return parsed.filter(
      (board): board is Board =>
        typeof board === 'object' &&
        board !== null &&
        typeof (board as Board).id === 'string' &&
        typeof (board as Board).name === 'string',
    )
  } catch {
    return []
  }
}

function saveBoardsToStorage(boards: Board[]): void {
  try {
    window.localStorage.setItem(BOARDS_STORAGE_KEY, JSON.stringify(boards))
  } catch {
    // Ignore write failures (private mode/quota).
  }
}

export function useBoards() {
  const query = useQuery({
    queryKey: ['boards'],
    queryFn: getBoards,
    initialData: loadBoardsFromStorage,
  })

  useEffect(() => {
    if (query.data) {
      saveBoardsToStorage(query.data)
    }
  }, [query.data])

  return query
}

export function useCreateBoard() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createBoard,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['boards'] })
    },
  })
}

export function useDeleteBoard() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteBoard,
    onMutate: async (boardId: string) => {
      await queryClient.cancelQueries({ queryKey: ['boards'] })
      const previousBoards = queryClient.getQueryData<Board[]>(['boards'])

      queryClient.setQueryData<Board[]>(['boards'], (current = []) =>
        current.filter((board) => board.id !== boardId),
      )

      return { previousBoards }
    },
    onError: (_error, _variables, context) => {
      if (context?.previousBoards) {
        queryClient.setQueryData(['boards'], context.previousBoards)
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['boards'] })
    },
  })
}
