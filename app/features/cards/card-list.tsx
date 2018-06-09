import * as React from 'react'
import { connect } from 'react-redux'

import State, { Cards } from '#/entities/state'
import { dateFormatter } from '#/utils/format/date'
import { bindComponent } from '#/utils/react'
import { SortState, SortTarget } from '#/utils/sort'

import NumberInput from '#/utils/input/number-input'
import DateInput from '#/utils/input/utc-date-input'

import { loadCardList } from './actions'

interface CardListRowProps {
    game: Cards['sets'][number]
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
                {children} {_.sorted && (_.ascending ? 'Asc' : 'Desc')}
            </td>
        }</SortTarget>


interface CardListProps {
    loadCardList: typeof loadCardList,
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
        const { cards } = this.props

        return (
            <div>
                <NumberInput value={this.state.cardCount} onChange={this.handleNumberChange} placeholder='Min cards...'/>
                <DateInput value={this.state.dateAdded} onChange={this.handleDateChange} placeholder='Min date added...'/>
                <table>
                    <thead>
                        <tr>
                            <SortState>
                                <Header name='game'>Game</Header>
                                <Header name='count'>Card Count</Header>
                                <Header name='date-added'>Date Added</Header>
                            </SortState>
                        </tr>
                    </thead>
                    <tbody>
                        {cards.sets.map(
                            _ => <CardListRow key={_.game} game={_}/>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state: State) => ({ cards: state.cards })
    , mapDispatchToProps = { loadCardList }

export default connect(mapStateToProps, mapDispatchToProps)(CardList)
