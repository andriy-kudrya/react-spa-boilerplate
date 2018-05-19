import * as React from 'react'
import { connect } from 'react-redux'

import State, { Cards } from '#/entities/state'
import { formatDate } from '#/utils/format/date'

import { loadCardList } from './actions'

interface Props {
    loadCardList: typeof loadCardList,
    cards: Cards,
}

class CardList extends React.Component<Props> {
    constructor(props: Props) {
        super(props)
        props.loadCardList()
    }

    render() {
        const { cards } = this.props

        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <td>Game</td>
                            <td>Date</td>
                        </tr>    
                    </thead>
                    <tbody>
                        {cards.sets.map(_ =>
                            <tr key={_.game}>
                                <td>{_.game}</td>
                                <td>{formatDate(_.added)}</td>
                            </tr>
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
