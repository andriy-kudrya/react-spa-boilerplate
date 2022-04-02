import { reducer, handler } from '_/utils/redux/reducer'
import { shallowUpdate } from '_/utils/object'
import * as actions from './actions'
import defaultState from './default-state'

export default reducer(
    defaultState,
    handler(actions.loggedIn, shallowUpdate),
)
