import ServiceFactory from '#/services/service-factory'
import effectMwFactory from '#/utils/redux/effect'

import cards from '#/features/cards/reducer'
import cardsEffectFactory from '#/features/cards/effects'
import Cards from '#/features/cards/list/card-list'

import { AppModule } from '../types'

function appModuleFactory(services: ServiceFactory): AppModule {
    const middlewares = [
            effectMwFactory(cardsEffectFactory(services.card())),
        ]
        , reducer = { cards }

    return { mainView: Cards, middlewares, reducer }
}

export default appModuleFactory
