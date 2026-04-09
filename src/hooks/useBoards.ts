import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createBoard, deleteBoard, getBoards } from '../api/boards'
import type { Board } from '../api/types'

export function useBoards() {
  return useQuery({
    queryKey: ['boards'],
    queryFn: getBoards,
  })
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
