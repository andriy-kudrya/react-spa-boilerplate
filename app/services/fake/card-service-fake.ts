import type CardService from '../card-service'
import { delay } from '_/utils/timeout'

function factory(): CardService {
    return {
        getAll,
    }

    function getAll() {
        return Promise.resolve()
            .then(delay)
            .then(() => import('./card_data'))
            .then(_ => _.default.sets)
    }
}

export default factory
