import { creatorFactory } from '_/utils/redux'
import type { Credentials } from '_/entities/auth'
import type { Auth } from '_/entities/app-state'

const creator = creatorFactory('app.auth')

export const logIn = creator<Credentials, Promise<void>>('LOG_IN')
           , loggedIn = creator<Auth>('LOGGED_IN')
