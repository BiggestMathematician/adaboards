import { BinIcon } from '../components/icons/BinIcon'
import { Link } from 'react-router-dom'
import { useBoards, useCreateBoard, useDeleteBoard } from '../hooks/useBoards'

const AUTH_USER_NAME_KEY = 'adaboards-user-name'

export function HomePage() {
  const { data: boards = [], isLoading, isError } = useBoards()
  const createBoardMutation = useCreateBoard()
  const deleteBoardMutation = useDeleteBoard()
  const userName = window.localStorage.getItem(AUTH_USER_NAME_KEY) || 'Ada Lovelace'

  function onCreateBoard() {
    const name = window.prompt('Board name')
    if (!name || name.trim() === '') return
    createBoardMutation.mutate(name.trim())
  }

  return (
    <main className="home-shell">
      <section className="home-page">
        <div className="home-title-row">
          <h1 className="home-title">
            Hello, <span>{userName}</span> !
          </h1>
          <button type="button" className="btn" onClick={onCreateBoard} disabled={createBoardMutation.isPending}>
            Add board
          </button>
        </div>

        {isLoading ? <p className="home-state">Loading boards...</p> : null}
        {isError ? <p className="home-state">Cannot load boards for now.</p> : null}

        <section className="home-boards">
          {boards.map((board) => (
            <article key={board.id} className="board-card">
              <div className="board-card-head">
                <Link className="board-card-link" to={`/boards/${board.id}`} state={{ boardName: board.name }}>
                  <h2>{board.name}</h2>
                </Link>
                <button
                  type="button"
                  className="delete-board"
                  aria-label="Delete board"
                  onClick={() => deleteBoardMutation.mutate(board.id)}
                >
                  <BinIcon size={16} color="var(--color-light)" />
                </button>
              </div>

              <Link className="board-card-link" to={`/boards/${board.id}`} state={{ boardName: board.name }}>
                <p className="board-updated">{board.updated_at ? `Updated ${new Date(board.updated_at).toLocaleDateString()}` : 'No recent update'}</p>
              </Link>
            </article>
          ))}
        </section>
      </section>
    </main>
  )
}
