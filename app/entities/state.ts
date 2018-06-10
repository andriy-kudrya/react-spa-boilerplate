import { RouterState } from 'redux-router5'
import { Game } from '#/entities/card'
import { Auth } from '#/entities/auth'
import PaginationState from '#/entities/pagination-state'

interface Cards {
    games: Game[]
    pagination: PaginationState
}

interface State {
    auth: Auth
    cards: Cards
    router: RouterState
}

export { State as default, Auth, Cards }
