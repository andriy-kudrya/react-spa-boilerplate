import { action, ActionType } from '#/utils/redux'
import { Game } from '#/entities/card'
import SortState from '#/entities/sort-state'
import PaginationState from '#/entities/pagination-state'

const LOAD_CARD_LIST: ActionType = 'app.cards.LOAD_CARD_LIST'
    , CARD_LIST_LOADED: ActionType<Game[]> = 'app.cards.CARD_LIST_LOADED'
    , SORT_CARD_LIST: ActionType<SortState> = 'app.cards.SORT_CARD_LIST'
    , CARD_LIST_PAGE_CHANGE: ActionType<PaginationState> = 'app.cards.CARD_LIST_PAGE_CHANGE'

const loadCardList = action(LOAD_CARD_LIST)
    , cardListLoaded = action(CARD_LIST_LOADED)
    , sortCardList = action(SORT_CARD_LIST)
    , cardListPageChange = action(CARD_LIST_PAGE_CHANGE)

export {
    LOAD_CARD_LIST,
    CARD_LIST_LOADED,
    SORT_CARD_LIST,
    CARD_LIST_PAGE_CHANGE,

    loadCardList,
    cardListLoaded,
    sortCardList,
    cardListPageChange,
}
