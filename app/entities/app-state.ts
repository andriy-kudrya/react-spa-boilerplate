import type { RouterState } from 'redux-router5'
import type { Game } from '_/entities/card'
import type { Auth } from '_/entities/auth'
import type Access from '_/entities/access'
import type AppError from '_/entities/app-error'
import type PaginationState from '_/entities/pagination-state'

interface Cards {
    games: Game[]
    pagination: PaginationState
}

interface AppState {
    access: Access
    auth: Auth
    cards: Cards
    router: RouterState
    errors: AppError[]
}

export { AppState as default, Auth, Cards }
