import CardService from '#/services/card-service'
import { handler, EffectsFactory } from '#/facade/effect'

import { LOAD_CARD_LIST, cardListLoaded } from './actions'

const factory = (cardService: CardService): EffectsFactory => dispatch => [
    handler(
        LOAD_CARD_LIST,
        () =>
            cardService.getAll().then(games => {
                dispatch(cardListLoaded(games))
                return games
            })
    ),
]

export default factory
