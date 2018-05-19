import CardService from '#/services/card-service'
import ifMw, { actionHasType } from '#/utils/middleware/if' 
import asyncMw from '#/utils/middleware/async' 

import { LOAD_CARD_LIST, cardListLoaded } from './actions'

function factory(cardService: CardService) {
    const loadCardListMw = 
        ifMw(
            actionHasType(LOAD_CARD_LIST),
            asyncMw(
                api => _next => _action =>
                    cardService.getAll().then(_ => api.dispatch(cardListLoaded(_)))
            )
        )

    return [loadCardListMw]
}

export default factory

