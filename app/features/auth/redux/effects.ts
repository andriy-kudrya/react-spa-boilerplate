import { actions } from 'redux-router5'

import AuthService from '#/services/auth-service'
import { handler } from '#/utils/middleware/effect'

import { LOG_IN, loggedIn } from './actions'

function factory(authService: AuthService) {
    const logInHandler = handler(LOG_IN,
            ({ dispatch }, credentials) =>
                authService.logIn(credentials).then(data => {
                    dispatch(loggedIn(data))
                    dispatch(actions.navigateTo('cards'))
                })
        )

    return [logInHandler]
}

export default factory
