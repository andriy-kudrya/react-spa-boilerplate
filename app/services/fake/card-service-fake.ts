import CardService from '../card-service'
import { delay } from './utils'

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