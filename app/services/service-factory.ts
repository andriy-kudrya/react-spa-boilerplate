import AuthService from './auth-service'
import CardService from './card-service'

interface ServiceFactory {
    auth(): AuthService
    card(): CardService
}

export default ServiceFactory
