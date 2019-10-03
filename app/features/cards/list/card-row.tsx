import { React, useMemo } from '#/facade/react'
import { dateFormatter } from '#/utils/format/date'
import { Game } from '#/entities/card'

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
