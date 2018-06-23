import { React } from '#/facade/react'
import { dateFormatter } from '#/utils/format/date'
import { Game } from '#/entities/card'

interface OwnProps {
    game: Game
}

class CardListRow extends React.PureComponent<OwnProps> {
    formatDate: (_: number) => string

    constructor(props: OwnProps) {
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

export default CardListRow
