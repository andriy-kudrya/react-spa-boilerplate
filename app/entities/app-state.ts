import { RouterState } from 'redux-router5'
import { Access } from '#/constants/access'
import { Game } from '#/entities/card'
import { Auth } from '#/entities/auth'
import AppError from '#/entities/app-error'
import PaginationState from '#/entities/pagination-state'

interface Cards {
    games: Game[]
    pagination: PaginationState
}

interface AppState {
    access: { [_ in Access]: boolean }
    auth: Auth
    cards: Cards
    router: RouterState
    errors: AppError[]
}

export { AppState as default, Auth, Cards }
