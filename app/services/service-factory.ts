import AuthService from './auth-service'
import CardService from './card-service'
import TokenService from './token-service'

interface ServiceFactory {
    auth(): AuthService
    card(): CardService
    token(): TokenService
}

export default ServiceFactory
