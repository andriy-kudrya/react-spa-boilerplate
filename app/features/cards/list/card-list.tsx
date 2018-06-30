import { React, connect, bindComponent } from '#/facade/react'

import AppState, { Cards } from '#/entities/app-state'
import { SortContainer } from '#/utils/sort'

import NumberInput from '#/utils/input/number-input'
import DateInput from '#/utils/input/utc-date-input'
import Pagination from '#/utils/pagination'

import { loadCardList, sortCardList, cardListPageChange } from '../actions'

import Header from './header'
import CardListRow from './card-row'

interface StateProps {
    cards: Cards,
}

interface DispatchProps {
    loadCardList: typeof loadCardList,
    sortCardList: typeof sortCardList,
    cardListPageChange: typeof cardListPageChange,
}

interface State {
    cardCount: number | undefined
    dateAdded: number | undefined
}

class CardList extends React.Component<StateProps & DispatchProps, State> {
    constructor(props: StateProps & DispatchProps) {
        super(props)
        this.state = { cardCount: undefined, dateAdded: undefined }
        bindComponent(this)

        props.loadCardList()
    }

    handleNumberChange(cardCount: number) {
        this.setState({ cardCount })
        console.log(cardCount)
    }

    handleDateChange(dateAdded: number) {
        this.setState({ dateAdded })
        console.log(dateAdded)
    }

    render() {
        const { cards, sortCardList, cardListPageChange } = this.props
            , { start, count } = cards.pagination
            , games = cards.games.slice(start, start + count)

        return (
            <div>
                <NumberInput value={this.state.cardCount} onChange={this.handleNumberChange} placeholder='Min cards...'/>
                <DateInput value={this.state.dateAdded} onChange={this.handleDateChange} placeholder='Min date added...'/>
                <table>
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
}

const mapStateToProps = (state: AppState) => ({ cards: state.cards })
    , mapDispatchToProps = { loadCardList, sortCardList, cardListPageChange }

export default connect(mapStateToProps, mapDispatchToProps)(CardList)
