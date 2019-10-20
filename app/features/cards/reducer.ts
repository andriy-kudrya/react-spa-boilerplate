import { Game } from '#/entities/card'
import SortState from '#/entities/sort-state'
import { reducer, handler } from '#/utils/redux/reducer'
import { shallowUpdate } from '#/utils/object'
import * as actions from './actions'
import defaultState from './default-state'

export default reducer(
    defaultState,
    handler(actions.cardListLoaded, (state, games) => shallowUpdate(state, { games })),
    handler(actions.sortCardList, (state, sortState) => shallowUpdate(state, { games: sortGames(state.games, sortState) })),
    handler(actions.cardListPageChange, (state, pagination) => shallowUpdate(state, { pagination })),
)

function sortGames(games: Game[], sortState: SortState): Game[] {
    if (sortState.length === 0)
        return games

    const collator = new Intl.Collator(undefined, {
            numeric: true,
        })
        , result = games.slice()
        , [{ name, order }] = sortState
        , fieldSelector = gameFieldSelector(name)

    result.sort((one, two) => collator.compare(fieldSelector(one), fieldSelector(two)))

    if (order === 'desc')
        result.reverse()

    return result
}

function gameFieldSelector(name: string): (game: Game) => any {
    switch (name) {
        case 'game':
            return _ => _.game

        case 'count':
            return _ => _.normal.count

        case 'added':
            return _ => _.added

        default:
            throw new Error(`Unsupported sort field ${name}`)
    }
}
