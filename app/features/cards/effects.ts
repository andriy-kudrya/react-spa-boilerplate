import CardService from '#/services/card-service'
import { handler, EffectsFactory } from '#/utils/middleware/effect'

import { LOAD_CARD_LIST, cardListLoaded } from './actions'

const factory = (cardService: CardService): EffectsFactory => (dispatch) => [
    handler(LOAD_CARD_LIST, () =>
        cardService.getAll().then(_ => dispatch(cardListLoaded(_)))
    ),
]

export default factory
