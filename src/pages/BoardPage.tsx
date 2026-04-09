import { useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
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

export function BoardPage() {
  const { boardId = '' } = useParams()
  const location = useLocation()
  const boardNameFromState = (location.state as { boardName?: string } | null)?.boardName
  const { data: boards = [] } = useBoards()
  const boardNameFromApi = boards.find((board) => board.id === boardId)?.name
  const boardName = boardNameFromState ?? boardNameFromApi ?? boardId ?? 'Board'
  const { data: tasks = [], isLoading, isError } = useTasks(boardId)
  const createTaskMutation = useCreateTask(boardId)
  const updateTaskMutation = useUpdateTask(boardId)
  const deleteTaskMutation = useDeleteTask(boardId)
  const [isInviteOpen, setIsInviteOpen] = useState(false)
  const [draftByTaskId, setDraftByTaskId] = useState<Record<string, string>>({})

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

        <section className="kanban-grid">
          {boardColumns.map((column) => (
            <article key={column.key} className={`kanban-column column-${column.color}`}>
              <header className="kanban-column-header">
                <h2>{column.title}</h2>
                <button
                  type="button"
                  className="icon-square"
                  aria-label={`Add task to ${column.title}`}
                  onClick={() => onCreateTask(column.key as Column)}
                >
                  <AddIcon size={18} color="#f3f2f4" />
                </button>
              </header>

              <div className="kanban-cards">
                {tasks
                  .filter((task) => task.column === column.key)
                  .map((task) => (
                  <article key={task.id} className={`kanban-card card-${column.color}`}>
                    <div className="kanban-card-head">
                      <input
                        className="kanban-task-input"
                        value={draftByTaskId[task.id] ?? task.title}
                        onChange={(event) => onDraftChange(task, event.target.value)}
                        aria-label="Task title"
                      />
                      <button
                        type="button"
                        className="mini-icon-btn"
                        aria-label="Delete task"
                        onClick={() => deleteTaskMutation.mutate({ taskId: task.id })}
                      >
                        <BinIcon size={12} color="#1d1b25" />
                      </button>
                    </div>

                    <div className={`kanban-card-actions actions-${task.column}`}>
                      {task.column !== 'todo' ? (
                        <button type="button" className="mini-icon-btn" aria-label="Move task left" onClick={() => onMove(task, 'left')}>
                          <PlayIcon
                            size={14}
                            color="var(--color-gray-800)"
                            style={{ transform: 'rotate(180deg)' }}
                          />
                        </button>
                      ) : null}
                      {task.column !== 'done' ? (
                        <button type="button" className="mini-icon-btn" aria-label="Move task right" onClick={() => onMove(task, 'right')}>
                          <PlayIcon size={14} color="var(--color-gray-800)" />
                        </button>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </article>
          ))}
        </section>

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
                      <BinIcon size={14} color="#1d1b25" />
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
                      <BinIcon size={14} color="#1d1b25" />
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
