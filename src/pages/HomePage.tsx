import { BoardIcon } from '../components/icons/BoardIcon'
import { BinIcon } from '../components/icons/BinIcon'
import { Link } from 'react-router-dom'

const boardCards = [
  {
    id: 'dataviz',
    title: 'Dataviz',
    updatedAt: 'Edited 4 minutes ago',
    members: ['Ada lovelace', 'Dorothy Vaughan'],
  },
  {
    id: 'plateforme',
    title: 'Plateforme de meubles',
    updatedAt: 'Edited 2 days ago',
    members: ['Ada lovelace'],
  },
]

export function HomePage() {
  return (
    <main className="home-shell">
      <section className="home-page">
        <header className="home-header">
          <p className="brand">
            <span className="brand-icon" aria-hidden="true">
              <BoardIcon size={18} color="var(--color-light)" />
            </span>
            AdaBoards
          </p>

          <div className="home-actions">
            <button type="button" className="btn btn-ghost-light">
              Log out
            </button>
          </div>
        </header>

        <div className="home-title-row">
          <h1 className="home-title">
            Hello, <span>Ada Lovelace</span> !
          </h1>
          <button type="button" className="btn">
            Add board
          </button>
        </div>

        <section className="home-boards">
          {boardCards.map((board) => (
            <article key={board.id} className="board-card">
              <div className="board-card-head">
                <Link className="board-card-link" to={`/boards/${board.id}`}>
                  <h2>{board.title}</h2>
                </Link>
                <button type="button" className="delete-board" aria-label="Delete board">
                  <BinIcon size={16} color="var(--color-light)" />
                </button>
              </div>

              <Link className="board-card-link" to={`/boards/${board.id}`}>
                <p className="board-updated">{board.updatedAt}</p>

                <div className="board-members">
                  {board.members.map((member) => (
                    <span key={member} className="member-pill">
                      {member}
                    </span>
                  ))}
                </div>
              </Link>
            </article>
          ))}
        </section>
      </section>
    </main>
  )
}
