import * as router5 from 'router5'

import * as routes from '#/constants/routes'
import AppState from '#/entities/app-state'
import { MiddlewareAPI } from '#/utils/redux'

const middleware: router5.MiddlewareFactory = (_router, dependencies) => (toState, _fromState) => {
    const { getState } = dependencies.store as MiddlewareAPI<AppState>
        , loggedIn = !!getState().auth.id
        , allowTransition = loggedIn || toState.name === routes.LOG_IN

    return allowTransition || Promise.reject({
        redirect: { name: routes.LOG_IN },
    })
}

export default middleware
