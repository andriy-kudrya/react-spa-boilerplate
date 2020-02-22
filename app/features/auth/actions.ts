import { creatorFactory } from '#/utils/redux'
import type { Credentials } from '#/entities/auth'
import type { Auth } from '#/entities/app-state'

const creator = creatorFactory('app.auth')

export const logIn = creator<Credentials, Promise<void>>('LOG_IN')
           , loggedIn = creator<Auth>('LOGGED_IN')
