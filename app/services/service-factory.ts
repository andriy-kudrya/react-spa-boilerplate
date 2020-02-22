import type AuthService from './auth-service'
import type CardService from './card-service'
import type TokenService from './token-service'

interface ServiceFactory {
    auth(): AuthService
    card(): CardService
    token(): TokenService
}

export default ServiceFactory
