import { actions as routerActions } from 'redux-router5'

import AuthService from '#/services/auth-service'
import { handler, EffectsFactory } from '#/facade/effect'
import * as routes from '#/constants/routes'

import * as actions from './actions'
import { calcAccess } from '#/features/access/actions'

const factory = (authService: AuthService): EffectsFactory => dispatch => [
    handler(
        actions.logIn,
        credentials =>
            authService.logIn(credentials).then(data => {
                dispatch(actions.loggedIn(data))
                dispatch(calcAccess(data))
                dispatch(routerActions.navigateTo(routes.CARDS))
            })
    ),
]

export default factory
