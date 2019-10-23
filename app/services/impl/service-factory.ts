import ServiceFactory from '../service-factory'
import authServiceFactory from '../fake/auth-service-fake'
import cardServiceFactory from './card-service'
import apiServiceFactory from './api-service'

function createServiceFactory(): ServiceFactory {
    const apiService = apiServiceFactory()
        , cardService = cardServiceFactory(apiService)
        , authService = authServiceFactory()

    return {
        auth() {
            return authService
        },
        card() {
            return cardService
        },
        token() {
            return apiService
        },
    }
}

export default createServiceFactory
