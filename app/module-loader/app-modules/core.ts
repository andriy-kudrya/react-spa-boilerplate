import type ServiceFactory from '_/services/service-factory'
import effectMwFactory  from '_/utils/redux/effect'

import auth from '_/features/auth/reducer'
import authEffectFactory from '_/features/auth/effects'

import type { AppModule } from '../types'

function appModuleFactory(services: ServiceFactory): AppModule {
    const middlewares = [
            effectMwFactory(authEffectFactory(services.auth(), services.token())),
        ]
        , reducer = { auth }

    return { middlewares, reducer }
}

export default appModuleFactory
