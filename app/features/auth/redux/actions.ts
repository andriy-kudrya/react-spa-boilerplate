import { action } from '#/utils/redux'
import AuthData from '#/entities/auth-data'
import { Auth } from '#/entities/state'

const LOG_IN = 'app.auth.LOG_IN'
    , LOGGED_IN = 'app.auth.LOGGED_IN'

const logIn = action<AuthData>(LOG_IN)
    , loggedIn = action<Auth>(LOGGED_IN)

export { 
    LOG_IN,
    LOGGED_IN,
    logIn,
    loggedIn,
}