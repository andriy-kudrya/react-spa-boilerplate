import { creatorFactory } from '#/utils/redux'
import { Game } from '#/entities/card'
import SortState from '#/entities/sort-state'
import PaginationState from '#/entities/pagination-state'

const creator = creatorFactory('app.cards')

export const loadCardList = creator<void, Promise<Game[]>>('LOAD_CARD_LIST')
           , cardListLoaded = creator<Game[]>('CARD_LIST_LOADED')
           , sortCardList = creator<SortState>('SORT_CARD_LIST')
           , cardListPageChange = creator<PaginationState>('CARD_LIST_PAGE_CHANGE')
