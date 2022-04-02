import { useMemo } from '_/facade/hooks'
import { dateFormatter } from '_/utils/format/date'
import type { Game } from '_/entities/card'

interface OwnProps {
    game: Game
}

const CardListRow = (props: OwnProps) => {
    const formatDate = useMemo(dateFormatter, [])
        , { game } = props

    return (
            <tr>
                <td>{game.game}</td>
                <td>{game.normal.count}</td>
                <td>{formatDate(game.added)}</td>
            </tr>
        )
}

export default CardListRow
