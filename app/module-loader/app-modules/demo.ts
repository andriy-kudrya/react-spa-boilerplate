import ServiceFactory from '#/services/service-factory'
import { AppModule } from '../types'
import Demo from '#/features/demo/demo'

function appModuleFactory(_services: ServiceFactory): AppModule {
    return { mainView: Demo, middlewares: [] }
}

export default appModuleFactory
