import { actions } from 'redux-router5'

import AuthService from '#/services/auth-service'
import { handler } from '#/utils/middleware/effect'

import { LOG_IN, loggedIn } from './actions'

const factory = (authService: AuthService) => [
    handler(
        LOG_IN,
        ({ dispatch }, credentials) =>
            authService.logIn(credentials).then(data => {
                dispatch(loggedIn(data))
                dispatch(actions.navigateTo('cards'))
            })
    ),
]

export default factory
