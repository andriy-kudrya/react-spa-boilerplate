import { reducer, handler } from '#/utils/redux/reducer'
import * as actions from './actions'
import defaultState from './default-state'

export default reducer(
    defaultState,
    handler(
        actions.CALC_ACCESS,
        (_, _payload) =>
            ({
                logIn: true,
                viewCards: true,
            })
    ),
)
