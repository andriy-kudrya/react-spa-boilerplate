import type ServiceFactory from '_/services/service-factory'
import type { AppModule } from '../types'
import Auth from '_/features/auth/auth-form/auth'

function appModuleFactory(_services: ServiceFactory): AppModule {
    return { mainView: Auth, middlewares: [] }
}

export default appModuleFactory
