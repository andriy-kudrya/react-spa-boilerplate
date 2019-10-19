import * as router5 from 'router5'

// import * as routes from '#/constants/routes'
import AppState from '#/entities/app-state'
import { MiddlewareAPI } from '#/utils/redux'

import { hasAccess } from './helpers'

const middleware: router5.MiddlewareFactory = (_router, dependencies) => (toState, _fromState) => {
    const { getState } = dependencies.store as MiddlewareAPI<AppState>
        , allowTransition = hasAccess(toState.name, getState().access)

    return allowTransition/* || Promise.reject({
        redirect: { name: routes.LOG_IN },
    }) */
}

export default middleware
