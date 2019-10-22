import { reducer, handler } from '#/utils/redux/reducer'
import * as actions from './actions'
import defaultState from './default-state'

export default reducer(
    defaultState,
    handler(
        actions.calcAccess,
        (_, _payload) =>
            ({
                logIn: false,
                viewCards: true,
                demo: true,
            })
    ),
)
