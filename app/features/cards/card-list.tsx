import * as React from 'react'
import { connect } from 'react-redux'

import { UP_POINTING_TRIANGLE, DOWN_POINTING_TRIANGLE } from '#/constants/characters'

import State, { Cards } from '#/entities/state'
import { dateFormatter } from '#/utils/format/date'
import { bindComponent } from '#/utils/react'
import { SortContainer, SortTarget } from '#/utils/sort'

import NumberInput from '#/utils/input/number-input'
import DateInput from '#/utils/input/utc-date-input'
import Pagination from '#/utils/pagination'

import { loadCardList, sortCardList, cardListPageChange } from './actions'

interface CardListRowProps {
    game: Cards['games'][number]
}

class CardListRow extends React.PureComponent<CardListRowProps> {
    formatDate: (_: number) => string

    constructor(props: CardListRowProps) {
        super(props)
        this.formatDate = dateFormatter()
    }

    render() {
        const { game } = this.props
        return (
            <tr>
                <td>{game.game}</td>
                <td>{game.normal.count}</td>
                <td>{this.formatDate(game.added)}</td>
            </tr>
        )
    }
}

const Header: React.SFC<{ name: string}> = ({ name, children }) =>
        <SortTarget name={name}>{_ =>
            <td onClick={_.onClick}>
                {children} {_.sorted && (_.ascending ? UP_POINTING_TRIANGLE : DOWN_POINTING_TRIANGLE)}
            </td>
        }</SortTarget>

interface CardListProps {
    loadCardList: typeof loadCardList,
    sortCardList: typeof sortCardList,
    cardListPageChange: typeof cardListPageChange,
    cards: Cards,
}

interface CardListState {
    cardCount: number | undefined
    dateAdded: number | undefined
}

class CardList extends React.Component<CardListProps, CardListState> {
    constructor(props: CardListProps) {
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

const mapStateToProps = (state: State) => ({ cards: state.cards })
    , mapDispatchToProps = { loadCardList, sortCardList, cardListPageChange }

export default connect(mapStateToProps, mapDispatchToProps)(CardList)
