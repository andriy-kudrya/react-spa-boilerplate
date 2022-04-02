import type ServiceFactory from '_/services/service-factory'
import type { AppModule } from '../types'
import Demo from '_/features/demo/demo'

function appModuleFactory(_services: ServiceFactory): AppModule {
    return { mainView: Demo, middlewares: [] }
}

export default appModuleFactory
