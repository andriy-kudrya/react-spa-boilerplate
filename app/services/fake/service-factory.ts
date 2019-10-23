import ServiceFactory from '../service-factory'
import authServiceFactory from './auth-service-fake'
import cardServiceFactory from './card-service-fake'

function createServiceFactory(): ServiceFactory {
    const cardService = cardServiceFactory()
        , authService = authServiceFactory()

    return {
        auth() {
            return authService
        },
        card() {
            return cardService
        },
        token() {
            return { setToken() {} }
        },
    }
}

export default createServiceFactory
