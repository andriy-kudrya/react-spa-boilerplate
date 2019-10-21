import { actions as routerActions } from 'redux-router5'

import AuthService from '#/services/auth-service'
import { handler, EffectsFactory } from '#/facade/effect'

import { defaultRoute } from '#/features/routing/helpers'

import * as actions from './actions'
import { calcAccess } from '#/features/access/actions'

const factory = (authService: AuthService): EffectsFactory => (dispatch, getState) => [
    handler(
        actions.logIn,
        credentials =>
            authService.logIn(credentials).then(data => {
                dispatch(actions.loggedIn(data))
                dispatch(calcAccess(data))

                const route = defaultRoute(getState().access)
                dispatch(routerActions.navigateTo(route))
            })
    ),
]

export default factory
