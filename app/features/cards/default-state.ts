import type { Cards } from '_/entities/app-state'

const defaultState: Cards = {
    games: [],
    pagination: {
        start: 0,
        count: 10,
    },
}

export default defaultState
