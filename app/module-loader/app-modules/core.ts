import type ServiceFactory from '#/services/service-factory'
import effectMwFactory  from '#/utils/redux/effect'

import auth from '#/features/auth/reducer'
import authEffectFactory from '#/features/auth/effects'

import type { AppModule } from '../types'

function appModuleFactory(services: ServiceFactory): AppModule {
    const middlewares = [
            effectMwFactory(authEffectFactory(services.auth(), services.token())),
        ]
        , reducer = { auth }

    return { middlewares, reducer }
}

export default appModuleFactory
