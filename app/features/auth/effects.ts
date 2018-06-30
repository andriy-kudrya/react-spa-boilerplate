import { actions } from 'redux-router5'

import AuthService from '#/services/auth-service'
import { handler, EffectsFactory } from '#/facade/effect'

import { LOG_IN, loggedIn } from './actions'

const factory = (authService: AuthService): EffectsFactory => dispatch => [
    handler(LOG_IN, credentials =>
        authService.logIn(credentials).then(data => {
            dispatch(loggedIn(data))
            dispatch(actions.navigateTo('cards'))
        })
    ),
]

export default factory
