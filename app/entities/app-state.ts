import type { RouterState } from 'redux-router5'
import type { Game } from '#/entities/card'
import type { Auth } from '#/entities/auth'
import type Access from '#/entities/access'
import type AppError from '#/entities/app-error'
import type PaginationState from '#/entities/pagination-state'

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
