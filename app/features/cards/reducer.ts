import { Cards as State } from '#/entities/state'
import { CardSets } from '#/entities/card'
import { reducer, handler } from '#/utils/redux'
import { CARD_LIST_LOADED } from './actions'

const defaultState: State = {
    sets: []
}

export default reducer<State>(defaultState,
    handler<State, CardSets[]>(CARD_LIST_LOADED, (state, payload) => Object.assign({}, state, { sets: payload }))
)
