import type ServiceFactory from '_/services/service-factory'
import effectMwFactory from '_/utils/redux/effect'

import cards from '_/features/cards/reducer'
import cardsEffectFactory from '_/features/cards/effects'
import Cards from '_/features/cards/list/card-list'

import type { AppModule } from '../types'

function appModuleFactory(services: ServiceFactory): AppModule {
    const middlewares = [
            effectMwFactory(cardsEffectFactory(services.card())),
        ]
        , reducer = { cards }

    return { mainView: Cards, middlewares, reducer }
}

export default appModuleFactory
