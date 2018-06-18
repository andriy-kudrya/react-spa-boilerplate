import CardService from '#/services/card-service'
import { handler } from '#/utils/middleware/effect'

import { LOAD_CARD_LIST, cardListLoaded } from './actions'

const factory = (cardService: CardService) => [
    handler(
        LOAD_CARD_LIST,
        api => cardService.getAll().then(_ => api.dispatch(cardListLoaded(_)))
    ),
]

export default factory
