import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import {
  closestCorners,
  DndContext,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { AddIcon } from '../components/icons/AddIcon'
import { BinIcon } from '../components/icons/BinIcon'
import { PlayIcon } from '../components/icons/PlayIcon'
import type { Column, Task } from '../api/types'
import { useBoards } from '../hooks/useBoards'
import { useCreateTask, useDeleteTask, useTasks, useUpdateTask } from '../hooks/useTasks'

const boardColumns = [
  {
    key: 'todo',
    title: 'To Do',
    color: 'todo',
  },
  {
    key: 'doing',
    title: 'Doing',
    color: 'doing',
  },
  {
    key: 'done',
    title: 'Done',
    color: 'done',
  },
]

function SortableTaskCard({
  task,
  draftTitle,
  onDraftChange,
  onDelete,
  onMoveLeft,
  onMoveRight,
}: {
  task: Task
  draftTitle: string
  onDraftChange: (task: Task, value: string) => void
  onDelete: (taskId: string) => void
  onMoveLeft: (task: Task) => void
  onMoveRight: (task: Task) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={`kanban-card card-${task.column} ${isDragging ? 'is-dragging' : ''}`}
      {...attributes}
      {...listeners}
    >
      <div className="kanban-card-head">
        <input
          className="kanban-task-input"
          value={draftTitle}
          onChange={(event) => onDraftChange(task, event.target.value)}
          onPointerDown={(event) => event.stopPropagation()}
          aria-label="Task title"
        />
        <button
          type="button"
          className="mini-icon-btn"
          aria-label="Delete task"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={() => onDelete(task.id)}
        >
          <BinIcon size={12} color="var(--text-on-accent)" />
        </button>
      </div>

      <div className={`kanban-card-actions actions-${task.column}`}>
        {task.column !== 'todo' ? (
          <button
            type="button"
            className="mini-icon-btn"
            aria-label="Move task left"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => onMoveLeft(task)}
          >
            <PlayIcon
              size={14}
              color="var(--text-on-accent)"
              style={{ transform: 'rotate(180deg)' }}
            />
          </button>
        ) : null}
        {task.column !== 'done' ? (
          <button
            type="button"
            className="mini-icon-btn"
            aria-label="Move task right"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => onMoveRight(task)}
          >
            <PlayIcon size={14} color="var(--text-on-accent)" />
          </button>
        ) : null}
      </div>
    </article>
  )
}

function DroppableColumn({
  id,
  className,
  children,
}: {
  id: Column
  className: string
  children: ReactNode
}) {
  const { setNodeRef } = useDroppable({ id })
  return (
    <article ref={setNodeRef} className={className}>
      {children}
    </article>
  )
}

export function BoardPage() {
  const { boardId = '' } = useParams()
  const location = useLocation()
  const boardNameFromState = (location.state as { boardName?: string } | null)?.boardName
  const { data: boards = [] } = useBoards()
  const boardNameFromApi = boards.find((board) => board.id === boardId)?.name
  const boardName = boardNameFromState ?? boardNameFromApi ?? 'Board'
  const { data: tasks = [], isLoading, isError } = useTasks(boardId)
  const createTaskMutation = useCreateTask(boardId)
  const updateTaskMutation = useUpdateTask(boardId)
  const deleteTaskMutation = useDeleteTask(boardId)
  const [isInviteOpen, setIsInviteOpen] = useState(false)
  const [draftByTaskId, setDraftByTaskId] = useState<Record<string, string>>({})
  const [orderedTaskIds, setOrderedTaskIds] = useState<string[]>([])
  const sensors = useSensors(useSensor(PointerSensor))

  const taskById = useMemo(() => {
    const map = new Map<string, Task>()
    tasks.forEach((task) => map.set(task.id, task))
    return map
  }, [tasks])

  const mergedOrderedTaskIds = useMemo(() => {
    const baseIds = tasks.map((task) => task.id)
    if (orderedTaskIds.length === 0) return baseIds

    const kept = orderedTaskIds.filter((id) => baseIds.includes(id))
    const added = baseIds.filter((id) => !kept.includes(id))
    return [...kept, ...added]
  }, [tasks, orderedTaskIds])

  const orderedTasks = useMemo(
    () => mergedOrderedTaskIds.map((id) => taskById.get(id)).filter((task): task is Task => Boolean(task)),
    [mergedOrderedTaskIds, taskById],
  )

  function onDraftChange(task: Task, nextTitle: string) {
    setDraftByTaskId((prev) => ({ ...prev, [task.id]: nextTitle }))

    window.clearTimeout((onDraftChange as unknown as { _timer?: number })._timer)
    ;(onDraftChange as unknown as { _timer?: number })._timer = window.setTimeout(() => {
      if (nextTitle.trim() === '' || nextTitle.trim() === task.title) return
      updateTaskMutation.mutate({
        boardId,
        taskId: task.id,
        title: nextTitle.trim(),
      })
    }, 450)
  }

  function onMove(task: Task, direction: 'left' | 'right') {
    const order: Column[] = ['todo', 'doing', 'done']
    const index = order.indexOf(task.column)
    const nextIndex = direction === 'left' ? index - 1 : index + 1
    const nextColumn = order[nextIndex]
    if (!nextColumn) return

    updateTaskMutation.mutate({
      boardId,
      taskId: task.id,
      column: nextColumn,
    })
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) return
    const activeId = String(active.id)
    const overId = String(over.id)
    if (activeId === overId) return

    const activeTask = taskById.get(activeId)
    if (!activeTask) return

    const columnKeys: Column[] = ['todo', 'doing', 'done']
    const overTask = taskById.get(overId)
    const targetColumn = (columnKeys.includes(overId as Column)
      ? (overId as Column)
      : overTask?.column) as Column | undefined

    if (!targetColumn) return

    setOrderedTaskIds(() => {
      const currentIds = mergedOrderedTaskIds
      const oldIndex = currentIds.indexOf(activeId)
      if (oldIndex < 0) return currentIds

      if (columnKeys.includes(overId as Column)) {
        const nextIds = currentIds.filter((id) => id !== activeId)
        const idsInTarget = nextIds.filter((id) => taskById.get(id)?.column === targetColumn)
        if (idsInTarget.length === 0) return [...nextIds, activeId]
        const insertAfterId = idsInTarget[idsInTarget.length - 1]
        const insertIndex = nextIds.indexOf(insertAfterId) + 1
        return [...nextIds.slice(0, insertIndex), activeId, ...nextIds.slice(insertIndex)]
      }

      const newIndex = currentIds.indexOf(overId)
      if (newIndex < 0) return currentIds
      return arrayMove(currentIds, oldIndex, newIndex)
    })

    if (activeTask.column !== targetColumn) {
      updateTaskMutation.mutate({
        boardId,
        taskId: activeTask.id,
        column: targetColumn,
      })
    }
  }

  function onCreateTask(column: Column) {
    createTaskMutation.mutate({
      boardId,
      title: 'Something to do',
      column,
    })
  }

  return (
    <main className="board-shell">
      <section className="board-page">
        <header className="board-topbar">
          <div className="board-left">
            <Link to="/home" className="back-link" aria-label="Back to home">
              ←
            </Link>
            <h1>{boardName}</h1>
            <input type="text" placeholder="Filter cards..." aria-label="Filter cards" />
          </div>

          <div className="board-actions">
            <button type="button" className="btn" onClick={() => setIsInviteOpen(true)}>
              Inviter
            </button>
          </div>
        </header>

        {isLoading ? <p className="board-state">Loading tasks...</p> : null}
        {isError ? <p className="board-state">Cannot load tasks for now.</p> : null}

        <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={onDragEnd}>
          <section className="kanban-grid">
            {boardColumns.map((column) => {
              const columnTasks = orderedTasks.filter((task) => task.column === column.key)
              return (
                <DroppableColumn
                  key={column.key}
                  id={column.key as Column}
                  className={`kanban-column column-${column.color}`}
                >
              <header className="kanban-column-header">
                <h2>{column.title}</h2>
                <button
                  type="button"
                  className="icon-square"
                  aria-label={`Add task to ${column.title}`}
                  onClick={() => onCreateTask(column.key as Column)}
                >
                  <AddIcon size={18} color="var(--color-light)" />
                </button>
              </header>

              <div className="kanban-cards">
                <SortableContext
                  items={columnTasks.map((task) => task.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {columnTasks.map((task) => (
                    <SortableTaskCard
                      key={task.id}
                      task={task}
                      draftTitle={draftByTaskId[task.id] ?? task.title}
                      onDraftChange={onDraftChange}
                      onDelete={(taskId) => deleteTaskMutation.mutate({ taskId })}
                      onMoveLeft={(movedTask) => onMove(movedTask, 'left')}
                      onMoveRight={(movedTask) => onMove(movedTask, 'right')}
                    />
                  ))}
                </SortableContext>
              </div>
                </DroppableColumn>
              )
            })}
          </section>
        </DndContext>

        {isInviteOpen ? (
          <div className="invite-overlay" role="dialog" aria-modal="true" aria-label="Invite team members">
            <div className="invite-modal">
              <header className="invite-modal-header">
                <h3>Invite team members</h3>
                <button
                  type="button"
                  className="invite-close"
                  onClick={() => setIsInviteOpen(false)}
                  aria-label="Close invite modal"
                >
                  ×
                </button>
              </header>

              <div className="invite-form-row">
                <input type="email" placeholder="ada@adatechschool.fr" aria-label="Invite by email" />
                <button type="button" className="btn">
                  Invite
                </button>
              </div>

              <ul className="invite-members">
                <li>
                  <div>
                    <p className="invite-member-name">Ada Lovelace</p>
                    <p className="invite-member-email">ada@adatechschool.fr</p>
                  </div>
                  <button type="button" className="invite-role-btn">
                    Owner <span>⌄</span>
                  </button>
                </li>

                <li>
                  <div>
                    <p className="invite-member-name">Emma Watson</p>
                    <p className="invite-member-email">emma@adatechschool.fr</p>
                  </div>
                  <div className="invite-actions">
                    <button type="button" className="invite-role-btn">
                      Edit <span>⌄</span>
                    </button>
                    <button type="button" className="invite-delete-btn" aria-label="Remove Emma Watson">
                      <BinIcon size={14} color="var(--text-on-accent)" />
                    </button>
                  </div>
                </li>

                <li>
                  <div>
                    <p className="invite-member-name">Fatoumata Kebe</p>
                    <p className="invite-member-email">fatoumata@adatechschool.fr</p>
                  </div>
                  <div className="invite-actions">
                    <button type="button" className="invite-role-btn">
                      View <span>⌄</span>
                    </button>
                    <button type="button" className="invite-delete-btn" aria-label="Remove Fatoumata Kebe">
                      <BinIcon size={14} color="var(--text-on-accent)" />
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        ) : null}
      </section>
    </main>
  )
}
