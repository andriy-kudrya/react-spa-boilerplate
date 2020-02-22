import { actions as routerActions } from 'redux-router5'

import type AuthService from '#/services/auth-service'
import type TokenService from '#/services/token-service'
import { handler, EffectsFactory } from '#/facade/effect'

import { defaultRoute } from '#/features/routing/helpers'

import * as actions from './actions'
import { calcAccess } from '#/features/access/actions'

const factory = (authService: AuthService, tokenService: TokenService): EffectsFactory => (dispatch, getState) => [
    handler(
        actions.logIn,
        credentials =>
            authService.logIn(credentials).then(data => {
                tokenService.setToken(data.token)

                dispatch(actions.loggedIn(data))
                dispatch(calcAccess(data))

                const route = defaultRoute(getState().access)
                dispatch(routerActions.navigateTo(route))
            })
    ),
]

export default factory
