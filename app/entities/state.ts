import { RouterState } from 'redux-router5'
import { CardSets } from '#/entities/card'
import { Auth } from '#/entities/auth'

interface Cards {
    sets: CardSets[]
}

interface State {
    auth: Auth
    cards: Cards
    router: RouterState
}

export { State as default, Auth, Cards }
