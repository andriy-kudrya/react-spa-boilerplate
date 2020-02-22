import type CardService from '#/services/card-service'
import { handler, EffectsFactory } from '#/facade/effect'

import * as actions from './actions'

const factory = (cardService: CardService): EffectsFactory => dispatch => [
    handler(
        actions.loadCardList,
        () =>
            cardService.getAll().then(games => {
                dispatch(actions.cardListLoaded(games))
                return games
            })
    ),
]

export default factory
