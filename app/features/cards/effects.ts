import CardService from '#/services/card-service'
import { handler } from '#/utils/middleware/effect'

import { LOAD_CARD_LIST, cardListLoaded } from './actions'

function factory(cardService: CardService) {
    const loadCardListHandler = handler(
            LOAD_CARD_LIST,
            api => cardService.getAll().then(_ => api.dispatch(cardListLoaded(_)))
        )

    return [loadCardListHandler]
}

export default factory
