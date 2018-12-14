import { reducer, handler } from '#/utils/redux/reducer'
import * as actions from './actions'
import defaultState from './default-state'

export default reducer(
    defaultState,
    handler(actions.ADD_ERROR, (state, error) => state.concat(error)),
    handler(actions.REMOVE_ERROR, (state, error) => state.filter(_ => _ !== error)),
)
