import { action, ActionType } from '#/utils/redux'
import { Credentials } from '#/entities/auth'
import { Auth } from '#/entities/state'

const LOG_IN: ActionType<Credentials> = 'app.auth.LOG_IN'
    , LOGGED_IN: ActionType<Auth> = 'app.auth.LOGGED_IN'

const logIn = action(LOG_IN)
    , loggedIn = action(LOGGED_IN)

export {
    LOG_IN,
    LOGGED_IN,

    logIn,
    loggedIn,
}
