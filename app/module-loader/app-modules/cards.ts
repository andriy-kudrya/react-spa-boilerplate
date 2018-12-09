import ServiceFactory from '#/services/service-factory'
import effectMwFactory /*, { EffectsFactory }*/ from '#/utils/redux/effect'

import cards from '#/features/cards/reducer'
import cardsEffectFactory from '#/features/cards/effects'

import { AppModule } from '../types'

function appModuleFactory(services: ServiceFactory): AppModule {
    const middlewares = [
            effectMwFactory(cardsEffectFactory(services.card())),
        ],
        reducer = { cards }

    return { middlewares, reducer }
}

export default appModuleFactory