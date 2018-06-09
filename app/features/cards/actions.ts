import { action, ActionType } from '#/utils/redux'
import { CardSets } from '#/entities/card'
import SortState from '#/entities/sort-state'

const LOAD_CARD_LIST: ActionType = 'app.cards.LOAD_CARD_LIST'
    , CARD_LIST_LOADED: ActionType<CardSets[]> = 'app.cards.CARD_LIST_LOADED'
    , SORT_CARD_LIST: ActionType<SortState> = 'app.cards.SORT_CARD_LIST'

const loadCardList = action(LOAD_CARD_LIST)
    , cardListLoaded = action(CARD_LIST_LOADED)
    , sortCardList = action(SORT_CARD_LIST)

export {
    LOAD_CARD_LIST,
    CARD_LIST_LOADED,
    SORT_CARD_LIST,

    loadCardList,
    cardListLoaded,
    sortCardList,
}
