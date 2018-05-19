import { actions } from 'redux-router5'

import { PayloadAction } from '#/utils/redux'
import { Credentials } from '#/entities/auth'
import AuthService from '#/services/auth-service'
import ifMw, { actionHasType } from '#/utils/middleware/if'
import asyncMw from '#/utils/middleware/async'

import { LOG_IN, loggedIn } from './actions'

function factory(authService: AuthService) {
    const logInMw = 
        ifMw(
            actionHasType(LOG_IN),
            asyncMw(
                api => _next => (action: PayloadAction<Credentials>) =>
                    authService.logIn(action.payload).then(data => {
                        api.dispatch(loggedIn(data))
                        api.dispatch(actions.navigateTo('cards'))
                    })
            )
        )

    return [logInMw]
}

export default factory
