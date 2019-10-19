import { RouterState } from 'redux-router5'
import { Game } from '#/entities/card'
import { Auth } from '#/entities/auth'
import Access from '#/entities/access'
import AppError from '#/entities/app-error'
import PaginationState from '#/entities/pagination-state'

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
