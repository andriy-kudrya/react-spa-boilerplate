import ServiceFactory from '#/services/service-factory'
import effectMwFactory /*, { EffectsFactory }*/ from '#/utils/redux/effect'

import auth from '#/features/auth/reducer'
import authEffectFactory from '#/features/auth/effects'

import { AppModule } from '../types'

function appModuleFactory(services: ServiceFactory): AppModule {
    const middlewares = [
            effectMwFactory([authEffectFactory(services.auth())]),
        ],
        reducer = { auth }

    return { middlewares, reducer }
}

export default appModuleFactory