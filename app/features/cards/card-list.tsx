import * as React from 'react'
import { connect } from 'react-redux'

import State, { Cards } from '#/entities/state'
import { dateFormatter } from '#/utils/format/date'
import Number from '#/utils/input/number'

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

interface CardListProps {
    loadCardList: typeof loadCardList,
    cards: Cards,
}

interface CardListState {
    cardCount: string
}

class CardList extends React.Component<CardListProps, CardListState> {
    constructor(props: CardListProps) {
        super(props)

        this.state = { cardCount: '' }

        this.handleNumberChange = this.handleNumberChange.bind(this)

        props.loadCardList()
    }

    handleNumberChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            cardCount: event.target.value
        })
        console.log(event.target.value)
    }

    render() {
        const { cards } = this.props

        return (
            <div>
                <Number value={this.state.cardCount} onChange={this.handleNumberChange} />
                <table>
                    <thead>
                        <tr>
                            <td>Game</td>
                            <td>Card Count</td>
                            <td>Date</td>
                        </tr>
                    </thead>
                    <tbody>
                        {cards.sets.map(
                            _ => <CardListRow key={_.game} game={_}/>
                        )}
                    </tbody>
                </table>
                Cards List
            </div>
        )
    }
}

const mapStateToProps = (state: State) => ({ cards: state.cards })
    , mapDispatchToProps = { loadCardList }

export default connect(mapStateToProps, mapDispatchToProps)(CardList)
