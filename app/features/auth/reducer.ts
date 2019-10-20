import { reducer, handler } from '#/utils/redux/reducer'
import { shallowUpdate } from '#/utils/object'
import * as actions from './actions'
import defaultState from './default-state'

export default reducer(
    defaultState,
    handler(actions.loggedIn, shallowUpdate),
)
