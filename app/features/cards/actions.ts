import { creatorFactory } from '_/utils/redux'
import type { Game } from '_/entities/card'
import type SortState from '_/entities/sort-state'
import type PaginationState from '_/entities/pagination-state'

const creator = creatorFactory('app.cards')

export const loadCardList = creator<void, Promise<Game[]>>('LOAD_CARD_LIST')
           , cardListLoaded = creator<Game[]>('CARD_LIST_LOADED')
           , sortCardList = creator<SortState>('SORT_CARD_LIST')
           , cardListPageChange = creator<PaginationState>('CARD_LIST_PAGE_CHANGE')
