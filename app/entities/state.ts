import { RouterState } from 'redux-router5'
import { Game } from '#/entities/card'
import { Auth } from '#/entities/auth'

interface Cards {
    games: Game[]
}

interface State {
    auth: Auth
    cards: Cards
    router: RouterState
}

export { State as default, Auth, Cards }
