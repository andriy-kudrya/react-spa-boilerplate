import { action, ActionType } from '#/utils/redux'
import { CardSets } from '#/entities/card'

const LOAD_CARD_LIST: ActionType = 'app.cards.LOAD_CARD_LIST'
    , CARD_LIST_LOADED: ActionType<CardSets[]> = 'app.cards.CARD_LIST_LOADED'

const loadCardList = action(LOAD_CARD_LIST)
    , cardListLoaded = action(CARD_LIST_LOADED)

export {
    LOAD_CARD_LIST,
    CARD_LIST_LOADED,

    loadCardList,
    cardListLoaded,
}
