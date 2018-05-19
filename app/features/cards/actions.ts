import { action } from '#/utils/redux'
import { CardSets } from '#/entities/card'

const LOAD_CARD_LIST = 'app.cards.LOAD_CARD_LIST'
    , loadCardList = action(LOAD_CARD_LIST)
    , CARD_LIST_LOADED = 'app.cards.CARD_LIST_LOADED'
    , cardListLoaded = action<CardSets[]>(CARD_LIST_LOADED)

export { 
    LOAD_CARD_LIST, loadCardList,
    CARD_LIST_LOADED, cardListLoaded,
}