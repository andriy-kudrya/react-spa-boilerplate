import ServiceFactory from '#/services/service-factory'
import { AppModule } from '../types'
import Auth from '#/features/auth/auth-form/auth'

function appModuleFactory(_services: ServiceFactory): AppModule {
    return { mainView: Auth, middlewares: [] }
}

export default appModuleFactory