import type { Cards, Game } from '#/entities/card'

import type CardService from '../card-service'
import type ApiService from '../api-service'

function factory(api: ApiService): CardService {
    return {
        getAll,
    }

    function getAll(): Promise<Game[]> {
        return api.get<Cards>(['data', 'set_data.json'])
            .then(_ => _.sets)
    }
}

export default factory
