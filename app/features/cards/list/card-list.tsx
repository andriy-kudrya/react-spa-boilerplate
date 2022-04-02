import { useEffect, useSelector, useAction } from '#/facade/hooks'

import { SortContainer } from '#/utils/sort'

import Pagination from '#/utils/pagination'

import * as actions from '../actions'

import Header from './header'
import CardListRow from './card-row'

function CardList() {
    const loadCardList = useAction(actions.loadCardList)
        , sortCardList = useAction(actions.sortCardList)
        , cardListPageChange = useAction(actions.cardListPageChange)
        , cards = useSelector(_ => _.cards)

    useEffect(
        () => {
            loadCardList()
        },
        [loadCardList]
    )

    const { start, count } = cards.pagination
        , games = cards.games.slice(start, start + count)

    return (
        <div className='container'>
            <table className='table'>
                <thead>
                    <tr>
                        <SortContainer onChange={sortCardList}>
                            <Header name='game'>Game</Header>
                            <Header name='count'>Card Count</Header>
                            <Header name='added'>Date Added</Header>
                        </SortContainer>
                    </tr>
                </thead>
                <tbody>
                    {games.map(
                        _ => <CardListRow key={_.game} game={_}/>
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={3}>
                            <Pagination
                                totalCount={cards.games.length}
                                state={cards.pagination}
                                onChange={cardListPageChange}
                            />
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default CardList
